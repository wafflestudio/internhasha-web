const LOCAL_STORAGE_TOKEN_KEY = 'waffle-token';

export type TokenLocalStorage = {
  setToken({ token }: { token: string }): void;
  getToken(): string;
  removeToken(): void;
};

export const implTokenLocalStorage = (): TokenLocalStorage => ({
  setToken: ({ token }) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  },
  getToken: () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token === null) {
      throw new Error('토큰 값이 존재하지 않습니다.');
    }
    return token satisfies string;
  },
  removeToken: () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  },
});
