import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const tabsListClassName = cva('flex text-14 font-regular text-grey-900', {
  variants: {
    variant: {
      default: '',
      button: 'flex gap-[8px] rounded-[10px] bg-grey-50 p-[6px]',
    },
    size: {
      default: 'gap-1 xs:gap-8',
      small: 'gap-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const tabsTriggerClassName = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default:
        'text-18 font-semibold hover:text-grey-700 disabled:opacity-50 data-[state=active]:text-grey-900 data-[state=active]:underline data-[state=active]:decoration-grey-900 data-[state=active]:hover:text-grey-700',
      button:
        'h-[42px] flex-1 whitespace-nowrap rounded-[8px] text-14 font-semibold text-grey-300 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-grey-900',
    },
    size: {
      default:
        'data-[state=active]:decoration-2 data-[state=active]:underline-offset-8',
      small:
        'text-14 data-[state=active]:decoration-1 data-[state=active]:underline-offset-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListClassName> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, size, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListClassName({ size, variant, className }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerClassName> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerClassName({ size, variant, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
