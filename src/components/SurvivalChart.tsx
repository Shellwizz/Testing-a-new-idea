import type { SurvivalPoint } from "../lib/types";

interface Props {
  curve: SurvivalPoint[];
  currentAge: number;
}

const WIDTH = 640;
const HEIGHT = 260;
const PAD_LEFT = 44;
const PAD_BOTTOM = 28;
const PAD_TOP = 12;
const PAD_RIGHT = 12;

export function SurvivalChart({ curve, currentAge }: Props) {
  if (curve.length === 0) return null;

  const minAge = curve[0].age;
  const maxAge = curve[curve.length - 1].age;
  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const xFor = (age: number) => PAD_LEFT + ((age - minAge) / Math.max(1, maxAge - minAge)) * plotW;
  const yFor = (p: number) => PAD_TOP + (1 - p) * plotH;

  const pathD = curve
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${xFor(pt.age).toFixed(1)} ${yFor(pt.survivalProbability).toFixed(1)}`)
    .join(" ");

  const areaD = `${pathD} L ${xFor(maxAge).toFixed(1)} ${yFor(0).toFixed(1)} L ${xFor(minAge).toFixed(1)} ${yFor(0).toFixed(1)} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  const xTickAges: number[] = [];
  for (let a = Math.ceil(minAge / 10) * 10; a <= maxAge; a += 10) xTickAges.push(a);

  return (
    <svg
      className="survival-chart"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Survival probability by age"
    >
      {yTicks.map((t) => (
        <g key={t}>
          <line
            x1={PAD_LEFT}
            x2={WIDTH - PAD_RIGHT}
            y1={yFor(t)}
            y2={yFor(t)}
            className="chart-gridline"
          />
          <text x={PAD_LEFT - 8} y={yFor(t) + 4} textAnchor="end" className="chart-axis-label">
            {Math.round(t * 100)}%
          </text>
        </g>
      ))}

      {xTickAges.map((age) => (
        <text key={age} x={xFor(age)} y={HEIGHT - 8} textAnchor="middle" className="chart-axis-label">
          {age}
        </text>
      ))}

      <path d={areaD} className="chart-area" />
      <path d={pathD} className="chart-line" />

      <line
        x1={xFor(currentAge)}
        x2={xFor(currentAge)}
        y1={PAD_TOP}
        y2={HEIGHT - PAD_BOTTOM}
        className="chart-current-age-line"
      />
    </svg>
  );
}
