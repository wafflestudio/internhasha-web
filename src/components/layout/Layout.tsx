import type { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col max-w-[600px] m-auto">{children}</div>;
};
