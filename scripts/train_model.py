"""
Trains a small gradient-boosted regression model to predict life-expectancy
age from the same style of inputs used by the app's transparent heuristic
model (src/lib/heuristicModel.ts).

There is no real-world labeled mortality dataset bundled with this project.
Instead we generate a large synthetic dataset by:
  1. Sampling random, realistic combinations of biometric/lifestyle/history/
     socioeconomic inputs.
  2. Labeling each sample with the *heuristic* model's predicted life
     expectancy (a Gompertz hazard curve scaled by risk-factor hazard
     ratios -- see heuristicModel.ts for the authoritative version).
  3. Adding Gaussian noise to the label, representing real-world variance
     the heuristic can't capture.

The trained model therefore acts as a genuinely different function class
(a nonlinear ensemble of shallow decision trees) fit to noisy realizations
of the same underlying risk relationships -- useful for the app to show a
second, independently-computed estimate next to the transparent heuristic.

Run:
    pip install -r scripts/requirements.txt
    python3 scripts/train_model.py

Output:
    src/lib/mlWeights.json
"""
import json
import math
import random
from pathlib import Path

from sklearn.ensemble import GradientBoostingRegressor

random.seed(42)

GOMPERTZ_B = 0.092
GOMPERTZ_A = {"male": 4.42e-5, "female": 2.72e-5}
BASE_ACCIDENT_HAZARD = 0.0006
MAX_AGE = 112

RISK_SCALE = {"low": 0.6, "medium": 1.0, "high": 2.2}
EXPOSURE_SCALE = {"low": 0.6, "medium": 1.0, "high": 2.0}

FEATURE_ORDER = [
    "age", "sex", "bmi", "systolicBp", "restingHeartRate", "smoking",
    "alcoholDrinksPerWeek", "exercise", "sleepHours", "diet", "stress",
    "familyLongevity", "diabetes", "heartDisease", "cancerHistory",
    "hypertensionDiagnosed", "ses", "healthcareAccess", "occupationRisk",
    "accidentExposure",
]


def sample_person():
    sex = random.choice(["male", "female"])
    age = random.randint(18, 85)
    height_cm = random.gauss(175 if sex == "male" else 162, 8)
    weight_kg = max(40, random.gauss(80 if sex == "male" else 68, 16))
    systolic_bp = max(90, random.gauss(122, 15))
    resting_hr = max(45, random.gauss(72, 11))
    smoking = random.choices(["never", "former", "current"], weights=[0.6, 0.2, 0.2])[0]
    alcohol = max(0, random.gauss(4, 6))
    exercise = random.choices(["none", "light", "moderate", "vigorous"], weights=[0.3, 0.3, 0.25, 0.15])[0]
    sleep_hours = max(3, random.gauss(7, 1.3))
    diet = random.choices(["poor", "average", "good"], weights=[0.3, 0.4, 0.3])[0]
    stress = random.choices(["low", "medium", "high"], weights=[0.3, 0.4, 0.3])[0]
    family_longevity = random.choices(["short", "average", "long"], weights=[0.25, 0.5, 0.25])[0]
    diabetes = random.random() < 0.1
    heart_disease = random.random() < 0.07
    cancer_history = random.random() < 0.05
    hypertension = random.random() < 0.2
    ses = random.choices(["low", "medium", "high"], weights=[0.3, 0.4, 0.3])[0]
    healthcare_access = random.choices(["limited", "good"], weights=[0.3, 0.7])[0]
    occupation_risk = random.choices(["low", "medium", "high"], weights=[0.5, 0.35, 0.15])[0]
    accident_exposure = random.choices(["low", "medium", "high"], weights=[0.5, 0.35, 0.15])[0]

    return dict(
        sex=sex, age=age, heightCm=height_cm, weightKg=weight_kg,
        systolicBp=systolic_bp, restingHeartRate=resting_hr, smoking=smoking,
        alcoholDrinksPerWeek=alcohol, exercise=exercise, sleepHours=sleep_hours,
        diet=diet, stress=stress, familyLongevity=family_longevity,
        diabetes=diabetes, heartDisease=heart_disease, cancerHistory=cancer_history,
        hypertensionDiagnosed=hypertension, ses=ses, healthcareAccess=healthcare_access,
        occupationRisk=occupation_risk, accidentExposure=accident_exposure,
    )


def bmi_of(height_cm, weight_kg):
    h = height_cm / 100
    return weight_kg / (h * h)


