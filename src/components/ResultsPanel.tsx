import type { PersonInputs, PredictionResult } from "../lib/types";
import { SurvivalChart } from "./SurvivalChart";

interface Props {
  inputs: PersonInputs;
  result: PredictionResult;
}

function fmtYears(n: number): string {
  return n.toFixed(1);
}

function fmtPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

export function ResultsPanel({ inputs, result }: Props) {
  const { heuristic, ml } = result;
  const deltaLabel =
    heuristic.biologicalAgeDelta === 0
      ? "matches your chronological age"
      : heuristic.biologicalAgeDelta > 0
        ? `${fmtYears(heuristic.biologicalAgeDelta)} years older than your chronological age`
        : `${fmtYears(Math.abs(heuristic.biologicalAgeDelta))} years younger than your chronological age`;

  return (
    <div className="results-panel">
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Estimated biological age</div>
          <div className="stat-value">{fmtYears(heuristic.biologicalAge)}</div>
          <div className="stat-sub">{deltaLabel}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Estimated life expectancy (heuristic model)</div>
          <div className="stat-value">{fmtYears(heuristic.lifeExpectancyAge)}</div>
          <div className="stat-sub">
            ~{fmtYears(heuristic.lifeExpectancyYears)} years remaining from age {inputs.age}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Estimated life expectancy (ML model)</div>
          <div className="stat-value">{fmtYears(ml.lifeExpectancyAge)}</div>
          <div className="stat-sub">
            ~{fmtYears(ml.lifeExpectancyYears)} years remaining &middot; trained on synthetic data
          </div>
        </div>
      </div>

      <div className="cause-split">
        <div className="cause-split-header">If mortality plays out as modeled, eventual cause of death is estimated as:</div>
        <div className="cause-bar" aria-hidden="true">
          <div className="cause-bar-natural" style={{ width: fmtPct(heuristic.probNaturalCauseDeath) }} />
          <div className="cause-bar-accident" style={{ width: fmtPct(heuristic.probAccidentalDeath) }} />
        </div>
        <div className="cause-split-legend">
          <span><i className="dot dot-natural" /> Natural / age-related causes: <strong>{fmtPct(heuristic.probNaturalCauseDeath)}</strong></span>
          <span><i className="dot dot-accident" /> Accident / external causes: <strong>{fmtPct(heuristic.probAccidentalDeath)}</strong></span>
        </div>
      </div>

      <div className="chart-section">
        <h3>Survival probability by age</h3>
        <SurvivalChart curve={heuristic.survivalCurve} currentAge={inputs.age} />
      </div>

      <div className="milestones-section">
        <h3>Odds of reaching key ages</h3>
        <div className="milestones-grid">
          {heuristic.milestones.map((m) => (
            <div className="milestone-card" key={m.age}>
              <div className="milestone-age">Age {m.age}</div>
              <div className="milestone-prob">{fmtPct(m.probability)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="factors-section">
        <h3>Biggest factors in your biological age estimate</h3>
        <ul className="factors-list">
          {heuristic.contributingFactors.length === 0 && (
            <li className="factor-neutral">No standout risk or protective factors detected.</li>
          )}
          {heuristic.contributingFactors.map((f) => (
            <li key={f.label} className={f.years > 0 ? "factor-negative" : "factor-positive"}>
              <span>{f.label}</span>
              <span>{f.years > 0 ? `+${f.years}` : f.years} yrs</span>
            </li>
          ))}
        </ul>
        <p className="risk-multiplier-note">
          Overall natural-cause risk multiplier vs. an average peer: <strong>{heuristic.riskMultiplier.toFixed(2)}x</strong>
        </p>
      </div>
    </div>
  );
}
