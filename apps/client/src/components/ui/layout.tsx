import type { ReactNode } from 'react';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';

export const ModalFloatBackground = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-[60px] bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 text-center animate-popup">
        {children}
      </div>
    </div>
  );
};

export const ModalBackgroundWithHeader = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <GlobalNavigationBar />
      <div className="flex flex-col flex-1 items-center py-[100px] bg-gray-100">
        <div className="flex flex-col w-full max-w-md pt-10 pb-[30px] px-[34px] gap-5 bg-white rounded-2xl shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};
