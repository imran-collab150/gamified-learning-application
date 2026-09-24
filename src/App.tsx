import { useState } from 'react';
import { useGameStore } from './stores/gameStore';
import Home from './views/Home';
import LessonView from './views/LessonView';
import Profile from './views/Profile';

export default function App() {
  const [page, setPage] = useState<'home' | 'lesson' | 'profile'>('home');
  const { } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="flex justify-around p-4 bg-gray-900 border-b border-gray-800">
        <button
          onClick={() => setPage('home')}
          className="min-h-[48px] min-w-[48px] px-4 text-lg"
        >
          Home
        </button>
        <button
          onClick={() => setPage('lesson')}
          className="min-h-[48px] min-w-[48px] px-4 text-lg"
        >
          Lessons
        </button>
        <button
          onClick={() => setPage('profile')}
          className="min-h-[48px] min-w-[48px] px-4 text-lg"
        >
          Profile
        </button>
      </nav>
      <main>
        {page === 'home' && <Home />}
        {page === 'lesson' && <LessonView />}
        {page === 'profile' && <Profile />}
      </main>
    </div>
  );
}
