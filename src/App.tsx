import { useMemo, useState } from "react";
import { InputForm } from "./components/InputForm";
import { ResultsPanel } from "./components/ResultsPanel";
import { Disclaimer } from "./components/Disclaimer";
import { DEFAULT_INPUTS, predict } from "./lib/predict";
import type { PersonInputs } from "./lib/types";

function App() {
  const [inputs, setInputs] = useState<PersonInputs>(DEFAULT_INPUTS);
  const result = useMemo(() => predict(inputs), [inputs]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lifespan Estimator</h1>
        <p className="app-subtitle">
          Enter your biology and lifestyle to see two independent, statistical estimates of
          biological age and life expectancy.
        </p>
      </header>

      <Disclaimer />

      <main className="app-main">
        <section className="form-section">
          <h2>Your factors</h2>
          <InputForm value={inputs} onChange={setInputs} />
        </section>

        <section className="results-section">
          <h2>Your estimate</h2>
          <ResultsPanel inputs={inputs} result={result} />
        </section>
      </main>

      <footer className="app-footer">
        Two models are shown side by side: a transparent hazard-curve heuristic and a small
        gradient-boosted model trained on synthetic data derived from the same risk factors. Both
        are illustrative approximations, not clinical or actuarial predictions.
      </footer>
    </div>
  );
}

export default App;
