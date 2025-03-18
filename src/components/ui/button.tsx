import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-14 font-regular transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-grey-800 text-white hover:bg-grey-900 disabled:bg-grey-300',
        destructive: 'bg-red text-white hover:bg-red-400 disabled:bg-red',
        outline:
          'diabled:text-grey-50 border border-grey-200 bg-white text-grey-900 shadow-sm hover:bg-grey-50',
        secondary:
          'bg-grey-100 text-grey-600 hover:bg-grey-200 disabled:bg-grey-50',
        ghost: 'text-grey-900 hover:bg-grey-200',
        link: 'text-primary underline-offset-4 hover:underline',
        selected:
          'disabled:text-bg-grey-50 border border-2 border-grey-300 bg-grey-100 text-grey-800 hover:bg-grey-200 disabled:text-grey-300',
      },
      size: {
        default: 'h-[42px] items-center px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
