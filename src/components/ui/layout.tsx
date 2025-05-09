import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import { cn } from '@/lib/utils';

const backgroundClassName = cva(
  'fixed inset-0 z-50 flex items-center justify-center',
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
    VariantProps<typeof backgroundClassName> {
  isVisible?: boolean;
  onOutSlideClick?: () => void;
}

export const PageLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div className={cn('min-h-screen bg-grey-50', className)}>
        <GlobalNavigationBar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export const ModalFloatBackground = ({
  children,
  variant,
  isVisible,
  onOutSlideClick,
}: ModalProps) => {
  return (
    <div
      className={cn(backgroundClassName({ variant }), 'p-9 xs:p-0')}
      onClick={onOutSlideClick}
    >
      <div
        className={cn(
          'flex w-full flex-col gap-[40px] rounded-2xl bg-white p-6 pt-[40px] text-center shadow-lg xs:max-w-[408px]',
          isVisible === undefined || isVisible
            ? 'animate-popup'
            : 'animate-popout',
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const ModalSelectBackground = ({
  children,
  variant,
  isVisible,
  className,
  onOutSlideClick,
}: ModalProps) => {
  return (
    <div
      className={cn(backgroundClassName({ variant }), 'p-9 xs:p-4')}
      onClick={onOutSlideClick}
    >
      <div
        className={cn(
          'flex w-full flex-col gap-[42px] rounded-2xl bg-white p-3.5 pt-[42px] text-center xs:max-w-sm',
          isVisible === undefined || isVisible
            ? 'animate-popup'
            : 'animate-popout',
          className,
        )}
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
          'flex flex-1 flex-col items-center justify-center bg-grey-50 px-9 xs:px-0',
          className,
        )}
      >
        <div className="flex w-full flex-col gap-5 rounded-2xl bg-white px-5 pb-[30px] pt-10 shadow-md xs:max-w-md xs:px-[34px]">
          {children}
        </div>
      </div>
    </div>
  );
};
