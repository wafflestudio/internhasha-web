import { Skeleton } from '@/components/ui/skeleton';
import { ICON_SRC } from '@/entities/asset';

export const SkeletonPostCard = () => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md cursor-pointer transition-shadow">
      {/* 직군 & 마감일 */}
      <div className="flex relative justify-between items-center rounded-t-lg pl-5 pr-5 p-3 bg-gray-200">
        <div className="flex items-center gap-2">
          <img src={ICON_SRC.PERSON} className="w-6 h-6" />
          <Skeleton className="h-5 w-[120px]" />
        </div>

        <Skeleton className="h-6 w-8" />
        {/* 삼각형 */}
        <div
          className="absolute text-lg bottom-[-8px] right-6
                  w-0 h-0 border-l-[10px] border-l-transparent
                  border-r-[10px] border-r-transparent
                  border-t-[10px] border-t-gray-200"
        ></div>
      </div>

      <section className="flex flex-col gap-4 px-[22px] py-[18px]">
        {/* 회사 정보 */}
        <div className="flex items-center gap-[14px]">
          {/* 회사 이미지 */}
          <div className="w-[40px] h-[40px] rounded-lg bg-gray-100 overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          <div>
            <Skeleton className="h-8 w-[120px]" />
          </div>
        </div>

        <Skeleton className="w-full h-[62px]" />

        {/* 시리즈 및 투자 정보 */}
        <div className="flex w-full justify-between py-1 mt-[30px]">
          <div className="flex items-center gap-2">
            {/* TODO: 삼항 연산자 variant로 정리 */}
            <Skeleton className="w-[64px] h-[30px]" />
            <Skeleton className="w-[64px] h-[30px]" />
            <Skeleton className="w-[64px] h-[30px]" />
          </div>
          <div>
            <img
              src={ICON_SRC.BOOKMARK.UNSELECTED}
              className="w-[30px] h-[30px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
