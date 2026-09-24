import Header from '../components/ui/Header';
import DailyGoals from '../components/ui/DailyGoals';
import LearningPaths from '../components/ui/LearningPaths';
import CommunityHighlights from '../components/ui/CommunityHighlights';
import BottomNav from '../components/ui/BottomNav';

export default function Home() {
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

      <Header />
      <main className="relative z-10 pt-2">
        <DailyGoals />
        <LearningPaths />
        <CommunityHighlights />
      </main>
      <BottomNav />
    </div>
  );
}
