import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
  COFFEE_CHAT_STATUS_MAP,
  type CoffeeChatStatus,
} from '@/entities/coffeeChat';
import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center rounded-sm px-2 py-1.5 text-sm font-regular text-13 text transition-colors border-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-yellow-light-hover text-yellow-darker',
        accepted: 'bg-green-light-hover text-green-darker',
        canceled: 'bg-red-light-hover text-grey-darker',
        rejected: 'bg-red-light-hover text-red-darker',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  coffeeChatStatus: CoffeeChatStatus;
}

export function TagCoffeeChat({
  className,
  coffeeChatStatus,
  ...props
}: TagProps) {
  const { variant, label } = COFFEE_CHAT_STATUS_MAP[coffeeChatStatus];
  return (
    <div className={cn(tagVariants({ variant }), className)} {...props}>
      {label}
    </div>
  );
}
