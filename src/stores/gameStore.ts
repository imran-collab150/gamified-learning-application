import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dbPut } from '../lib/db';

interface GameState {
  level: number;
  xp: number;
  streak: number;
  streakFreeze: boolean;
  completedLessons: string[];
  addXP: (amount: number) => void;
  nextLevelXP: () => number;
  incrementStreak: () => void;
  resetStreak: () => void;
  activateStreakFreeze: () => void;
  completeLesson: (lessonId: string) => void;
}

async function enqueueSync(item: { type: 'progress' | 'telemetry'; payload: unknown }) {
  const { addToQueue } = await import('../lib/syncQueue');
  await addToQueue(item);
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      level: 1,
      xp: 0,
      streak: 0,
      streakFreeze: false,
      completedLessons: [],

      addXP: (amount: number) => {
        const newXP = get().xp + amount;
        const newLevel = get().level;
        const requiredXP = 100 * Math.pow(newLevel, 1.5);

        if (newXP >= requiredXP) {
          const overflowXP = newXP - requiredXP;
          const newLevelUp = newLevel + 1;
          set({
            level: newLevelUp,
            xp: overflowXP,
            streak: get().streak + 1,
          });
          dbPut('progress', {
            id: `levelup-${Date.now()}`,
            lessonId: 'system',
            status: 'completed',
            xpEarned: amount,
            timestamp: Date.now(),
          });
        } else {
          set({ xp: newXP, streak: get().streak + 1 });
        }
      },

      nextLevelXP: () => 100 * Math.pow(get().level, 1.5),

      incrementStreak: () => set({ streak: get().streak + 1 }),

      resetStreak: () => set({ streak: 0 }),

      activateStreakFreeze: () => set({ streakFreeze: true }),

      completeLesson: async (lessonId: string) => {
        const newCompleted = [...get().completedLessons, lessonId];
        set({ completedLessons: newCompleted });
        await dbPut('progress', {
          id: lessonId,
          lessonId,
          status: 'completed',
          xpEarned: 10,
          timestamp: Date.now(),
        });
        await enqueueSync({ type: 'progress', payload: { lessonId, status: 'completed' } });
      },
    }),
    {
      name: 'gamified-game-store',
      partialize: (state) => ({
        level: state.level,
        xp: state.xp,
        streak: state.streak,
        streakFreeze: state.streakFreeze,
        completedLessons: state.completedLessons,
      }),
    },
  ),
);
