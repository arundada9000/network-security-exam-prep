interface StreakCounterProps {
  streak: number;
  showFlame?: boolean;
}

export default function StreakCounter({ streak, showFlame = true }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
      {showFlame && (
        <span className={`text-lg ${streak > 0 ? 'animate-pulse' : 'grayscale opacity-50'}`}>
          🔥
        </span>
      )}
      <span className="font-bold text-foreground">{streak}</span>
      <span className="text-xs text-muted-foreground">day streak</span>
    </div>
  );
}
