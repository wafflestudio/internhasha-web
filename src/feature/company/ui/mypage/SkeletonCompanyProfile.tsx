import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCompanyProfile = () => {
  return (
    <div className="flex flex-col gap-[30px] rounded-[8px] bg-white px-[30px] py-[36px] text-grey-900">
      <section>
        <div className="flex items-center gap-[18px]">
          <Skeleton className="rounded-xs h-[80px] w-[80px]" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-[39px] w-[200px]" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-md bg-grey-50 px-[34px] py-[20px]">
        <div className="flex h-[30px] items-center gap-5">
          <div className="flex flex-1 gap-[10px]">
            <p className="w-[70px] font-semibold text-grey-400">업종</p>
            <Skeleton className="h-[21px] w-[100px]" />
          </div>
          <div className="flex flex-1 gap-[10px]">
            <p className="w-[70px] font-semibold text-grey-400">구성 인원수</p>
            <Skeleton className="h-[21px] w-[100px]" />
          </div>
        </div>
        <div className="flex h-[30px] items-center gap-[10px]">
          <p className="w-[70px] font-semibold text-grey-400">설립</p>
          <Skeleton className="h-[21px] w-[100px]" />
        </div>
        <div className="flex h-[30px] items-center gap-[10px]">
          <p className="w-[70px] font-semibold text-grey-400">근무 위치</p>
          <Skeleton className="h-[21px] w-[100px]" />
        </div>
      </section>

      <section className="flex flex-col gap-[34px]">
        <div className="flex flex-col gap-3">
          <p className="text-16 font-bold text-grey-800">상세 소개</p>
          <Skeleton className="h-[105px] w-full" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-16 font-bold text-grey-800">vc 추천 이유</p>
          <Skeleton className="h-[105px] w-full" />
        </div>
      </section>
    </div>
  );
};
