import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { cn } from '@/lib/utils';

const backgroundVariants = cva(
  'fixed inset-0 flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-grey-50',
        transparent: 'bg-grey-900/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ModalProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof backgroundVariants> {
  isVisible?: boolean;
  onOutSlideClick?: () => void;
}

export const ModalFloatBackground = ({
  children,
  variant,
  isVisible,
  onOutSlideClick,
}: ModalProps) => {
  return (
    <div
      className={cn(backgroundVariants({ variant }))}
      onClick={onOutSlideClick}
    >
      <div
        className={`flex w-full max-w-sm flex-col gap-[60px] rounded-2xl bg-white p-6 text-center shadow-lg ${isVisible === undefined || isVisible ? 'animate-popup' : 'animate-popout'}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const ModalBackgroundWithHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <GlobalNavigationBar />
      <div
        className={cn(
          'flex flex-1 flex-col items-center justify-center bg-grey-50',
          className,
        )}
      >
        <div className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white px-[34px] pb-[30px] pt-10 shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};
