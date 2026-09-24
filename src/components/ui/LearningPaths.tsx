import { useGameStore } from '../../stores/gameStore';

function getStatusStyles(status: string) {
  switch (status) {
    case 'active': return 'bg-blue-500/20 text-blue-400 border border-blue-500/20';
    case 'in-progress': return 'bg-purple-500/20 text-purple-400 border border-purple-500/20';
    case 'locked': return 'bg-gray-500/20 text-gray-500 border border-gray-500/20';
    default: return 'bg-gray-500/20 text-gray-500 border border-gray-500/20';
  }
}

export default function LearningPaths() {
  const { categories } = useGameStore();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Explore Learning Paths</h3>
        <button className="touch-target text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
          View All →
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className="glass-card rounded-xl p-5 cursor-pointer group animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="touch-target w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}10)`,
                  boxShadow: `0 4px 16px ${cat.color}20`,
                }}
              >
                {cat.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-base">{cat.title}</h4>
                <p className="text-sm text-gray-400 mt-0.5">{cat.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {cat.status === 'locked' ? (
                <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusStyles(cat.status)}`}>
                  🔒 Locked
                </span>
              ) : cat.status === 'in-progress' ? (
                <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusStyles(cat.status)}`}>
                  Lvl {cat.level} · {cat.completed}/{cat.modules}
                </span>
              ) : (
                <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusStyles(cat.status)}`}>
                  {cat.modules} Modules
                </span>
              )}
              <button
                disabled={cat.status === 'locked'}
                className={`touch-target px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  cat.status === 'locked'
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : cat.status === 'in-progress'
                    ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]'
                }`}
              >
                {cat.status === 'locked' ? 'Locked' : cat.status === 'in-progress' ? 'Continue' : 'Start'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
