/**
 * DonutChart.tsx — Lightweight SVG donut chart (no external dependency)
 */
interface DonutSegment { label: string; value: number; color: string }

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  innerRatio?: number;
  showLegend?: boolean;
  centerLabel?: string;
}

export default function DonutChart({
  segments, size = 160, innerRatio = 0.62, showLegend = true, centerLabel = 'إجمالي',
}: DonutChartProps) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 10, ir = r * innerRatio;
  let cumulative = 0;

  const arcPath = (sa: number, ea: number, or: number, irl: number) => {
    const cos = Math.cos, sin = Math.sin;
    const x1 = cx + or * cos(sa), y1 = cy + or * sin(sa);
    const x2 = cx + or * cos(ea), y2 = cy + or * sin(ea);
    const x3 = cx + irl * cos(ea), y3 = cy + irl * sin(ea);
    const x4 = cx + irl * cos(sa), y4 = cy + irl * sin(sa);
    const large = ea - sa > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${or} ${or} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${irl} ${irl} 0 ${large} 0 ${x4} ${y4} Z`;
  };

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const angle = (seg.value / total) * 2 * Math.PI;
          const sa = cumulative * 2 * Math.PI - Math.PI / 2;
          cumulative += angle / (2 * Math.PI);
          const ea = cumulative * 2 * Math.PI - Math.PI / 2;
          return (
            <path key={i} d={arcPath(sa, ea, r, ir)} fill={seg.color} opacity="0.88"
              stroke="rgba(15,23,42,0.6)" strokeWidth="1.5" />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="20" fontWeight="bold">
          {total}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(148,163,184,0.5)" fontSize="9">
          {centerLabel}
        </text>
      </svg>
      {showLegend && (
        <div className="flex flex-col gap-1.5 text-xs">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-slate-400">{seg.label}</span>
              <span className="text-slate-200 font-bold mr-auto">{seg.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
