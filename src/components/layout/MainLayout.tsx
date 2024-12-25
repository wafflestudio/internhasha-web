import type { ReactNode } from 'react';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col p-5">{children}</div>;
};
