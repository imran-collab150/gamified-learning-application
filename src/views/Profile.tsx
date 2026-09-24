import { useGameStore } from '../stores/gameStore';
import Header from '../components/ui/Header';

export default function Profile() {
  const { user, streak } = useGameStore();
  const requiredXP = 100 * Math.pow(user.level, 1.5);
  const xpPercent = Math.min((user.xp / requiredXP) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header />
      <main className="pt-2">
        <div className="mx-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Profile</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="touch-target w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                {user.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">Level {user.level}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">XP</span>
                <span className="font-bold text-gray-900 dark:text-white">{user.xp} / {Math.round(requiredXP)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Streak</span>
                <span className="font-bold text-orange-500">🔥 {streak} Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className="text-green-600 font-semibold">🟢 Online</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
