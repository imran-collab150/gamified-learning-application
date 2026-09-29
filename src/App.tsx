import { useState } from 'react';
import Home from './views/Home';
import LessonView from './views/LessonView';
import Profile from './views/Profile';
import Header from './components/ui/Header';
import SidebarNav from './components/ui/SidebarNav';
import RightPanel from './components/ui/RightPanel';

export default function App() {
  const [page, setPage] = useState<'home' | 'lesson' | 'profile'>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - visible on tablet+ */}
      <SidebarNav
        activePage={page}
        setActivePage={setPage as (page: string) => void}
        sidebarCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="relative z-10 flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {page === 'home' && <Home />}
            {page === 'lesson' && <LessonView />}
            {page === 'profile' && <Profile />}
          </div>
        </main>
      </div>

      {/* Right Panel - desktop only */}
      <RightPanel />
    </div>
  );
}
