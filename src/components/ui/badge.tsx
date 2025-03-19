import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
  COFFEE_CHAT_STATUS_MAP,
  type CoffeeChatStatus,
} from '@/entities/coffeeChat';
import type { Series } from '@/entities/post';
import { cn } from '@/lib/utils';
import { formatSeries } from '@/util/postFormatFunctions';

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

const seriesBadgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1.5 text-center text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-grey-50 text-grey-800',
        SEED: 'bg-grey-200 text-grey-900',
        PRE_A: 'bg-blue-100 text-blue-900',
        A: 'bg-blue-100 text-blue-900',
        B: 'bg-red-100 text-red-900',
        C: 'bg-green-100 text-green-900',
        D: 'bg-yellow-100 text-yellow-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface SeriesBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof seriesBadgeVariants> {}

function SeriesBadgeLayout({ className, variant, ...props }: SeriesBadgeProps) {
  return (
    <div
      className={cn(seriesBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}

const SeriesBadge = ({
  series,
  className,
}: {
  series: Series;
  className?: string;
}) => {
  return (
    <SeriesBadgeLayout className={className}>
      {formatSeries(series)}
    </SeriesBadgeLayout>
  );
};

const tagClassName = cva(
  'text inline-flex items-center rounded-sm border-transparent px-2 py-1.5 text-13 text-sm font-regular transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        pending: 'bg-yellow-light-hover text-yellow-darker',
        accepted: 'bg-green-light-hover text-green-darker',
        canceled: 'bg-red-light-hover text-grey-darker',
        rejected: 'bg-red-light-hover text-red-darker',
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

const BadgeCoffeeChat = ({
  className,
  coffeeChatStatus,
  ...props
}: TagProps) => {
  const { variant, label } = COFFEE_CHAT_STATUS_MAP[coffeeChatStatus];
  return (
    <div className={cn(tagClassName({ variant }), className)} {...props}>
      {label}
    </div>
  );
};

export { Badge, SeriesBadge, BadgeCoffeeChat };
