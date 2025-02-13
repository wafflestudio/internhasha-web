import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import type { Series } from '@/entities/post';
import { cn } from '@/lib/utils';
import { formatSeries } from '@/util/postFormatFunctions';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-white text-grey-dark-active',
        secondary: 'bg-grey-light-hover text-grey-darker',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'border bg-white text-grey-darker',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

const seriesBadgeVariants = cva(
  'inline-flex items-center text-center rounded-md px-2 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
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

export { Badge, SeriesBadge };
