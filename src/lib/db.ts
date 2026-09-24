import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';

interface GamifiedLearningDB extends DBSchema {
  progress: {
    key: string;
    value: {
      id: string;
      lessonId: string;
      status: 'completed' | 'in-progress' | 'not-started';
      xpEarned: number;
      timestamp: number;
    };
    indexes: { 'by-lesson': string };
  };
  telemetry: {
    key: string;
    value: {
      id: string;
      sessionId: string;
      actions: string[];
      duration: number;
      timestamp: number;
    };
  };
  syncQueue: {
    key: string;
    value: {
      id: string;
      type: 'progress' | 'telemetry';
      payload: unknown;
      timestamp: number;
      status: 'pending' | 'synced' | 'failed';
    };
    indexes: { 'by-status': string };
  };
  lessons: {
    key: string;
    value: {
      id: string;
      title: string;
      content: string;
      skill: string;
      difficulty: 'beginner' | 'intermediate' | 'advanced';
    };
  };
}

let dbInstance: IDBPDatabase<GamifiedLearningDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<GamifiedLearningDB>> {
  if (dbInstance) return dbInstance;
  dbInstance = await openDB<GamifiedLearningDB>('gamified-learning-db', 1, {
    upgrade(db) {
      db.createObjectStore('progress', { keyPath: 'id' }).createIndex('by-lesson', 'lessonId');
      db.createObjectStore('telemetry', { keyPath: 'id' });
      db.createObjectStore('syncQueue', { keyPath: 'id' }).createIndex('by-status', 'status');
      db.createObjectStore('lessons', { keyPath: 'id' });
    },
  });
  return dbInstance;
}

export async function dbGet<T>(store: 'progress' | 'telemetry' | 'syncQueue' | 'lessons', key: string): Promise<T | undefined> {
  const db = await getDB();
  return db.get(store, key) as T | undefined;
}

export async function dbPut<T>(store: 'progress' | 'telemetry' | 'syncQueue' | 'lessons', value: T): Promise<void> {
  const db = await getDB();
  await db.put(store, value as any);
}

export async function dbGetAll<T>(store: 'progress' | 'telemetry' | 'syncQueue' | 'lessons'): Promise<T[]> {
  const db = await getDB();
  return db.getAll(store) as unknown as T[];
}

export async function dbDelete(store: 'progress' | 'telemetry' | 'syncQueue' | 'lessons', key: string): Promise<void> {
  const db = await getDB();
  await db.delete(store, key);
}
