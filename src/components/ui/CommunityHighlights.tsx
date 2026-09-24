export default function CommunityHighlights() {
  const highlights = [
    { title: 'Top Weekly Earners', icon: '🏆', color: '#f59e0b', desc: 'View leaderboard' },
    { title: 'Featured Projects', icon: '📸', color: '#3b82f6', desc: 'See showcases' },
    { title: 'Achievements', icon: '🎯', color: '#10b981', desc: 'Unlock badges' },
    { title: 'Upcoming Events', icon: '📅', color: '#8b5cf6', desc: 'Join events' },
  ];

  return (
    <div className="mx-4 mb-4">
      <h3 className="text-xl font-bold text-white mb-4">Community Highlights</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {highlights.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 glass-card rounded-xl p-4 touch-target min-w-[150px] snap-center animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
          >
            <div
              className="touch-target w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 transition-transform duration-300 hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)` }}
            >
              {item.icon}
            </div>
            <h4 className="text-sm font-bold text-white">{item.title}</h4>
            <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
