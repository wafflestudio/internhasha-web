const LOCAL_STORAGE_TOKEN_KEY = 'waffle-token';

export type TokenLocalStorageRepository = {
  setToken({ token }: { token: string }): void;
  getToken(): string | null;
  removeToken(): void;
};

export const implTokenLocalStorageRepository =
  (): TokenLocalStorageRepository => ({
    setToken: ({ token }) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    },
    getToken: () => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      return token satisfies string | null;
    },
    removeToken: () => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    },
  });
