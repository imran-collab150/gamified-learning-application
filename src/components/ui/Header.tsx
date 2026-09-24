import { useGameStore } from '../../stores/gameStore';

function getTheme(): string {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem('theme') || 'light';
}

function setTheme(theme: string) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

export default function Header() {
  const { user } = useGameStore();
  const isDark = getTheme() === 'dark';

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    // Force re-render by updating the attribute
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header
      className="px-4 py-3 flex items-center justify-between sticky top-0 z-50 border-b"
      style={{
        backgroundColor: isDark ? '#030712' : '#1f2937',
        borderColor: isDark ? '#374151' : '#374151',
      }}
    >
      <div className="flex items-center gap-2">
        <div className="touch-target w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
          ⚡📚
        </div>
        <span className="text-lg font-bold" style={{ color: 'var(--text-header)' }}>MicroLearn</span>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="touch-target rounded-full px-3 py-1 flex items-center gap-1"
          style={{ backgroundColor: isDark ? '#1f2937' : '#374151' }}
        >
          <span className="text-yellow-400 text-sm">⚡</span>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-header)' }}>{user.xp}</span>
        </div>
        <div className="relative touch-target">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user.name[0]}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            Lv.{user.level}
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="touch-target w-10 h-10 rounded-full flex items-center justify-center text-xl border"
          style={{
            backgroundColor: isDark ? '#1f2937' : '#374151',
            borderColor: isDark ? '#4b5563' : '#4b5563',
          }}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
