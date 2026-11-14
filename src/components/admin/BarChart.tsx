/**
 * BarChart.tsx — Lightweight SVG bar chart (no external dependency)
 */
interface BarData { label: string; value: number; color?: string }

interface BarChartProps {
  data: BarData[];
  maxValue?: number;
  height?: number;
  showValues?: boolean;
  barWidth?: number;
  gap?: number;
}

const BAR_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#6366f1', '#4f46e5', '#4338ca'];

export default function BarChart({
  data, maxValue, height = 200, showValues = true, barWidth = 32, gap = 8,
}: BarChartProps) {
  const computedMax = maxValue ?? Math.max(...data.map(d => d.value), 1);
  const totalWidth = Math.max(data.length * (barWidth + gap) - gap, 300);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${height + 30}`}
        className="w-full min-w-[280px]"
        style={{ height }}
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => (
          <g key={i}>
            <line x1="0" y1={height - frac * height}
              x2={totalWidth} y2={height - frac * height}
              stroke="rgba(100,116,139,0.18)" strokeWidth="1" />
            <text x={-4} y={height - frac * height + 4}
              textAnchor="end" fill="rgba(148,163,184,0.5)" fontSize="9" fontFamily="monospace">
              {Math.round(computedMax * frac)}
            </text>
          </g>
        ))}
        {/* Bars */}
        {data.map((d, i) => {
          const barH = (d.value / computedMax) * height;
          const x = i * (barWidth + gap);
          const y = height - barH;
          const color = d.color || BAR_COLORS[i % BAR_COLORS.length];
          return (
            <g key={i}>
              <rect x={x} y={y} width={barWidth} height={Math.max(barH, 0)}
                fill={color} rx="3" ry="3" opacity="0.85">
                <animate attributeName="height" from="0" to={String(barH)} dur="0.5s" fill="freeze" begin={`${i * 0.05}s`} />
                <animate attributeName="y" from={String(height)} to={String(y)} dur="0.5s" fill="freeze" begin={`${i * 0.05}s`} />
              </rect>
              {showValues && barH > 18 && (
                <text x={x + barWidth / 2} y={y - 5}
                  textAnchor="middle" fill="rgba(203,213,225,0.85)" fontSize="10" fontWeight="bold">
                  {d.value}
                </text>
              )}
              <text x={x + barWidth / 2} y={height + 16}
                textAnchor="middle" fill="rgba(148,163,184,0.65)" fontSize="9">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
