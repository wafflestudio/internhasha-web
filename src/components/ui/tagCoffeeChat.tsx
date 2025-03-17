import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
  COFFEE_CHAT_STATUS_MAP,
  type CoffeeChatStatus,
} from '@/entities/coffeeChat';
import { cn } from '@/lib/utils';

const tagClassName = cva(
  'text inline-flex items-center rounded-sm border-transparent px-2 py-1.5 text-13 text-sm font-regular transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        pending: 'bg-yellow-100 text-yellow-900',
        accepted: 'bg-green-100 text-green-900',
        canceled: 'bg-red-100 text-grey-900',
        rejected: 'bg-red-100 text-red-900',
      },
    },
    defaultVariants: {
      variant: 'pending',
    },
  },
);

interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagClassName> {
  coffeeChatStatus: CoffeeChatStatus;
}

export function TagCoffeeChat({
  className,
  coffeeChatStatus,
  ...props
}: TagProps) {
  const { variant, label } = COFFEE_CHAT_STATUS_MAP[coffeeChatStatus];
  return (
    <div className={cn(tagClassName({ variant }), className)} {...props}>
      {label}
    </div>
  );
}
