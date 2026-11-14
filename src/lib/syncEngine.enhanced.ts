import { SyncEngine, initSyncEngine } from './syncEngine';
import { getProtectedContent, saveProgress } from './secureDB';

export const EnhancedSyncEngine = {
  ...SyncEngine,
  init: initSyncEngine,
  getProtectedContent,
  saveProgress,
  async syncOfflineQueue(): Promise<{ synced: number; online: boolean }> {
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    return {
      synced: 0,
      online,
    };
  },
};

export default EnhancedSyncEngine;
