import type { ChangeEvent } from "react";
import type { PersonInputs } from "../lib/types";

interface Props {
  value: PersonInputs;
  onChange: (next: PersonInputs) => void;
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{props.label}</span>
      {props.children}
    </label>
  );
}

export function InputForm({ value, onChange }: Props) {
  function set<K extends keyof PersonInputs>(key: K, val: PersonInputs[K]) {
    onChange({ ...value, [key]: val });
  }

  function num(e: ChangeEvent<HTMLInputElement>) {
    return Number(e.target.value);
  }

  return (
    <form className="input-form" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Core biometrics</legend>
        <div className="field-grid">
          <Field label="Sex">
            <select value={value.sex} onChange={(e) => set("sex", e.target.value as PersonInputs["sex"])}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </Field>
          <Field label="Age (years)">
            <input type="number" min={1} max={110} value={value.age} onChange={(e) => set("age", num(e))} />
          </Field>
          <Field label="Height (cm)">
            <input type="number" min={100} max={230} value={value.heightCm} onChange={(e) => set("heightCm", num(e))} />
          </Field>
          <Field label="Weight (kg)">
            <input type="number" min={30} max={250} value={value.weightKg} onChange={(e) => set("weightKg", num(e))} />
          </Field>
          <Field label="Systolic blood pressure (mmHg)">
            <input type="number" min={80} max={220} value={value.systolicBp} onChange={(e) => set("systolicBp", num(e))} />
          </Field>
          <Field label="Resting heart rate (bpm)">
            <input type="number" min={35} max={160} value={value.restingHeartRate} onChange={(e) => set("restingHeartRate", num(e))} />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Lifestyle habits</legend>
        <div className="field-grid">
          <Field label="Smoking status">
            <select value={value.smoking} onChange={(e) => set("smoking", e.target.value as PersonInputs["smoking"])}>
              <option value="never">Never smoked</option>
              <option value="former">Former smoker</option>
              <option value="current">Current smoker</option>
            </select>
          </Field>
          <Field label="Alcohol (drinks / week)">
            <input type="number" min={0} max={60} value={value.alcoholDrinksPerWeek} onChange={(e) => set("alcoholDrinksPerWeek", num(e))} />
          </Field>
          <Field label="Exercise level">
            <select value={value.exercise} onChange={(e) => set("exercise", e.target.value as PersonInputs["exercise"])}>
              <option value="none">None</option>
              <option value="light">Light (1-2 days/week)</option>
              <option value="moderate">Moderate (3-4 days/week)</option>
              <option value="vigorous">Vigorous (5+ days/week)</option>
            </select>
          </Field>
          <Field label="Sleep (hours/night)">
            <input type="number" min={2} max={14} step={0.5} value={value.sleepHours} onChange={(e) => set("sleepHours", num(e))} />
          </Field>
          <Field label="Diet quality">
            <select value={value.diet} onChange={(e) => set("diet", e.target.value as PersonInputs["diet"])}>
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="good">Good</option>
            </select>
          </Field>
          <Field label="Stress level">
            <select value={value.stress} onChange={(e) => set("stress", e.target.value as PersonInputs["stress"])}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Family &amp; medical history</legend>
        <div className="field-grid">
          <Field label="Family longevity">
            <select value={value.familyLongevity} onChange={(e) => set("familyLongevity", e.target.value as PersonInputs["familyLongevity"])}>
              <option value="short">Parents/grandparents died young</option>
              <option value="average">Average</option>
              <option value="long">Parents/grandparents lived 80+</option>
            </select>
          </Field>
          <Field label="Diabetes">
            <input type="checkbox" checked={value.diabetes} onChange={(e) => set("diabetes", e.target.checked)} />
          </Field>
          <Field label="Heart disease">
            <input type="checkbox" checked={value.heartDisease} onChange={(e) => set("heartDisease", e.target.checked)} />
          </Field>
          <Field label="Cancer history">
            <input type="checkbox" checked={value.cancerHistory} onChange={(e) => set("cancerHistory", e.target.checked)} />
          </Field>
          <Field label="Diagnosed hypertension">
            <input type="checkbox" checked={value.hypertensionDiagnosed} onChange={(e) => set("hypertensionDiagnosed", e.target.checked)} />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Socioeconomic &amp; environmental</legend>
        <div className="field-grid">
          <Field label="Socioeconomic access (income/education)">
            <select value={value.ses} onChange={(e) => set("ses", e.target.value as PersonInputs["ses"])}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </Field>
          <Field label="Healthcare access">
            <select value={value.healthcareAccess} onChange={(e) => set("healthcareAccess", e.target.value as PersonInputs["healthcareAccess"])}>
              <option value="limited">Limited</option>
              <option value="good">Good</option>
            </select>
          </Field>
          <Field label="Occupation risk">
            <select value={value.occupationRisk} onChange={(e) => set("occupationRisk", e.target.value as PersonInputs["occupationRisk"])}>
              <option value="low">Low (e.g. desk job)</option>
              <option value="medium">Medium</option>
              <option value="high">High (e.g. mining, construction)</option>
            </select>
          </Field>
          <Field label="Accident exposure (driving, extreme activities, environment)">
            <select value={value.accidentExposure} onChange={(e) => set("accidentExposure", e.target.value as PersonInputs["accidentExposure"])}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </Field>
        </div>
      </fieldset>
    </form>
  );
}
