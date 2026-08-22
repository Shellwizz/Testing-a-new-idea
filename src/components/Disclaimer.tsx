export function Disclaimer() {
  return (
    <div className="disclaimer" role="note">
      <strong>This is an educational estimation tool, not medical or actuarial advice.</strong>{" "}
      Predictions come from a simplified statistical model (an actuarial-style hazard curve and a
      small model trained on synthetic data) using published-style risk associations. They are not
      diagnoses, guarantees, or professional forecasts of any real person's health or lifespan.
      Nothing here should inform medical, financial, or insurance decisions — talk to a doctor or
      qualified professional for that.
    </div>
  );
}
