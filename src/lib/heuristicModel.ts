import type {
  HeuristicResult,
  PersonInputs,
  SurvivalPoint,
} from "./types";

/**
 * Transparent, rule-based estimator.
 *
 * Natural-cause mortality follows a Gompertz hazard curve (mortality risk
 * roughly doubles every ~7.5 years past adulthood), scaled by a multiplicative
 * risk score built from published-style hazard ratios for each lifestyle/
 * biometric/history factor. Accidental/external mortality is modeled as a
 * separate, roughly age-flat hazard scaled by occupation & exposure risk, so
 * the app can report "died of natural causes" vs "died by accident" shares
 * for the same person.
 *
 * These constants are illustrative approximations for an educational demo,
 * not clinical, actuarial, or insurance-grade figures.
 */

const GOMPERTZ_B = 0.092;
const GOMPERTZ_A: Record<PersonInputs["sex"], number> = {
  male: 4.42e-5,
  female: 2.72e-5,
};
const BASE_ACCIDENT_HAZARD = 0.0006;
const MAX_AGE = 112;

function bmiOf(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

interface Factor {
  label: string;
  multiplier: number;
  points: number;
}

function evaluateFactors(inputs: PersonInputs): Factor[] {
  const bmi = bmiOf(inputs.heightCm, inputs.weightKg);
  const factors: Factor[] = [];

  // Smoking
  if (inputs.smoking === "never") factors.push({ label: "Never smoked", multiplier: 1.0, points: 0 });
  else if (inputs.smoking === "former") factors.push({ label: "Former smoker", multiplier: 1.25, points: 2 });
  else factors.push({ label: "Current smoker", multiplier: 2.0, points: 6 });

  // BMI
  if (bmi < 18.5) factors.push({ label: "Underweight (BMI)", multiplier: 1.3, points: 2 });
  else if (bmi < 25) factors.push({ label: "Normal weight (BMI)", multiplier: 1.0, points: 0 });
  else if (bmi < 30) factors.push({ label: "Overweight (BMI)", multiplier: 1.1, points: 1 });
  else if (bmi < 35) factors.push({ label: "Obese class I (BMI)", multiplier: 1.35, points: 4 });
  else factors.push({ label: "Obese class II+ (BMI)", multiplier: 1.7, points: 7 });

  // Blood pressure (systolic)
  if (inputs.systolicBp < 120) factors.push({ label: "Normal blood pressure", multiplier: 1.0, points: 0 });
  else if (inputs.systolicBp < 140) factors.push({ label: "Elevated blood pressure", multiplier: 1.1, points: 1 });
  else if (inputs.systolicBp < 160) factors.push({ label: "High blood pressure", multiplier: 1.25, points: 3 });
  else factors.push({ label: "Very high blood pressure", multiplier: 1.45, points: 5 });

  // Resting heart rate
  if (inputs.restingHeartRate < 60) factors.push({ label: "Athletic resting heart rate", multiplier: 0.95, points: -1 });
  else if (inputs.restingHeartRate < 80) factors.push({ label: "Normal resting heart rate", multiplier: 1.0, points: 0 });
  else if (inputs.restingHeartRate < 100) factors.push({ label: "Elevated resting heart rate", multiplier: 1.15, points: 2 });
  else factors.push({ label: "High resting heart rate", multiplier: 1.35, points: 4 });

  // Exercise
  const exerciseMap = {
    none: { multiplier: 1.3, points: 4, label: "No regular exercise" },
    light: { multiplier: 1.1, points: 1, label: "Light exercise" },
    moderate: { multiplier: 1.0, points: 0, label: "Moderate exercise" },
    vigorous: { multiplier: 0.85, points: -3, label: "Vigorous regular exercise" },
  } as const;
  factors.push({ ...exerciseMap[inputs.exercise] });

  // Alcohol
  const drinks = inputs.alcoholDrinksPerWeek;
  if (drinks === 0) factors.push({ label: "No alcohol", multiplier: 1.0, points: 0 });
  else if (drinks <= 7) factors.push({ label: "Light alcohol use", multiplier: 0.97, points: 0 });
  else if (drinks <= 14) factors.push({ label: "Moderate alcohol use", multiplier: 1.05, points: 1 });
  else if (drinks <= 21) factors.push({ label: "Heavy alcohol use", multiplier: 1.25, points: 3 });
  else factors.push({ label: "Very heavy alcohol use", multiplier: 1.6, points: 6 });

  // Sleep
  if (inputs.sleepHours < 6) factors.push({ label: "Short sleep (<6h)", multiplier: 1.2, points: 3 });
  else if (inputs.sleepHours <= 9) factors.push({ label: "Healthy sleep duration", multiplier: 1.0, points: 0 });
  else factors.push({ label: "Long sleep (>9h)", multiplier: 1.15, points: 2 });

  // Diet
  const dietMap = {
    poor: { multiplier: 1.2, points: 3, label: "Poor diet quality" },
    average: { multiplier: 1.0, points: 0, label: "Average diet quality" },
    good: { multiplier: 0.9, points: -2, label: "Good diet quality" },
  } as const;
  factors.push({ ...dietMap[inputs.diet] });

  // Stress
  const stressMap = {
    low: { multiplier: 0.95, points: -1, label: "Low stress" },
    medium: { multiplier: 1.0, points: 0, label: "Medium stress" },
    high: { multiplier: 1.25, points: 4, label: "High chronic stress" },
  } as const;
  factors.push({ ...stressMap[inputs.stress] });

  // Family longevity
  const familyMap = {
    short: { multiplier: 1.15, points: 3, label: "Family history of early death" },
    average: { multiplier: 1.0, points: 0, label: "Average family longevity" },
    long: { multiplier: 0.85, points: -3, label: "Family history of long life" },
  } as const;
  factors.push({ ...familyMap[inputs.familyLongevity] });

  // Chronic conditions
  if (inputs.diabetes) factors.push({ label: "Diabetes", multiplier: 1.4, points: 5 });
  if (inputs.heartDisease) factors.push({ label: "Heart disease", multiplier: 1.6, points: 7 });
  if (inputs.cancerHistory) factors.push({ label: "Cancer history", multiplier: 1.5, points: 6 });
  if (inputs.hypertensionDiagnosed) factors.push({ label: "Diagnosed hypertension", multiplier: 1.15, points: 3 });

  // Socioeconomic / environmental
  const sesMap = {
    low: { multiplier: 1.15, points: 3, label: "Lower socioeconomic access" },
    medium: { multiplier: 1.0, points: 0, label: "Medium socioeconomic access" },
    high: { multiplier: 0.9, points: -2, label: "Higher socioeconomic access" },
  } as const;
  factors.push({ ...sesMap[inputs.ses] });

  if (inputs.healthcareAccess === "limited") factors.push({ label: "Limited healthcare access", multiplier: 1.15, points: 2 });
  else factors.push({ label: "Good healthcare access", multiplier: 1.0, points: 0 });

  return factors;
}

const RISK_SCALE: Record<PersonInputs["occupationRisk"], number> = {
  low: 0.6,
  medium: 1.0,
  high: 2.2,
};
const EXPOSURE_SCALE: Record<PersonInputs["accidentExposure"], number> = {
  low: 0.6,
  medium: 1.0,
  high: 2.0,
};

export function computeHeuristic(inputs: PersonInputs): HeuristicResult {
  const factors = evaluateFactors(inputs);
  const rawMultiplier = factors.reduce((acc, f) => acc * f.multiplier, 1);
  const riskMultiplier = Math.min(Math.max(rawMultiplier, 0.4), 4.0);

  const biologicalAgeDelta = factors.reduce((acc, f) => acc + f.points, 0);
  const biologicalAge = Math.max(1, inputs.age + biologicalAgeDelta);

  const accidentHazard =
    BASE_ACCIDENT_HAZARD * RISK_SCALE[inputs.occupationRisk] * EXPOSURE_SCALE[inputs.accidentExposure];

  const a = GOMPERTZ_A[inputs.sex];
  const survivalCurve: SurvivalPoint[] = [];
  let survival = 1.0;
  let lifeExpectancyYears = 0;
  let probNaturalCauseDeath = 0;
  let probAccidentalDeath = 0;

  for (let age = inputs.age; age < MAX_AGE; age++) {
    survivalCurve.push({ age, survivalProbability: survival });
    lifeExpectancyYears += survival;

    const naturalHazard = a * Math.exp(GOMPERTZ_B * age) * riskMultiplier;
    const totalHazard = naturalHazard + accidentHazard;
    const q = Math.min(1 - Math.exp(-totalHazard), 1);
    const deathProbThisYear = survival * q;

    const naturalShare = naturalHazard / totalHazard;
    const accidentShare = accidentHazard / totalHazard;
    probNaturalCauseDeath += deathProbThisYear * naturalShare;
    probAccidentalDeath += deathProbThisYear * accidentShare;

    survival *= 1 - q;
    if (survival < 1e-6) break;
  }

  // Any residual (unresolved) probability mass at the age cutoff is
  // attributed to natural causes, then renormalize so the two shares sum to 1.
  probNaturalCauseDeath += survival;
  const causeSum = probNaturalCauseDeath + probAccidentalDeath;
  probNaturalCauseDeath /= causeSum;
  probAccidentalDeath /= causeSum;

  const lifeExpectancyAge = inputs.age + lifeExpectancyYears;

  const milestoneOffsets = [10, 20, 30, 40, 50, 60];
  const milestones = milestoneOffsets
    .map((offset) => inputs.age + offset)
    .filter((age) => age <= MAX_AGE)
    .map((age) => {
      const point = survivalCurve.find((p) => p.age === age);
      const nextAfter = survivalCurve[survivalCurve.length - 1];
      const probability = point ? point.survivalProbability : nextAfter ? 0 : 0;
      return { age, probability };
    });

  const contributingFactors = factors
    .filter((f) => f.points !== 0)
    .sort((a, b) => Math.abs(b.points) - Math.abs(a.points))
    .slice(0, 6)
    .map((f) => ({ label: f.label, years: f.points }));

  return {
    biologicalAge,
    biologicalAgeDelta,
    riskMultiplier,
    lifeExpectancyYears,
    lifeExpectancyAge,
    survivalCurve,
    probAccidentalDeath,
    probNaturalCauseDeath,
    milestones,
    contributingFactors,
  };
}

export function bmiFromInputs(inputs: PersonInputs): number {
  return bmiOf(inputs.heightCm, inputs.weightKg);
}
