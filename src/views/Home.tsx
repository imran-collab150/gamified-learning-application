import { useState } from 'react';
import Header from '../components/ui/Header';
import SidebarNav from '../components/ui/SidebarNav';
import DailyGoals from '../components/ui/DailyGoals';
import LearningPaths from '../components/ui/LearningPaths';
import CommunityHighlights from '../components/ui/CommunityHighlights';
import QuickStats from '../components/ui/QuickStats';

export default function Home() {
  const [activePage, setActivePage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Ambient floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="particle top-[10%] left-[20%] w-2 h-2" style={{ animationDelay: '0s' }} />
        <div className="particle top-[30%] right-[15%] w-1.5 h-1.5" style={{ animationDelay: '2s' }} />
        <div className="particle top-[60%] left-[10%] w-1 h-1" style={{ animationDelay: '4s' }} />
        <div className="particle top-[80%] right-[25%] w-2 h-2" style={{ animationDelay: '1s' }} />
        <div className="particle top-[40%] left-[50%] w-1.5 h-1.5" style={{ animationDelay: '3s' }} />
        <div className="particle top-[70%] left-[30%] w-1 h-1" style={{ animationDelay: '5s' }} />
      </div>

      <SidebarNav activePage={activePage} setActivePage={setActivePage} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onToggleSidebar={() => setSidebarOpen(true)} />

      <main className="relative z-10 pt-2 main-content">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="glass-card rounded-2xl p-8 mb-8 gradient-border animate-fade-in-up">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                  Welcome back, <span className="gradient-text">Learner</span>
                </h1>
                <p className="text-lg text-gray-400 mb-6 max-w-lg">
                  Continue your journey to master new micro-skills. You're <span className="text-orange-400 font-semibold">5 days</span> into your streak!
                </p>
                <div className="flex gap-4">
                  <button className="btn-primary touch-target px-8 py-3 text-base">
                    🚀 Continue Learning
                  </button>
                  <button className="touch-target px-8 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300 text-base">
                    📖 Browse Paths
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="touch-target w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-5xl animate-float">
                  ⚡📚
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'XP Earned', value: '2,840', icon: '⚡', color: '#f59e0b' },
              { label: 'Current Level', value: '17', icon: '🏆', color: '#8b5cf6' },
              { label: 'Streak', value: '5 Days', icon: '🔥', color: '#ef4444' },
              { label: 'Modules Done', value: '23', icon: '📚', color: '#3b82f6' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-5 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-sm text-gray-400">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <DailyGoals />
            </div>
            <div>
              <QuickStats />
            </div>
          </div>

          <LearningPaths />
          <CommunityHighlights />
        </div>
      </main>
    </div>
  );
}
