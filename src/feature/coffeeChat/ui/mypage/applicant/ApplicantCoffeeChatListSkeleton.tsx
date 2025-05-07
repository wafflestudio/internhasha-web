import { Skeleton } from '@/components/ui/skeleton';

export const ApplicantCoffeeChatListSkeleton = () => {
  return Array.from({ length: 4 }).map((_, idx) => (
    <div
      key={`loading-${idx}`}
      className="flex h-[50px] cursor-pointer items-center justify-between rounded-md bg-white px-[24px]"
    >
      <Skeleton className="h-[18px] w-[350px]" />
      <Skeleton className="h-6 w-[80px]" />
    </div>
  ));
};
