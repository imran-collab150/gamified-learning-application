import { useState } from 'react';

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'achievements' | 'profile'>('home');

  const tabs = [
    { id: 'home' as const, icon: '🏠', label: 'Home' },
    { id: 'search' as const, icon: '🔍', label: 'Search' },
    { id: 'achievements' as const, icon: '🏆', label: 'Achievements' },
    { id: 'profile' as const, icon: '👤', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-2 z-50">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`touch-target flex flex-col items-center gap-1 px-4 py-2 rounded-lg ${
              activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
