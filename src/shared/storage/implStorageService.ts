export type StorageRepository = {
  removeCloseModalTime: () => void;
  getCloseModalTime: () => Date | null;
  saveCloseModalTime: () => void;
};

export type StorageService = {
  checkModalClosed: ({ envDate }: { envDate: Date }) => boolean;
  setModalClosed: () => void;
};

export const implStorageService = ({
  storageRepository,
}: {
  storageRepository: StorageRepository;
}): StorageService => ({
  checkModalClosed: ({ envDate }) => {
    const storedDate = storageRepository.getCloseModalTime();

    if (storedDate === null) {
      return false;
    }
    if (storedDate < envDate) {
      storageRepository.removeCloseModalTime();
      return false;
    }
    return true;
  },
  setModalClosed: () => {
    storageRepository.saveCloseModalTime();
  },
});
