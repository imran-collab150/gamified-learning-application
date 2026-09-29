export default function SidebarNav({ activePage, setActivePage, sidebarCollapsed, onToggleCollapse, sidebarOpen, onClose }: { 
  activePage: string; 
  setActivePage: (page: string) => void;
  sidebarCollapsed: boolean;
  onToggleCollapse: () => void;
  sidebarOpen: boolean;
  onClose: () => void;
}) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'achievements', icon: '🏆', label: 'Ranks' },
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  const renderTab = (tab: typeof tabs[0]) => (
    <button
      key={tab.id}
      onClick={() => {
        setActivePage(tab.id);
        onClose();
      }}
      className={`touch-target flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
        activePage === tab.id
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/20'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
      title={tab.label}
    >
      <span className="text-xl">{tab.icon}</span>
      {!sidebarCollapsed && (
        <>
          <span>{tab.label}</span>
          {activePage === tab.id && (
            <div className="ml-auto w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          )}
        </>
      )}
    </button>
  );

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full glass border-r border-transparent z-50 transition-all duration-300 ease-out
          lg:relative lg:translate-x-0 lg:z-0
          lg:w-64
          md:w-16 md:hover:w-64 md:group
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
          ${sidebarOpen && !sidebarCollapsed ? '' : ''}
        `}
      >
        {/* Mobile: full sidebar, Tablet: icon rail (hover expands), Desktop: full or collapsed */}
        <div className="h-full overflow-y-auto pt-20">
          <div className="p-3 space-y-1">
            {/* Collapse toggle (desktop/tablet only) */}
            {!sidebarOpen && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:block touch-target w-full flex items-center justify-center py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 mb-4"
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <span className="text-xl">{sidebarCollapsed ? '→' : '←'}</span>
              </button>
            )}

            {tabs.map(renderTab)}
          </div>
        </div>
      </aside>
    </>
  );
}
