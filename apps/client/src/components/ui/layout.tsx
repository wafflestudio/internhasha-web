import type { ReactNode } from 'react';

export const ModalBackground = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col w-full max-w-md pt-10 pb-[30px] px-[34px] gap-8 space-y-6 bg-white rounded-2xl shadow-md">
        {children}
      </div>
    </div>
  );
};
