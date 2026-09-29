import { useGameStore } from '../../stores/gameStore';

export default function RightPanel() {
  const { user, streak } = useGameStore();
  const requiredXP = 100 * Math.pow(user.level, 1.5);
  const xpPercent = Math.min((user.xp / requiredXP) * 100, 100);
  const leaderboard = [
    { name: 'Alex', xp: 3200, level: 18, rank: 1 },
    { name: 'Sam', xp: 2850, level: 17, rank: 2 },
    { name: 'Maya', xp: 2720, level: 16, rank: 3 },
    { name: 'You', xp: 2840, level: 17, rank: 4 },
    { name: 'Jordan', xp: 2100, level: 15, rank: 5 },
  ];

  return (
    <aside className="hidden lg:block w-80 flex-shrink-0">
      <div className="sticky top-20 space-y-4">
        {/* Quick Profile */}
        <div className="glass-card rounded-2xl p-5 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative touch-target w-12 h-12">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm avatar-ring">
                {user.name[0]}
              </div>
            </div>
            <div>
              <p className="font-bold text-white">{user.name}</p>
              <p className="text-xs text-gray-400">Lv.{user.level} · Rank #{leaderboard.find(l => l.name === 'You')?.rank}</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">XP</span>
              <span className="text-white">{user.xp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Streak</span>
              <span className="text-orange-400">🔥 {streak}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">XP to Next Level</span>
              <span className="text-white">{Math.round(requiredXP - user.xp)}</span>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="glass-card rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <p className="text-sm font-semibold text-gray-300 mb-2">Level Progress</p>
          <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{Math.round(xpPercent)}% to Level {user.level + 1}</p>
        </div>

        {/* Leaderboard */}
        <div className="glass-card rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <h3 className="text-lg font-bold text-white mb-3">Weekly Leaderboard</h3>
          <div className="space-y-2">
            {leaderboard.map((person, i) => (
              <div
                key={person.name}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                  person.name === 'You'
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="w-6 text-center font-bold text-sm">
                  {person.rank === 1 ? '🥇' : person.rank === 2 ? '🥈' : person.rank === 3 ? '🥉' : i + 1}
                </div>
                <div className="w-7 h-7 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-xs">
                  {person.name[0]}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${person.name === 'You' ? 'text-white' : 'text-gray-300'}`}>{person.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Lv.{person.level}</p>
                  <p className="text-xs font-bold text-white">{person.xp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <h3 className="text-lg font-bold text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="touch-target py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-xs hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
              Share Progress
            </button>
            <button className="touch-target py-2 rounded-lg border border-white/20 text-gray-300 font-semibold text-xs hover:bg-white/10 transition-all duration-300">
              Settings
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
