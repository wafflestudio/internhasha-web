import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      formatters={{
        formatWeekdayName: (day) =>
          day?.toLocaleDateString('en-US', { weekday: 'short' }),
        formatCaption: (month) =>
          month?.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
          }),
      }}
      showOutsideDays={showOutsideDays}
      className={cn(
        'inline-flex w-[340px] justify-center p-[22px] rounded-md shadow-md',
        className,
      )}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex w-full px-2 pt-1 relative items-center',
        caption_label: 'text-lg text-grey-dark-active font-semibold ',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-10 w-10 bg-transparent p-0 hover:opacity-100',
        ),
        nav_button_previous: 'absolute right-10',
        nav_button_next: 'absolute right-2',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex justify-center',
        head_cell: 'text-grey-normal rounded-md w-10 font-normal text-xs',
        row: 'flex justify-center w-full mt-4',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full'
            : '[&:has([aria-selected])]:rounded-full',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'rounded-full h-9 w-10 p-0 font-normal text-black aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-blue-light text-blue-normal font-semibold hover:bg-blue-light-active hover:text-blue-normal-active focus:bg-blue-light focus:text-blue-normal',
        day_today: 'text-blue-normal font-semibold',
        day_outside:
          'day-outside text-grey-normal aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-grey-light-active opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('h-10 w-10', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('h-10 w-10', className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
