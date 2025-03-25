import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const coffeeChatBtnClassName = cva(
  'inline-flex cursor-pointer items-center rounded-lg border-transparent px-3.5 py-2 text-13 font-medium text-black shadow-sm transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        accept: 'bg-green-200 hover:bg-green-400',
        reject: 'bg-red-200 hover:bg-red-400',
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
