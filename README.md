# Lifespan Estimator

A single-page web app that takes someone's biometrics, lifestyle habits,
family/medical history, and socioeconomic factors, and produces two
independent, illustrative estimates:

- **Biological age** (an additive point score vs. chronological age)
- **Life expectancy**, from two different models shown side by side:
  - A transparent **actuarial-style heuristic**: a Gompertz mortality hazard
    curve (risk roughly doubles every ~7.5 years past adulthood) scaled by
    multiplicative hazard ratios for each risk factor, with a separate,
    roughly age-flat hazard for accidental/external death. This lets the app
    report an eventual-cause-of-death split — e.g. "91.5% natural causes /
    8.5% accident" — driven by occupation and accident-exposure inputs.
  - A **small ML model**: a gradient-boosted tree ensemble trained offline
    on synthetic data (see below), run entirely client-side from baked-in
    weights.

All computation happens in the browser. Nothing is sent to a server, and no
user data is stored or transmitted anywhere.

> **This is an educational demo, not medical, actuarial, or insurance-grade
> software.** The hazard-ratio and point values are illustrative
> approximations inspired by the general shape of published epidemiological
> risk associations, not a fitted or validated model. Don't use it to make
> real health, financial, or insurance decisions.

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static
production bundle in `dist/`.

## How the ML model is trained

There's no real-world mortality dataset bundled here. Instead,
`scripts/train_model.py`:

1. Samples random, realistic combinations of the same inputs the app
   collects.
2. Labels each sample using a Python port of the heuristic model's hazard
   curve.
3. Adds Gaussian noise to each label (representing real-world variance the
   heuristic can't capture).
4. Fits a `GradientBoostingRegressor` (scikit-learn) on the result and
   exports the tree ensemble to `src/lib/mlWeights.json`.

This gives the app a genuinely different model class (a nonlinear tree
ensemble fit to noisy data) to compare against the transparent heuristic,
rather than two views of the same formula.

To retrain:

```bash
pip install -r scripts/requirements.txt
python3 scripts/train_model.py
```

## Project structure

```
src/
  lib/
    types.ts           Shared input/result types
    heuristicModel.ts  Gompertz hazard curve + risk multipliers + biological age score
    mlModel.ts          Client-side inference for the trained tree ensemble
    mlWeights.json      Baked-in weights (generated, see above)
    predict.ts          Combines both models into one result
  components/
    InputForm.tsx        The four input sections
    ResultsPanel.tsx      Stat cards, cause-of-death split, milestones, factor breakdown
    SurvivalChart.tsx     Inline SVG survival curve
    Disclaimer.tsx
scripts/
  train_model.py         Synthetic data generation + model training
```
