import { useGameStore } from '../stores/gameStore';

export default function Profile() {
  const { user, streak } = useGameStore();
  const requiredXP = 100 * Math.pow(user.level, 1.5);
  const xpPercent = Math.min((user.xp / requiredXP) * 100, 100);

  return (
    <div className="relative pb-20 lg:pb-0">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="particle top-[20%] right-[10%] w-2 h-2" style={{ animationDelay: '1s', background: 'rgba(139, 92, 246, 0.4)' }} />
        <div className="particle top-[50%] left-[15%] w-1.5 h-1.5" style={{ animationDelay: '3s', background: 'rgba(59, 130, 246, 0.4)' }} />
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Profile</h2>
        <div className="glass-card rounded-2xl p-5 sm:p-6 animate-fade-in-up">
          <div className="flex items-center gap-4 sm:gap-6 mb-6">
            <div className="relative touch-target w-20 h-20 sm:w-24 sm:h-24">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold text-white avatar-ring">
                {user.name[0]}
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{user.name}</h3>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">Level {user.level} · {streak} 🔥 Day Streak</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">XP</span>
              <span className="font-bold gradient-text">{user.xp} / {Math.round(requiredXP)}</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2.5 sm:h-3 overflow-hidden">
              <div
                className="h-2.5 sm:h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4">
              <div className="glass rounded-xl p-3 text-center">
                <p className="text-xl sm:text-2xl">🔥</p>
                <p className="text-sm font-bold text-white mt-1">{streak}</p>
                <p className="text-xs text-gray-400">Streak</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <p className="text-xl sm:text-2xl">⚡</p>
                <p className="text-sm font-bold text-white mt-1">{user.xp}</p>
                <p className="text-xs text-gray-400">XP</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <p className="text-xl sm:text-2xl">📚</p>
                <p className="text-sm font-bold text-white mt-1">7</p>
                <p className="text-xs text-gray-400">Paths</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <p className="text-xl sm:text-2xl">🏆</p>
                <p className="text-sm font-bold text-white mt-1">12</p>
                <p className="text-xs text-gray-400">Badges</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-400 text-sm">Status</span>
              <span className="text-green-400 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
