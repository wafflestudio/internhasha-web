import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const coffeeChatBtnClassName = cva(
  'inline-flex cursor-pointer items-center rounded-lg border border-transparent px-[10px] py-[6px] text-14 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        accept: 'bg-grey-800 text-white hover:bg-grey-400',
        reject: 'bg-red-300 text-white hover:bg-red-200',
        all: 'bg-grey-200 text-black hover:border-grey-300 hover:bg-grey-100',
        cancel:
          'bg-grey-200 text-grey-600 hover:border-grey-300 hover:bg-grey-100',
      },
    },
    defaultVariants: {
      variant: 'accept',
    },
  },
);

interface CoffeeChatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof coffeeChatBtnClassName> {}

export function CoffeeChatButton({
  className,
  variant,
  ...props
}: CoffeeChatButtonProps) {
  return (
    <button
      className={cn(coffeeChatBtnClassName({ variant, className }))}
      {...props}
    />
  );
}
