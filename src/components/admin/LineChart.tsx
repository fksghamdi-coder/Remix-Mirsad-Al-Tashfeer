/**
 * LineChart.tsx — Lightweight SVG line chart (no external dependency)
 */
interface ChartPoint { x: number; y: number; label: string; value: number }

interface LineChartProps {
  points: ChartPoint[];
  height?: number;
  showDots?: boolean;
  showLabels?: boolean;
}

export default function LineChart({
  points, height = 180, showDots = true, showLabels = true,
}: LineChartProps) {
  const maxVal = Math.max(...points.map(p => p.value), 1);
  const minVal = Math.min(...points.map(p => p.value), 0);
  const range = maxVal - minVal || 1;
  const pad = 35;
  const w = Math.max(points.length * 70 + pad * 2, 300);

  const pts = points.map((p, i) => ({
    x: pad + (i / Math.max(points.length - 1, 1)) * (w - pad * 2),
    y: height - pad - ((p.value - minVal) / range) * (height - pad * 2),
    label: p.label,
    value: p.value,
  }));

  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = pathD + ` L ${pts[pts.length - 1].x} ${height - pad} L ${pts[0].x} ${height - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="lcGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0)" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#lcGrad)" />
      <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" />
      {showDots && pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#6366f1" stroke="#0f172a" strokeWidth="2" />
          {showLabels && (
            <>
              <text x={p.x} y={height - 10} textAnchor="middle" fill="rgba(148,163,184,0.65)" fontSize="9">
                {p.label}
              </text>
              <text x={p.x} y={p.y - 10} textAnchor="middle" fill="rgba(203,213,225,0.9)" fontSize="10" fontWeight="bold">
                {p.value}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
