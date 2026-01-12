interface XPBarProps {
  currentXP: number;
  levelXP: number;
  level: number;
}

export default function XPBar({ currentXP, levelXP, level }: XPBarProps) {
  const progress = (currentXP / levelXP) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/70 text-accent-foreground font-bold text-sm shadow-lg shadow-accent/25">
        {level}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-foreground">Level {level}</span>
          <span className="text-xs text-muted-foreground">{currentXP} / {levelXP} XP</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
