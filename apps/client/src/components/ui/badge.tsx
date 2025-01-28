import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

const seriesBadgeVariants = cva(
  'inline-flex items-center text-center rounded-md px-1.5 py-1 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-grey-light-hover text-grey-dark-active',
        SEED: 'bg-grey-light-active text-grey-darker',
        PRE_A: 'bg-blue-light-hover text-blue-darker',
        A: 'bg-blue-light-hover text-blue-darker',
        B: 'bg-red-light-hover text-red-darker',
        C: 'bg-green-light-hover text-green-darker',
        D: 'bg-yellow-light-hover text-yellow-darker',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface SeriesBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof seriesBadgeVariants> {}

function SeriesBadge({ className, variant, ...props }: SeriesBadgeProps) {
  return (
    <div
      className={cn(seriesBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, SeriesBadge, badgeVariants };
