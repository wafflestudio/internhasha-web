import { cn } from '@/lib/utils';

export const SeperatorLine = ({ className }: { className?: string }) => {
  return <div className={cn('h-[1px] w-full bg-grey-200', className)}></div>;
};
