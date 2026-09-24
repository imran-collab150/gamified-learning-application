import { useGameStore } from '../../stores/gameStore';

function getTheme(): string {
  if (typeof window === 'undefined') return 'dark';
  return localStorage.getItem('theme') || 'dark';
}

function setTheme(theme: string) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

export default function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { user } = useGameStore();
  const isDark = getTheme() === 'dark';

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="glass sticky top-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-transparent">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="touch-target w-10 h-10 rounded-lg glass flex items-center justify-center text-lg border border-transparent hover:border-white/20 transition-all duration-300 lg:hidden"
        >
          ☰
        </button>
        <div className="touch-target w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-lg sm:text-xl animate-pulse-glow">
          ⚡📚
        </div>
        <span className="text-base sm:text-lg font-bold gradient-text">MicroLearn</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="touch-target glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2">
          <span className="text-yellow-400 text-sm">⚡</span>
          <span className="text-sm font-semibold gradient-text-warm">{user.xp} XP</span>
        </div>
        <div className="relative touch-target">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm avatar-ring">
            {user.name[0]}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border-2 border-gray-900">
            Lv.{user.level}
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="touch-target w-10 h-10 rounded-full glass flex items-center justify-center text-lg border border-transparent hover:border-white/20 transition-all duration-300"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
