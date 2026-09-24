export default function SidebarNav({ activePage, setActivePage, isOpen, onClose }: { activePage: string; setActivePage: (page: string) => void; isOpen: boolean; onClose: () => void }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'achievements', icon: '🏆', label: 'Ranks' },
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed left-0 top-0 h-full w-[280px] glass border-r border-transparent z-50 transform transition-transform duration-300 ease-out lg:relative lg:translate-x-0 lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActivePage(tab.id);
                  onClose();
                }}
                className={`touch-target w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  activePage === tab.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
                {activePage === tab.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
