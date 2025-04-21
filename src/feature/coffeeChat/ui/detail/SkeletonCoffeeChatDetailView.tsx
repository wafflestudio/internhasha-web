import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCoffeeChatDetailView = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-[700px] px-6 py-[30px]">
      <div className="flex w-full flex-col gap-[28px] rounded-lg bg-white px-[40px] py-[46px] text-grey-900">
        <div className="flex items-center justify-between">
          <h1 className="text-30 font-bold">커피챗 신청서</h1>
          <div className="flex items-center gap-2">
            <Skeleton className="h-[21px] w-[70px]" />
            <Skeleton className="h-[32px] w-[40px]" />
          </div>
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-[80px] w-[80px]" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-[39px] w-[80px]" />
              <Skeleton className="h-[21px] w-[151px]" />
            </div>
            <Skeleton className="h-[21px] w-[150px]" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[20px]">
          <h3 className="text-22 font-bold">커피챗 신청 내용</h3>
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};
