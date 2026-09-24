import { useState } from 'react';
import Home from './views/Home';
import LessonView from './views/LessonView';
import Profile from './views/Profile';

export default function App() {
  const [page] = useState<'home' | 'lesson' | 'profile'>('home');

  return (
    <div className="min-h-screen">
      {page === 'home' && <Home />}
      {page === 'lesson' && <LessonView />}
      {page === 'profile' && <Profile onToggleSidebar={() => {}} />}
    </div>
  );
}
