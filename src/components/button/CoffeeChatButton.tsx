import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const coffeeChatBtnVariants = cva(
  'text-black inline-flex items-center px-2.5 py-2.5 text-12 font-regular transition-all duration-200 shadow-md hover:shadow-lg border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer ',
  {
    variants: {
      variant: {
        accept: 'bg-blue-light-active hover:bg-blue-light-hover',
        reject: 'bg-red-light-active hover:bg-red-light-hover',
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