def risk_multiplier(p):
    bmi = bmi_of(p["heightCm"], p["weightKg"])
    m = 1.0

    m *= {"never": 1.0, "former": 1.25, "current": 2.0}[p["smoking"]]

    if bmi < 18.5:
        m *= 1.3
    elif bmi < 25:
        m *= 1.0
    elif bmi < 30:
        m *= 1.1
    elif bmi < 35:
        m *= 1.35
    else:
        m *= 1.7

    bp = p["systolicBp"]
    if bp < 120:
        m *= 1.0
    elif bp < 140:
        m *= 1.1
    elif bp < 160:
        m *= 1.25
    else:
        m *= 1.45

    hr = p["restingHeartRate"]
    if hr < 60:
        m *= 0.95
    elif hr < 80:
        m *= 1.0
    elif hr < 100:
        m *= 1.15
    else:
        m *= 1.35

    m *= {"none": 1.3, "light": 1.1, "moderate": 1.0, "vigorous": 0.85}[p["exercise"]]

    drinks = p["alcoholDrinksPerWeek"]
    if drinks == 0:
        m *= 1.0
    elif drinks <= 7:
        m *= 0.97
    elif drinks <= 14:
        m *= 1.05
    elif drinks <= 21:
        m *= 1.25
    else:
        m *= 1.6

    sleep = p["sleepHours"]
    if sleep < 6:
        m *= 1.2
    elif sleep <= 9:
        m *= 1.0
    else:
        m *= 1.15

    m *= {"poor": 1.2, "average": 1.0, "good": 0.9}[p["diet"]]
    m *= {"low": 0.95, "medium": 1.0, "high": 1.25}[p["stress"]]
    m *= {"short": 1.15, "average": 1.0, "long": 0.85}[p["familyLongevity"]]

    if p["diabetes"]:
        m *= 1.4
    if p["heartDisease"]:
        m *= 1.6
    if p["cancerHistory"]:
        m *= 1.5
    if p["hypertensionDiagnosed"]:
        m *= 1.15

    m *= {"low": 1.15, "medium": 1.0, "high": 0.9}[p["ses"]]
    m *= {"limited": 1.15, "good": 1.0}[p["healthcareAccess"]]

    return min(max(m, 0.4), 4.0)


def accident_hazard_of(p):
    return BASE_ACCIDENT_HAZARD * RISK_SCALE[p["occupationRisk"]] * EXPOSURE_SCALE[p["accidentExposure"]]


def life_expectancy_age(p):
    a = GOMPERTZ_A[p["sex"]]
    rm = risk_multiplier(p)
    acc = accident_hazard_of(p)
    survival = 1.0
    remaining = 0.0
    age = p["age"]
    while age < MAX_AGE:
        remaining += survival
        hazard = a * math.exp(GOMPERTZ_B * age) * rm + acc
        q = min(1 - math.exp(-hazard), 1.0)
        survival *= (1 - q)
        age += 1
        if survival < 1e-6:
            break
    return p["age"] + remaining


def encode(p):
    bmi = bmi_of(p["heightCm"], p["weightKg"])
    return [
        p["age"],
        1 if p["sex"] == "male" else 0,
        bmi,
        p["systolicBp"],
        p["restingHeartRate"],
        {"never": 0, "former": 1, "current": 2}[p["smoking"]],
        p["alcoholDrinksPerWeek"],
        {"none": 0, "light": 1, "moderate": 2, "vigorous": 3}[p["exercise"]],
        p["sleepHours"],
        {"poor": 0, "average": 1, "good": 2}[p["diet"]],
        {"low": 0, "medium": 1, "high": 2}[p["stress"]],
        {"short": 0, "average": 1, "long": 2}[p["familyLongevity"]],
        1 if p["diabetes"] else 0,
        1 if p["heartDisease"] else 0,
        1 if p["cancerHistory"] else 0,
        1 if p["hypertensionDiagnosed"] else 0,
        {"low": 0, "medium": 1, "high": 2}[p["ses"]],
        1 if p["healthcareAccess"] == "good" else 0,
        {"low": 0, "medium": 1, "high": 2}[p["occupationRisk"]],
        {"low": 0, "medium": 1, "high": 2}[p["accidentExposure"]],
    ]


def build_dataset(n):
    X, y = [], []
    for _ in range(n):
        p = sample_person()
        label = life_expectancy_age(p) + random.gauss(0, 3.0)
        label = max(p["age"] + 0.5, min(105, label))
        X.append(encode(p))
        y.append(label)
    return X, y


def export_tree(tree):
    nodes = []
    for i in range(tree.node_count):
        feature = int(tree.feature[i])
        if feature == -2:
            nodes.append({"leaf": True, "value": float(tree.value[i][0][0])})
        else:
            nodes.append({
                "leaf": False,
                "feature": feature,
                "threshold": float(tree.threshold[i]),
                "left": int(tree.children_left[i]),
                "right": int(tree.children_right[i]),
            })
    return nodes


def main():
    print("Generating synthetic training data...")
    X, y = build_dataset(20000)

    print("Training GradientBoostingRegressor...")
    model = GradientBoostingRegressor(
        n_estimators=60, max_depth=3, learning_rate=0.1,
        init="zero", random_state=42,
    )
    model.fit(X, y)

    preds = model.predict(X)
    mae = sum(abs(p - t) for p, t in zip(preds, y)) / len(y)
    print(f"Training MAE: {mae:.2f} years")

    trees = [export_tree(est[0].tree_) for est in model.estimators_]

    out = {
        "featureOrder": FEATURE_ORDER,
        "learningRate": model.learning_rate,
        "trees": trees,
    }

    out_path = Path(__file__).resolve().parent.parent / "src" / "lib" / "mlWeights.json"
    out_path.write_text(json.dumps(out))
    print(f"Wrote {out_path} ({len(trees)} trees, {out_path.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
