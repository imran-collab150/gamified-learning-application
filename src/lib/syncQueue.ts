import { dbPut, dbGetAll } from './db';
import type { SyncItem } from '../types';

export async function addToQueue(item: Omit<SyncItem, 'id' | 'timestamp' | 'status'>): Promise<void> {
  const syncItem: SyncItem = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: Date.now(),
    status: 'pending',
  };
  await dbPut('syncQueue', syncItem);
}

export async function processQueue(): Promise<void> {
  if (!navigator.onLine) return;
  const items = await dbGetAll<SyncItem>('syncQueue');
  const pendingItems = items.filter((item) => item.status === 'pending');

  for (const item of pendingItems) {
    try {
      const response = await fetch('/api/v1/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([item]),
      });
      if (response.ok) {
        await dbPut('syncQueue', { ...item, status: 'synced' });
      }
    } catch {
      await dbPut('syncQueue', { ...item, status: 'failed' });
    }
  }
}

export function setupSyncListener(): void {
  window.addEventListener('online', () => {
    processQueue();
  });
}
