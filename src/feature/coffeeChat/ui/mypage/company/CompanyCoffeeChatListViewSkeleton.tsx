import { Skeleton } from '@/components/ui/skeleton';
import { CoffeeChatInfo } from '@/feature/coffeeChat/ui/mypage/common/CoffeeChatInfo';

export const CompanyCoffeeChatListViewSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* 커피챗 설명 */}
      <CoffeeChatInfo />
      {/* 커피챗 리스트 */}
      <div className="flex w-full flex-col gap-3">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={`loading-${idx}`}
            className="flex h-[50px] cursor-pointer items-center justify-between rounded-md bg-white px-[24px]"
          >
            <Skeleton className="h-[18px] w-[350px]" />
            <Skeleton className="h-6 w-[80px]" />
          </div>
        ))}
      </div>
    </div>
  );
};
