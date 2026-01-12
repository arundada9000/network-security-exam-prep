interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  labelSize?: string;
  colorClass?: string;
}

export default function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  showLabel = true,
  labelSize = 'text-2xl',
  colorClass,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const getColorClass = () => {
    if (colorClass) return colorClass;
    if (value >= 80) return 'text-success';
    if (value >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${getColorClass()} transition-all duration-1000 ease-out`}
        />
      </svg>
      {showLabel && (
        <span className={`absolute ${labelSize} font-bold ${getColorClass()}`}>
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
}
