import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  variant?: 'default' | 'small';
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  variant = 'default',
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
        'inline-flex justify-center rounded-md shadow-md',
        variant === 'small' ? 'w-full p-2' : 'w-[340px] p-[22px]',
        className,
      )}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex w-full px-2 pt-1 relative items-center',
        caption_label: 'text-lg text-grey-900 font-semibold ',
        nav: 'flex gap-4 items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-10 w-10 bg-transparent p-0 hover:opacity-100',
        ),
        nav_button_previous: 'absolute right-14',
        nav_button_next: 'absolute right-2',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex justify-center',
        head_cell: cn(
          'text-grey-300 rounded-md font-normal text-xs',
          variant === 'small' ? 'w-full text-xs' : 'w-10',
        ),
        row: cn(
          'flex justify-center w-full',
          variant === 'small' ? 'mt-1' : 'mt-4',
        ),
        cell: cn(
          'relative p-0 text-grey-900 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-50 [&:has([aria-selected].day-outside)]:bg-grey-300 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full'
            : '[&:has([aria-selected])]:rounded-full',
        ),
        day: cn(
          'rounded-full p-0 font-normal hover:bg-blue-50',
          variant === 'small' ? 'h-8 w-8 text-xs' : 'h-9 w-10',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-blue-50 text-blue-300 font-semibold hover:bg-blue-100 focus:bg-blue-50',
        day_today: 'text-blue-300 font-semibold',
        day_outside: 'day-outside text-grey-300',
        day_disabled: 'text-grey-200 opacity-50',
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
