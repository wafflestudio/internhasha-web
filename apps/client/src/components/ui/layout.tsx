import type { ReactNode } from 'react';

export const ModalBackground = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col w-full max-w-md pt-10 pb-[30px] px-[34px] gap-5 bg-white rounded-2xl shadow-md">
        {children}
      </div>
    </div>
  );
};

export const ModalFloatBackground = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-[60px] bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 text-center">
        {children}
      </div>
    </div>
  );
};
