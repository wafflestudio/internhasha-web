import { SeperatorLine } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonProfileForm = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-[10px]">
        <h3 className="text-22 font-semibold">필수 작성 항목</h3>
        <p className="text-12 font-regular text-grey-600">
          아래 항목은 필수로 작성해주세요.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">학번</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">학과</p>
        <Skeleton className="h-[42px] w-full" />
      </div>

      <SeperatorLine />

      <div className="flex flex-col gap-[10px]">
        <h3 className="text-22 font-semibold">선택 작성 항목</h3>
        <p className="text-12 font-regular text-grey-600">
          아래 항목은 필수로 작성하지 않아도 괜찮지만, 작성해 주시면 채용
          담당자가 지원자의 강점을 이해하는 데 더욱 도움이 되어요.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">희망 직무</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">기술 스택</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">한 줄 소개</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">자기소개</p>
        <Skeleton className="h-[200px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">프로필 사진</p>
        <Skeleton className="h-[100px] w-[100px] rounded-[8px]" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">이력서 (CV)</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-grey-900">기타 소개 링크</p>
        <Skeleton className="h-[42px] w-full" />
      </div>
    </div>
  );
};
