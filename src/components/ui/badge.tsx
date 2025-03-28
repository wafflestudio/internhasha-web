import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
  COFFEE_CHAT_STATUS_MAP,
  type CoffeeChatStatus,
} from '@/entities/coffeeChat';
import { cn } from '@/lib/utils';

const badgeClassName = cva(
  'inline-flex items-center rounded-md px-2 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-white text-grey-800',
        primary: 'bg-grey-800 text-grey-50',
        secondary: 'bg-grey-50 text-grey-800',
        disabled: 'bg-grey-200 text-grey-500',
        outline: 'border border-grey-200 bg-white text-grey-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeClassName> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeClassName({ variant }), className)} {...props} />
  );
}

const tagStatusClassName = cva(
  'text inline-flex items-center rounded-sm border-transparent px-2 py-1.5 text-13 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        pending: 'bg-yellow-100 text-yellow-900',
        accepted: 'bg-green-100 text-green-900',
        canceled: 'bg-grey-200 text-grey-900',
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
    VariantProps<typeof tagStatusClassName> {
  coffeeChatStatus: CoffeeChatStatus;
}

const TagStatus = ({ className, coffeeChatStatus, ...props }: TagProps) => {
  const { variant, label } = COFFEE_CHAT_STATUS_MAP[coffeeChatStatus];
  return (
    <div className={cn(tagStatusClassName({ variant }), className)} {...props}>
      {label}
    </div>
  );
};

export { Badge, TagStatus };
