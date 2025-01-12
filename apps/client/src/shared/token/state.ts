export type TokenState = {
  setToken({ token }: { token: string }): void;
  removeToken(): void;
};

export const implTokenState = ({
  setToken,
}: {
  setToken(token: string | null): void;
}): TokenState => ({
  setToken: ({ token }) => {
    setToken(token);
  },
  removeToken: () => {
    setToken(null);
  },
});
