import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonApplicantInfo = () => {
  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white px-[24px] py-[48px] text-grey-900">
      <section className="flex gap-4">
        <Skeleton className="h-[80px] w-[80px] bg-grey-200" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-[45px] w-[110px]" />
          <Skeleton className="h-[21px] w-[150px]" />
        </div>
      </section>

      <section>
        <Skeleton className="h-[21px] w-[200px]" />
      </section>

      <div className="h-[1px] w-full bg-grey-200 md:max-w-[580px]"></div>

      <section className="flex flex-col gap-4">
        <h3 className="text-22 font-bold">기본 정보</h3>
        <Skeleton className="h-[21px] w-[150px]" />
        <Skeleton className="h-[26px] w-[130px]" />
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-22 font-bold">자기소개</h3>
        <div className="pag-4 flex">
          <Skeleton className="h-[147px] w-full" />
        </div>
      </section>

      <div className="h-[1px] w-full bg-grey-200 md:max-w-[580px]"></div>

      <section className="flex flex-col gap-4">
        <h3 className="text-22 font-bold">기타 정보</h3>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[28px] w-[100px]" />
          <Skeleton className="h-[28px] w-[100px]" />
          <Skeleton className="h-[28px] w-[100px]" />
        </div>
      </section>
    </div>
  );
};
