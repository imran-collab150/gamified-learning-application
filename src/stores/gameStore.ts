import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dbPut } from '../lib/db';
import { addToQueue } from '../lib/syncQueue';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  status: 'active' | 'in-progress' | 'locked';
  modules: number;
  completed: number;
  level?: number;
}

interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  xp: number;
}

interface GameState {
  user: UserProfile;
  categories: Category[];
  streak: number;
  streakFreeze: boolean;
  completedLessons: string[];
  dailyGoalProgress: number;
  modulesCompletedToday: number;
  modulesGoalToday: number;
  addXP: (amount: number) => void;
  nextLevelXP: () => number;
  incrementStreak: () => void;
  resetStreak: () => void;
  activateStreakFreeze: () => void;
  completeLesson: (lessonId: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: {
        name: 'Player',
        avatar: '',
        level: 4,
        xp: 1250,
      },
      categories: [
        {
          id: 'maths',
          title: 'Mathematics',
          subtitle: 'Build problem-solving skills with interactive lessons.',
          icon: '📐',
          color: '#3B82F6',
          status: 'active',
          modules: 12,
          completed: 0,
        },
        {
          id: 'english',
          title: 'English',
          subtitle: 'Master grammar, vocabulary, and comprehension.',
          icon: '📖',
          color: '#8B5CF6',
          status: 'active',
          modules: 10,
          completed: 4,
          level: 2,
        },
        {
          id: 'science',
          title: 'Science',
          subtitle: 'Explore physics, chemistry, and biology.',
          icon: '🔬',
          color: '#10B981',
          status: 'locked',
          modules: 8,
          completed: 0,
        },
        {
          id: 'history',
          title: 'History',
          subtitle: 'Learn about civilizations, events, and eras.',
          icon: '🏛️',
          color: '#F59E0B',
          status: 'locked',
          modules: 6,
          completed: 0,
        },
        {
          id: 'coding',
          title: 'Front-End Development',
          subtitle: 'Build responsive websites with React.',
          icon: '</>',
          color: '#3B82F6',
          status: 'active',
          modules: 12,
          completed: 0,
        },
        {
          id: 'design',
          title: 'Graphic Design',
          subtitle: 'Master layout, color, and typography.',
          icon: '🎨',
          color: '#8B5CF6',
          status: 'in-progress',
          modules: 10,
          completed: 4,
          level: 2,
        },
        {
          id: 'copywriting',
          title: 'Copywriting',
          subtitle: 'Write compelling content that converts.',
          icon: '✍️',
          color: '#10B981',
          status: 'locked',
          modules: 8,
          completed: 0,
        },
      ],
      streak: 7,
      streakFreeze: false,
      completedLessons: [],
      dailyGoalProgress: 65,
      modulesCompletedToday: 2,
      modulesGoalToday: 3,

      addXP: (amount: number) => {
        const newXP = get().user.xp + amount;
        const newLevel = get().user.level;
        const requiredXP = 100 * Math.pow(newLevel, 1.5);

        if (newXP >= requiredXP) {
          const overflowXP = newXP - requiredXP;
          const newLevelUp = newLevel + 1;
          set({
            user: { ...get().user, level: newLevelUp, xp: overflowXP },
            streak: get().streak + 1,
            completedLessons: [...get().completedLessons, 'system'],
          });
          dbPut('progress', {
            id: `levelup-${Date.now()}`,
            lessonId: 'system',
            status: 'completed',
            xpEarned: amount,
            timestamp: Date.now(),
          });
          addToQueue({ type: 'progress', payload: { lessonId: 'system', status: 'completed' } });
        } else {
          set({ user: { ...get().user, xp: newXP } });
        }
      },

      nextLevelXP: () => 100 * Math.pow(get().user.level, 1.5),

      incrementStreak: () => set({ streak: get().streak + 1 }),

      resetStreak: () => set({ streak: 0 }),

      activateStreakFreeze: () => set({ streakFreeze: true }),

      completeLesson: (lessonId: string) => {
        set({ completedLessons: [...get().completedLessons, lessonId] });
        dbPut('progress', {
          id: lessonId,
          lessonId,
          status: 'completed',
          xpEarned: 10,
          timestamp: Date.now(),
        });
        addToQueue({ type: 'progress', payload: { lessonId, status: 'completed' } });
      },
    }),
    {
      name: 'gamified-game-store',
      partialize: (state) => ({
        user: state.user,
        categories: state.categories,
        streak: state.streak,
        streakFreeze: state.streakFreeze,
        completedLessons: state.completedLessons,
        dailyGoalProgress: state.dailyGoalProgress,
        modulesCompletedToday: state.modulesCompletedToday,
        modulesGoalToday: state.modulesGoalToday,
      }),
    },
  ),
);
