export type StorageRepository = {
  getIsCloseModal: () => boolean;
  saveIsCloseModal: (input: boolean) => void;
};

export type StorageService = {
  checkModalClosed: () => boolean;
  setModalClosed: () => void;
};

export const implStorageService = ({
  storageRepository,
}: {
  storageRepository: StorageRepository;
}): StorageService => ({
  // 입력한 비밀번호가 유효한지 확인
  checkModalClosed: () => {
    return storageRepository.getIsCloseModal();
  },
  setModalClosed: () => {
    storageRepository.saveIsCloseModal(true);
  },
});
