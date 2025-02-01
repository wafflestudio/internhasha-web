import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonPostDetailView = () => {
  return (
    <div className="max-w-screen-md mx-auto gap-12 p-10 flex flex-col md:flex-row">
      <div className="flex flex-col gap-12 flex-1">
        {/* 헤더 */}
        <div className="flex flex-col justify-between items-start gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex justify-between w-full">
            <Skeleton className="h-8 w-40" />
            <div className="content-center">
              <Skeleton className="w-[30px] h-[30px] rounded-full" />
            </div>
          </div>
        </div>

        {/* 회사 소개 */}
        <div className="flex flex-col gap-10">
          <div className="border-none flex flex-col gap-5 p-4 rounded-lg">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>

          {/* 투자 정보 */}
          <div className="flex flex-col gap-4 space-y-4 py-6 px-4 sm:py-6 sm:px-8 rounded-lg bg-gray-100">
            <div className="flex flex-col gap-8 sm:gap-16 xs:flex-row">
              <div className="flex items-center flex-1">
                <Skeleton className="h-[20px] w-[80px]" />
                <Skeleton className="h-[30px] w-[100px] ml-4" />
              </div>
              <div className="flex items-center flex-1">
                <Skeleton className="h-[20px] w-[80px]" />
                <Skeleton className="h-[30px] w-[100px] ml-4" />
              </div>
            </div>

            {/* 투자사 */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-[20px] w-[80px]" />
              {[1, 2, 3].map((_, index) => (
                <Skeleton key={index} className="h-[30px] w-[100px]" />
              ))}
            </div>
          </div>

          {/* 회사 홈페이지 / IR Deck 자료 */}
          <section className="flex gap-4 xs:gap-10">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-5 items-center xs:flex-row"
              >
                <Skeleton className="h-[20px] w-[120px]" />
                <Skeleton
                  key={index}
                  className="flex items-center px-3 py-2 gap-1 rounded-lg bg-gray-200 h-[40px] w-[150px]"
                />
              </div>
            ))}
          </section>

          {/* 태그 */}
          <section>
            <Skeleton className="h-[20px] w-[80px]" />
            <div className="flex flex-wrap gap-2 mt-[10px]">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton
                  key={index}
                  className="bg-gray-200 h-[30px] w-[100px]"
                />
              ))}
            </div>
          </section>
        </div>

        {/* 상세 공고 글 */}
        <section className="flex flex-col gap-7">
          <Skeleton className="h-[30px] w-[200px]" />
          <Skeleton
            className="bg-gray-200 px-6 py-4 h-[150px]"
          />
        </section>
      </div>

      {/* 채용 정보 및 버튼 */}
      <div className="flex flex-col flex-[0.5] w-full gap-5 my-36 md:w-80">
        {/* 채용 마감일 */}
        <Skeleton className="h-[20px] w-full" />

        {/* 버튼 */}
        {[1, 2].map((_, index) => (
          <Skeleton
            key={index}
            className={`bg-gray-${index === 0 ? '600' : '200'} h-[50px]`}
          />
        ))}
      </div>
    </div>
  );
};
