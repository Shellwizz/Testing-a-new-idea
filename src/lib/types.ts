export type SmokingStatus = "never" | "former" | "current";
export type ExerciseLevel = "none" | "light" | "moderate" | "vigorous";
export type DietQuality = "poor" | "average" | "good";
export type StressLevel = "low" | "medium" | "high";
export type FamilyLongevity = "short" | "average" | "long";
export type SesLevel = "low" | "medium" | "high";
export type RiskExposure = "low" | "medium" | "high";
export type Sex = "male" | "female";

export interface PersonInputs {
  // Core biometrics
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  systolicBp: number;
  restingHeartRate: number;

  // Lifestyle habits
  smoking: SmokingStatus;
  alcoholDrinksPerWeek: number;
  exercise: ExerciseLevel;
  sleepHours: number;
  diet: DietQuality;
  stress: StressLevel;

  // Family & medical history
  familyLongevity: FamilyLongevity;
  diabetes: boolean;
  heartDisease: boolean;
  cancerHistory: boolean;
  hypertensionDiagnosed: boolean;

  // Socioeconomic / environmental
  ses: SesLevel;
  healthcareAccess: "limited" | "good";
  occupationRisk: RiskExposure;
  accidentExposure: RiskExposure;
}

export interface SurvivalPoint {
  age: number;
  survivalProbability: number;
}

export interface HeuristicResult {
  biologicalAge: number;
  biologicalAgeDelta: number;
  riskMultiplier: number;
  lifeExpectancyYears: number;
  lifeExpectancyAge: number;
  survivalCurve: SurvivalPoint[];
  probAccidentalDeath: number;
  probNaturalCauseDeath: number;
  milestones: { age: number; probability: number }[];
  contributingFactors: { label: string; years: number }[];
}

export interface MlResult {
  lifeExpectancyAge: number;
  lifeExpectancyYears: number;
}

export interface PredictionResult {
  heuristic: HeuristicResult;
  ml: MlResult;
}
