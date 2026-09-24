import { useGameStore } from '../../stores/gameStore';

export default function StreakCounter() {
  const { streak, streakFreeze } = useGameStore();

  return (
    <div className="touch-target flex items-center gap-2">
      <span className={streakFreeze ? 'animate-streak-fire' : ''}>
        {streakFreeze ? '❄️' : '🔥'}
      </span>
      <span className="text-xl font-bold">{streak}</span>
      {streakFreeze && <span className="text-sm text-blue-400">Freeze</span>}
    </div>
  );
}
