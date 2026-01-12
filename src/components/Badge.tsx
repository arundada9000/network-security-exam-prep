interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  progress?: number;
  requirement?: number;
}

interface BadgeProps {
  badge: BadgeData;
  size?: 'sm' | 'md' | 'lg';
}

export const badges: BadgeData[] = [
  {
    id: 'first-exam',
    name: 'First Steps',
    description: 'Complete your first exam',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
    earned: true,
  },
  {
    id: 'perfect-score',
    name: 'Perfectionist',
    description: 'Get 100% on any exam',
    icon: '⭐',
    color: 'from-yellow-500 to-orange-500',
    earned: true,
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    color: 'from-orange-500 to-red-500',
    earned: true,
    progress: 7,
    requirement: 7,
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '💪',
    color: 'from-purple-500 to-pink-500',
    earned: false,
    progress: 7,
    requirement: 30,
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete an exam in under 5 minutes',
    icon: '⚡',
    color: 'from-cyan-500 to-blue-500',
    earned: false,
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Complete 10 exams',
    icon: '📚',
    color: 'from-green-500 to-emerald-500',
    earned: false,
    progress: 3,
    requirement: 10,
  },
  {
    id: 'flashcard-master',
    name: 'Flashcard Master',
    description: 'Review 100 flashcards',
    icon: '🃏',
    color: 'from-indigo-500 to-purple-500',
    earned: false,
    progress: 25,
    requirement: 100,
  },
  {
    id: 'all-categories',
    name: 'Well Rounded',
    description: 'Complete exams in all categories',
    icon: '🌟',
    color: 'from-pink-500 to-rose-500',
    earned: false,
    progress: 2,
    requirement: 5,
  },
];

export default function Badge({ badge, size = 'md' }: BadgeProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  };

  return (
    <div className="flex flex-col items-center group">
      <div
        className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center ${
          badge.earned
            ? `bg-gradient-to-br ${badge.color} shadow-lg`
            : 'bg-muted'
        } transition-transform duration-300 group-hover:scale-110`}
      >
        <span className={badge.earned ? '' : 'grayscale opacity-50'}>
          {badge.icon}
        </span>
        {!badge.earned && badge.progress !== undefined && badge.requirement && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-background rounded-full px-2 py-0.5 text-xs font-medium border border-border">
            {badge.progress}/{badge.requirement}
          </div>
        )}
      </div>
      <span className={`mt-2 text-xs font-medium text-center ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
        {badge.name}
      </span>
    </div>
  );
}
