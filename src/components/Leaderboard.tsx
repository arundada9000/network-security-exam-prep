interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'CyberNinja', avatar: '🥷', xp: 12500, level: 25, streak: 45 },
  { rank: 2, name: 'SecureHacker', avatar: '👨‍💻', xp: 11200, level: 23, streak: 30 },
  { rank: 3, name: 'NetworkPro', avatar: '🔐', xp: 9800, level: 20, streak: 28 },
  { rank: 4, name: 'You', avatar: '🎯', xp: 8500, level: 17, streak: 7 },
  { rank: 5, name: 'FirewallKing', avatar: '🛡️', xp: 7200, level: 15, streak: 14 },
  { rank: 6, name: 'CryptoQueen', avatar: '👑', xp: 6800, level: 14, streak: 21 },
  { rank: 7, name: 'PacketSniffer', avatar: '🔍', xp: 5500, level: 12, streak: 10 },
  { rank: 8, name: 'RootAccess', avatar: '💻', xp: 4200, level: 9, streak: 5 },
];

export default function Leaderboard() {
  return (
    <div className="card-glass p-6">
      <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <span>🏆</span> Leaderboard
      </h3>
      <div className="space-y-3">
        {leaderboardData.map((entry) => {
          const isCurrentUser = entry.name === 'You';
          const isTop3 = entry.rank <= 3;

          return (
            <div
              key={entry.rank}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isCurrentUser
                  ? 'bg-accent/10 border border-accent/30'
                  : 'hover:bg-muted/50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  entry.rank === 1
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900'
                    : entry.rank === 2
                    ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-800'
                    : entry.rank === 3
                    ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isTop3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
              </div>

              <div className="text-2xl">{entry.avatar}</div>

              <div className="flex-grow">
                <div className="font-medium text-foreground flex items-center gap-2">
                  {entry.name}
                  {isCurrentUser && (
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Level {entry.level} • {entry.xp.toLocaleString()} XP
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <span>🔥</span>
                <span className="font-medium">{entry.streak}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
