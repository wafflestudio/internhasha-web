export type TokenStateRepository = {
  setToken({ token }: { token: string }): void;
  removeToken(): void;
};

export const implTokenStateRepository = ({
  setToken,
}: {
  setToken(token: string | null): void;
}): TokenStateRepository => ({
  setToken: ({ token }) => {
    setToken(token);
  },
  removeToken: () => {
    setToken(null);
  },
});
