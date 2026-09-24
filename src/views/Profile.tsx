import { useGameStore } from '../stores/gameStore';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function Profile() {
  const { level, xp, streak, completedLessons } = useGameStore();
  const isOnline = useOnlineStatus();

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="bg-gray-900 p-6 rounded-lg space-y-4">
        <div className="flex items-center gap-4">
          <div className="touch-target bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold text-gray-900">
            Lv.{level}
          </div>
          <div>
            <p className="text-xl font-bold">Level {level}</p>
            <p className="text-gray-400">{xp} / {Math.round(100 * Math.pow(level, 1.5))} XP</p>
          </div>
        </div>
        <div>
          <p className="text-gray-400">Streak: 🔥 {streak}</p>
          <p className="text-gray-400">Lessons Completed: {completedLessons.length}</p>
        </div>
        <div>
          <p className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
            Connection: {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
    </div>
  );
}
