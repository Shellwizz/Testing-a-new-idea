import weights from "./mlWeights.json";
import type { MlResult, PersonInputs } from "./types";
import { bmiFromInputs } from "./heuristicModel";

/**
 * Inference for the gradient-boosted tree ensemble trained offline by
 * scripts/train_model.py (weights baked into mlWeights.json at build time —
 * there is no server, no live training, and no user data ever leaves the
 * browser). This is a genuinely different model class from the heuristic:
 * a nonlinear ensemble of shallow decision trees, fit to noisy synthetic
 * labels rather than a hand-picked hazard formula.
 */

interface LeafNode {
  leaf: true;
  value: number;
}
interface SplitNode {
  leaf: false;
  feature: number;
  threshold: number;
  left: number;
  right: number;
}
type TreeNode = LeafNode | SplitNode;

interface MlWeights {
  featureOrder: string[];
  learningRate: number;
  trees: TreeNode[][];
}

const model = weights as unknown as MlWeights;

function encodeFeatures(inputs: PersonInputs): number[] {
  const bmi = bmiFromInputs(inputs);
  return [
    inputs.age,
    inputs.sex === "male" ? 1 : 0,
    bmi,
    inputs.systolicBp,
    inputs.restingHeartRate,
    { never: 0, former: 1, current: 2 }[inputs.smoking],
    inputs.alcoholDrinksPerWeek,
    { none: 0, light: 1, moderate: 2, vigorous: 3 }[inputs.exercise],
    inputs.sleepHours,
    { poor: 0, average: 1, good: 2 }[inputs.diet],
    { low: 0, medium: 1, high: 2 }[inputs.stress],
    { short: 0, average: 1, long: 2 }[inputs.familyLongevity],
    inputs.diabetes ? 1 : 0,
    inputs.heartDisease ? 1 : 0,
    inputs.cancerHistory ? 1 : 0,
    inputs.hypertensionDiagnosed ? 1 : 0,
    { low: 0, medium: 1, high: 2 }[inputs.ses],
    inputs.healthcareAccess === "good" ? 1 : 0,
    { low: 0, medium: 1, high: 2 }[inputs.occupationRisk],
    { low: 0, medium: 1, high: 2 }[inputs.accidentExposure],
  ];
}

function evalTree(tree: TreeNode[], x: number[]): number {
  let node = tree[0];
  while (!node.leaf) {
    node = x[node.feature] <= node.threshold ? tree[node.left] : tree[node.right];
  }
  return node.value;
}

export function computeMl(inputs: PersonInputs): MlResult {
  const x = encodeFeatures(inputs);
  let total = 0;
  for (const tree of model.trees) {
    total += model.learningRate * evalTree(tree, x);
  }
  const lifeExpectancyAge = Math.max(inputs.age + 0.5, Math.min(105, total));
  return {
    lifeExpectancyAge,
    lifeExpectancyYears: lifeExpectancyAge - inputs.age,
  };
}
