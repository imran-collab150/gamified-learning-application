import { useState } from 'react';

interface Tab {
  id: string;
  icon: string;
  label: string;
}

export default function BottomNav({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [activeTab, setActiveTab] = useState('home');

  const tabs: Tab[] = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'achievements', icon: '🏆', label: 'Ranks' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav-glass fixed bottom-0 left-0 right-0 px-2 py-2 pb-safe z-50 lg:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              onNavigate?.(tab.id);
            }}
            className={`touch-target flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-white/10 text-white'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <span className="text-xl transition-transform duration-300">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="w-1 h-1 rounded-full bg-white/60 mt-0.5" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
