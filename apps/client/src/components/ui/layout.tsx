import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { cn } from '@/lib/utils';

const backgroundVariants = cva(
  'fixed inset-0 flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-grey-light-active',
        transparent: 'bg-grey-light-active/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof backgroundVariants> {}

export const ModalFloatBackground = ({ children, variant }: ButtonProps) => {
  return (
    <div className={cn(backgroundVariants({ variant }))}>
      <div className="flex flex-col gap-[60px] bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 text-center animate-popup">
        {children}
      </div>
    </div>
  );
};

export const ModalBackgroundWithHeader = ({ children }: ButtonProps) => {
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
