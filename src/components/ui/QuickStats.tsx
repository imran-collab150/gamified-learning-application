import { useGameStore } from '../../stores/gameStore';

export default function QuickStats() {
  const { user, streak } = useGameStore();
  const requiredXP = 100 * Math.pow(user.level, 1.5);
  const xpPercent = Math.min((user.xp / requiredXP) * 100, 100);

  return (
    <div className="quick-stats-layout glass-card rounded-2xl p-5 sm:p-6 animate-fade-in-up">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Stats</h3>
      <div className="space-y-4 sm:space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Level Progress</span>
            <span className="text-sm font-semibold gradient-text">{Math.round(xpPercent)}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2.5 sm:h-3 overflow-hidden">
            <div
              className="h-2.5 sm:h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl mb-1">🔥</p>
          <p className="text-xl sm:text-2xl font-bold text-white">{streak}</p>
          <p className="text-xs sm:text-sm text-gray-400">Day Streak</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-lg sm:text-xl">⚡</p>
            <p className="text-sm font-bold text-white mt-1">{user.xp}</p>
            <p className="text-xs text-gray-400">XP</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-lg sm:text-xl">📚</p>
            <p className="text-sm font-bold text-white mt-1">7</p>
            <p className="text-xs text-gray-400">Paths</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-lg sm:text-xl">🏆</p>
            <p className="text-sm font-bold text-white mt-1">12</p>
            <p className="text-xs text-gray-400">Badges</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-lg sm:text-xl">👥</p>
            <p className="text-sm font-bold text-white mt-1">142</p>
            <p className="text-xs text-gray-400">Rank</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <span className="text-gray-400 text-sm">Status</span>
          <span className="text-green-400 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Online
          </span>
        </div>
      </div>
    </div>
  );
}
