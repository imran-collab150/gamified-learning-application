import Header from '../components/ui/Header';
import DailyGoals from '../components/ui/DailyGoals';
import LearningPaths from '../components/ui/LearningPaths';
import CommunityHighlights from '../components/ui/CommunityHighlights';
import BottomNav from '../components/ui/BottomNav';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <main className="pt-2">
        <DailyGoals />
        <LearningPaths />
        <CommunityHighlights />
      </main>
      <BottomNav />
    </div>
  );
}
