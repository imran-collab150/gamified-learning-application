export interface UserProgress {
  id: string;
  lessonId: string;
  status: 'completed' | 'in-progress' | 'not-started';
  xpEarned: number;
  timestamp: number;
}

export interface UserTelemetry {
  id: string;
  sessionId: string;
  actions: string[];
  duration: number;
  timestamp: number;
}

export interface UserProfile {
  userId: string;
  level: number;
  xp: number;
  streak: number;
  lastActive: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  skill: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface SyncItem {
  id: string;
  type: 'progress' | 'telemetry';
  payload: unknown;
  timestamp: number;
  status: 'pending' | 'synced' | 'failed';
}
