import { Skeleton } from '@/components/ui/skeleton';
import { ICON_SRC } from '@/entities/asset';

export const SkeletonPostCard = () => {
  return (
    <div className="cursor-pointer rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* 직군 & 마감일 */}
      <div className="relative flex items-center justify-between rounded-t-lg bg-grey-200 p-3 pl-5 pr-5">
        <div className="flex items-center gap-2">
          <img src={ICON_SRC.PERSON} className="h-6 w-6" />
          <Skeleton className="h-5 w-[120px]" />
        </div>

        <Skeleton className="h-6 w-8" />
        {/* 삼각형 */}
        <div className="absolute bottom-[-10px] right-6 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-grey-200 text-lg"></div>
      </div>

      <section className="flex flex-col gap-4 px-[22px] py-[18px]">
        {/* 회사 정보 */}
        <div className="flex items-center gap-[14px]">
          {/* 회사 이미지 */}
          <div className="h-[40px] w-[40px] overflow-hidden rounded-lg bg-grey-200">
            <Skeleton className="h-full w-full" />
          </div>
          <div>
            <Skeleton className="h-8 w-[120px]" />
          </div>
        </div>

        <Skeleton className="h-[62px] w-full" />

        {/* 시리즈 및 투자 정보 */}
        <div className="mt-[30px] flex w-full justify-between py-1">
          <div className="flex items-center gap-2">
            {/* TODO: 삼항 연산자 variant로 정리 */}
            <Skeleton className="h-[30px] w-[64px]" />
            <Skeleton className="h-[30px] w-[64px]" />
            <Skeleton className="h-[30px] w-[64px]" />
          </div>
          <div>
            <img
              src={ICON_SRC.BOOKMARK.UNSELECTED}
              className="h-[30px] w-[30px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
