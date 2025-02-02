import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import { ICON_SRC } from '@/entities/asset.ts';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext.ts';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation.ts';
import { getEmploymentStatus } from '@/util/postFormatFunctions';

export const BookmarkListView = () => {
  const { bookmarkListData } = useGetBookmarkList();
  const { toPost } = useRouteNavigation();

  if (bookmarkListData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  // const { posts: bookmarkList } = bookmarkListData.data;

  const formatEmploymentState = ({
    isActive,
    employmentEndDate,
  }: {
    isActive: boolean;
    employmentEndDate: string | null;
  }) => {
    if (!isActive) {
      return '모집 완료';
    }
    if (employmentEndDate === null) {
      return '상시 채용';
    }
    return getEmploymentStatus(employmentEndDate);
  };

  return (
    <div className="flex flex-col w-full gap-3">
      {bookmarkListData !== undefined ? (
        bookmarkListData.data.posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col xs:flex-row w-full items-start xs:item-center px-[24px] py-[10px] gap-4 justify-between cursor-pointer bg-white rounded-md duration-300 hover:shadow-md"
            onClick={() => {
              toPost({ postId: post.id });
            }}
          >
            <div className="flex flex-1 items-center gap-4">
              <img src={ICON_SRC.BOOKMARK.SELECTED} />
              <span className="text-grey-darker font-semibold truncate">
                {post.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-grey-dark-hover font-semibold text-left md:text-center truncate">
                {post.companyName}
              </span>
              <span className="w-[80px] py-1 bg-grey-darker text-center text-white text-sm rounded-md">
                {formatEmploymentState({
                  isActive: post.isActive,
                  employmentEndDate: post.employmentEndDate,
                })}
              </span>
            </div>
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={`loading-${idx}`}
              className="flex flex-col md:flex-row md:w-full items-start md:items-center px-[24px] py-[10px] gap-4 md:justify-between cursor-pointer bg-white rounded-md duration-300 hover:shadow-md"
            >
              <div className="flex items-center gap-[18px]">
                <Skeleton className="w-[30px] h-[30px]" />
                <Skeleton className="w-[350px] h-[18px]" />
              </div>
              <div className="flex flex-col md:flex-row items-end md:items-center w-full md:size-fit gap-2 md:gap-[30px]">
                <Skeleton className="w-full md:w-[150px] h-[14px]" />
                <Skeleton className="w-[62px] h-6" />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const useGetBookmarkList = () => {
  const { token } = useGuardContext(TokenContext);
  const { postService } = useGuardContext(ServiceContext);

  const { data: bookmarkListData } = useQuery({
    queryKey: ['post', 'getBookmarkList', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.getBookmarkList({ token: t });
    },
    enabled: token !== null,
  });

  return { bookmarkListData };
};
