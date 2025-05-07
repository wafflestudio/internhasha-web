import { Skeleton } from '@/components/ui/skeleton';

export const BookmarkListSkeleteon = () => {
  return Array.from({ length: 12 }).map((_, idx) => (
    <div
      key={`loading-${idx}`}
      className="flex cursor-pointer flex-col items-start gap-4 rounded-md bg-white px-[24px] py-[10px] duration-300 hover:shadow-md md:w-full md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-center gap-[18px]">
        <Skeleton className="h-[30px] w-[30px]" />
        <Skeleton className="h-[18px] w-[350px]" />
      </div>
      <div className="flex w-full flex-col items-end gap-2 md:size-fit md:flex-row md:items-center md:gap-[30px]">
        <Skeleton className="h-[14px] w-full md:w-[150px]" />
        <Skeleton className="h-6 w-[62px]" />
      </div>
    </div>
  ));
};
