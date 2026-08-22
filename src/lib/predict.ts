import { computeHeuristic } from "./heuristicModel";
import { computeMl } from "./mlModel";
import type { PersonInputs, PredictionResult } from "./types";

export function predict(inputs: PersonInputs): PredictionResult {
  return {
    heuristic: computeHeuristic(inputs),
    ml: computeMl(inputs),
  };
}

export const DEFAULT_INPUTS: PersonInputs = {
  sex: "female",
  age: 35,
  heightCm: 168,
  weightKg: 68,
  systolicBp: 118,
  restingHeartRate: 70,
  smoking: "never",
  alcoholDrinksPerWeek: 3,
  exercise: "moderate",
  sleepHours: 7,
  diet: "average",
  stress: "medium",
  familyLongevity: "average",
  diabetes: false,
  heartDisease: false,
  cancerHistory: false,
  hypertensionDiagnosed: false,
  ses: "medium",
  healthcareAccess: "good",
  occupationRisk: "low",
  accidentExposure: "medium",
};
