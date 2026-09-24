import { useState } from 'react';

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'achievements' | 'profile'>('home');

  const tabs = [
    { id: 'home' as const, icon: '🏠', label: 'Home', glow: 'blue' },
    { id: 'search' as const, icon: '🔍', label: 'Search', glow: 'purple' },
    { id: 'achievements' as const, icon: '🏆', label: 'Ranks', glow: 'orange' },
    { id: 'profile' as const, icon: '👤', label: 'Profile', glow: 'green' },
  ];

  return (
    <nav className="bottom-nav-glass fixed bottom-0 left-0 right-0 px-2 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`touch-target flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-white/10 scale-110'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <span className="text-xl transition-transform duration-300">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="w-1 h-1 rounded-full bg-white/60 mt-1" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
