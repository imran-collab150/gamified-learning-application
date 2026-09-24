import { useGameStore } from '../stores/gameStore';
import XPBar from '../components/gamification/XPBar';
import LevelBadge from '../components/gamification/LevelBadge';
import StreakCounter from '../components/gamification/StreakCounter';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function Home() {
  const { xp, level, completedLessons } = useGameStore();
  const isOnline = useOnlineStatus();

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <LevelBadge />
        <StreakCounter />
      </div>
      <div>
        <p className="text-sm text-gray-400">Level {level} — {xp} / {Math.round(100 * Math.pow(level, 1.5))} XP</p>
        <XPBar />
      </div>
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-lg font-bold">Progress</h3>
        <p className="text-gray-400">Lessons Completed: {completedLessons.length}</p>
        <p className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
          Status: {isOnline ? '🟢 Online' : '🔴 Offline'}
        </p>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-lg font-bold">Quick Start</h3>
        <p className="text-gray-400">Begin your learning journey with a micro-lesson!</p>
      </div>
    </div>
  );
}
