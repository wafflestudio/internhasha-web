import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const coffeeChatBtnVariants = cva(
  'inline-flex cursor-pointer items-center rounded-lg border-transparent px-2.5 py-2.5 text-12 font-regular text-black shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        accept: 'bg-blue-100 hover:bg-blue-900',
        reject: 'bg-red-100 hover:bg-red-900',
      },
    },
    defaultVariants: {
      variant: 'accept',
    },
  },
);

interface CoffeeChatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof coffeeChatBtnVariants> {}

export function CoffeeChatButton({
  className,
  variant,
  ...props
}: CoffeeChatButtonProps) {
  return (
    <button
      className={cn(coffeeChatBtnVariants({ variant, className }))}
      {...props}
    />
  );
}
