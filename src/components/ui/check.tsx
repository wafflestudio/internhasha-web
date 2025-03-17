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
      'peer w-[22px] h-5 flex items-center justify-center rounded-sm border border-grey-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 bg-white data-[state=checked]:bg-white',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="w-[10px] h-[10px] bg-grey-darker rounded-[2px] data-[state=unchecked]:hidden transition-all" />
  </CheckboxPrimitive.Root>
));

Check.displayName = CheckboxPrimitive.Root.displayName;

export { Check };
