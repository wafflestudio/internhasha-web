import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCompanyProfileForm = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">회사명</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">회사 업종</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">회사 설립년도</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">회사 규모</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">근무 위치</p>
        <Skeleton className="h-[42px] w-full" />
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">회사 한 줄 소개</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">회사 상세 소개</p>
        <Skeleton className="h-[200px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">대표 사진</p>
        <Skeleton className="h-[100px] w-[100px] rounded-[8px]" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">태그</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">회사 소개 자료</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">기업 소개 홈페이지</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">외부 소개 및 관련 기사 링크</p>
        <Skeleton className="h-[42px] w-full" />
        <Skeleton className="h-[42px] w-full" />
      </div>
    </div>
  );
};
