import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Check = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer flex h-5 w-[22px] items-center justify-center rounded-sm border border-grey-300 bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grey-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-white',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="h-[10px] w-[10px] rounded-[2px] bg-grey-900 transition-all data-[state=unchecked]:hidden" />
  </CheckboxPrimitive.Root>
));

Check.displayName = CheckboxPrimitive.Root.displayName;

export { Check };
