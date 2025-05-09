import type { ReactNode } from 'react';

import { ICON_SRC } from '@/entities/asset';

export const Information = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-2 bg-grey-50 p-4 text-13 font-light">
      <img src={ICON_SRC.INFO} className="mt-0.5 h-4 w-4" />
      {children}
    </div>
  );
};
