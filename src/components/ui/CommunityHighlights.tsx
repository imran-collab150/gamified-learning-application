export default function CommunityHighlights() {
  const highlights = [
    { title: 'Top Weekly Earners', icon: '🏆', color: '#f59e0b', desc: 'View leaderboard' },
    { title: 'Featured Projects', icon: '📸', color: '#3b82f6', desc: 'See showcases' },
    { title: 'Achievements', icon: '🎯', color: '#10b981', desc: 'Unlock badges' },
    { title: 'Upcoming Events', icon: '📅', color: '#8b5cf6', desc: 'Join events' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Community Highlights</h3>
        <button className="touch-target text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
          See All →
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-5 touch-target cursor-pointer group animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            <div
              className="touch-target w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)` }}
            >
              {item.icon}
            </div>
            <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
