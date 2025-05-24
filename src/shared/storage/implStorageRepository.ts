import type { StorageRepository } from '@/shared/storage/implStorageService';
const storageKey = {
  closeSuggestInfoModalKey: 'internhasha-close-suggest-info-modal',
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
    getIsCloseModal: () => {
      const value = local.get(storageKey.closeSuggestInfoModalKey);
      return value === 'true';
    },
    saveIsCloseModal: (input) => {
      local.set(storageKey.closeSuggestInfoModalKey, JSON.stringify(input));
    },
  };
};
