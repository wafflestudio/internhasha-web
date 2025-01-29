import type { ReactNode } from 'react';

export const FormErrorResponse = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <span className="text-red-normal text-sm mt-2">{children}</span>
    </div>
  );
};

export const FormInfoResponse = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <span className="text-blue-normal text-sm mt-2">{children}</span>
    </div>
  );
};
