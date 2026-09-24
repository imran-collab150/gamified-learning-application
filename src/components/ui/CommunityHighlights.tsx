export default function CommunityHighlights() {
  const highlights = [
    { title: 'Top Weekly Earners', icon: '🏆', color: '#F59E0B' },
    { title: 'Featured Project Showcase', icon: '📸', color: '#3B82F6' },
    { title: 'Achievement Unlocked', icon: '🎯', color: '#10B981' },
  ];

  return (
    <div className="mx-4 mb-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Community Highlights</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {highlights.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 touch-target min-w-[140px]"
          >
            <div
              className="touch-target w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2"
              style={{ backgroundColor: `${item.color}20` }}
            >
              {item.icon}
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">View Details →</p>
          </div>
        ))}
      </div>
    </div>
  );
}
