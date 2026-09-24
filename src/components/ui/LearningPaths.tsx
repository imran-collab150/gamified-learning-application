import { useGameStore } from '../../stores/gameStore';

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-blue-100 text-blue-700';
    case 'in-progress': return 'bg-purple-100 text-purple-700';
    case 'locked': return 'bg-gray-100 text-gray-500';
    default: return 'bg-gray-100 text-gray-500';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'active': return 'Start Path';
    case 'in-progress': return 'Continue Path';
    case 'locked': return 'Locked';
    default: return 'Start Path';
  }
}

export default function LearningPaths() {
  const { categories } = useGameStore();

  return (
    <div className="mx-4 mb-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Explore Learning Paths</h3>
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 touch-target"
          >
            <div className="flex items-center gap-3">
              <div
                className="touch-target w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                {cat.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white">{cat.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{cat.subtitle}</p>
              </div>
              <div className="text-right">
                {cat.status === 'locked' ? (
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(cat.status)}`}>
                    {cat.status === 'locked' ? 'Locked' : 'Prerequisite Needed'}
                  </span>
                ) : cat.status === 'in-progress' ? (
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(cat.status)}`}>
                    Lvl {cat.level} · {cat.completed}/{cat.modules}
                  </span>
                ) : (
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(cat.status)}`}>
                    {cat.modules} Modules
                  </span>
                )}
              </div>
            </div>
            <button
              disabled={cat.status === 'locked'}
              className={`mt-3 w-full touch-target py-2 rounded-lg text-sm font-semibold ${
                cat.status === 'locked'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : cat.status === 'in-progress'
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {cat.status === 'locked' ? 'Locked (Prerequisite Needed)' : `${getStatusLabel(cat.status)} (${cat.modules} Modules)`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
