/**
 * CircularProgress.tsx — Circular progress indicator
 */
interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  showValue?: boolean;
  label?: string;
}

export default function CircularProgress({
  percentage, size = 80, strokeWidth = 6,
  color = '#6366f1', bgColor = 'rgba(100,116,139,0.2)', showValue = true, label,
}: CircularProgressProps) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="shrink-0">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        {showValue && (
          <text
            x={size / 2} y={size / 2}
            textAnchor="middle" dominantBaseline="middle"
            fill="rgba(226,232,240,0.9)" fontSize={size * 0.22} fontWeight="bold"
          >
            {Math.round(clamped)}%
          </text>
        )}
      </svg>
      {label && <span className="text-[10px] text-slate-400 text-center leading-tight">{label}</span>}
    </div>
  );
}
