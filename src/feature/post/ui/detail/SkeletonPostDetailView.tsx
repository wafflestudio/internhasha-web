import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonPostDetailView = () => {
  return (
    <div className="mx-auto flex max-w-screen-md flex-col gap-12 p-10 md:flex-row">
      <div className="flex flex-1 flex-col gap-5">
        {/* 헤더 */}
        <div className="flex flex-col items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-grey-200 object-cover" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="flex w-full justify-between">
            <Skeleton className="h-12 w-60" />
            <Skeleton className="h-[30px] w-[30px]" />
          </div>
        </div>

        {/* 회사 소개 */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 rounded-lg border-none p-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-full" />
          </div>

          {/* 투자 정보 */}
          <div className="flex flex-col gap-4 space-y-4 rounded-lg bg-grey-50 px-4 py-6 sm:px-8 sm:py-6">
            <div className="flex flex-col gap-8 xs:flex-row sm:gap-16">
              <div className="flex flex-1 items-center gap-4">
                <Skeleton className="h-[20px] w-[80px]" />
                <Skeleton className="h-[30px] w-[120px]" />
              </div>
              <div className="flex flex-1 items-center gap-4">
                <Skeleton className="h-[20px] w-[80px]" />
                <Skeleton className="h-[30px] w-[120px]" />
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
          {/* 회사 홈페이지 / 회사소개 자료 */}
          <section className="flex gap-4 xs:gap-10">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-5 xs:flex-row"
              >
                <Skeleton className="h-[20px] w-[80px]" />
                <Skeleton
                  key={index}
                  className="flex h-[40px] w-[80px] items-center gap-1 rounded-lg bg-grey-200 px-3 py-2"
                />
              </div>
            ))}
          </section>

          {/* 태그 */}
          <section>
            <Skeleton className="h-[20px] w-[80px]" />
            <div className="mt-[10px] flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton key={index} className="h-[30px] w-[100px]" />
              ))}
            </div>
          </section>
        </div>

        {/* 상세 공고 글 */}
        <section className="flex flex-col gap-7">
          <Skeleton className="h-[30px] w-[200px]" />
          <Skeleton className="h-[150px] px-6 py-4" />
        </section>
      </div>

      {/* 채용 정보 및 버튼 */}
      <div className="my-36 flex w-full flex-1 flex-col gap-5">
        {/* 채용 마감일 */}
        <Skeleton className="h-[20px] w-full" />

        {/* 버튼 */}
        {[1, 2].map((_, index) => (
          <Skeleton
            key={index}
            className={
              index === 0 ? 'h-[50px] bg-grey-800' : 'h-[50px] bg-grey-200'
            }
          />
        ))}
      </div>
    </div>
  );
};
