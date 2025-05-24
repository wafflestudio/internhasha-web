import type { StorageRepository } from '@/shared/storage/implStorageService';

const storageKey = {
  closeFullNoticeModalKey: 'internhasha-close-full-notice-modal',
};

const createStorageAccessor = (storage: Storage) => ({
  get: (key: string) => storage.getItem(key),
  set: (key: string, value: string) => {
    storage.setItem(key, value);
  },
  remove: (key: string) => {
    storage.removeItem(key);
  },
});

const local = createStorageAccessor(localStorage);

export const implStorageRepository = (): StorageRepository => {
  return {
    removeCloseModalTime: () => {
      local.remove(storageKey.closeFullNoticeModalKey);
    },
    getCloseModalTime: () => {
      const envStringTime = local.get(storageKey.closeFullNoticeModalKey);
      if (envStringTime === null) {
        return null;
      }

      const envTime = new Date(envStringTime);
      if (isNaN(envTime.getTime())) {
        return null;
      }
      return envTime;
    },
    saveCloseModalTime: () => {
      local.set(storageKey.closeFullNoticeModalKey, new Date().toISOString());
    },
  };
};
