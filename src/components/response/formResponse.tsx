import type { ReactNode } from 'react';

export const FormErrorResponse = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <span className="mt-2 text-sm text-red-300">{children}</span>
    </div>
  );
};

export const FormInfoResponse = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <span className="mt-2 text-sm text-blue-300">{children}</span>
    </div>
  );
};
