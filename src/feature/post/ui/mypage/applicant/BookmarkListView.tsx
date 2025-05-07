import { useQuery } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge';
import { ICON_SRC } from '@/entities/asset';
import { formatEmploymentState } from '@/feature/post/presentation/postFormatPresentation';
import { BookmarkListSkeleteon } from '@/feature/post/ui/mypage/applicant/BookmarkListSkeleton';
import { NoBookMarkedPosts } from '@/feature/post/ui/mypage/applicant/NoBookmarkedPosts';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const BookmarkListView = () => {
  const { bookmarkListData } = useGetBookmarkList();
  const { toPost } = useRouteNavigation();

  if (bookmarkListData === undefined) {
    return (
      <div className="flex w-full flex-col gap-3 text-grey-900">
        <BookmarkListSkeleteon />
      </div>
    );
  }

  if (bookmarkListData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  if (bookmarkListData.data.posts.length === 0) {
    return <NoBookMarkedPosts />;
  }

  return (
    <div className="flex w-full flex-col gap-3 text-grey-900">
      {bookmarkListData.data.posts.map((post) => (
        <div
          key={post.id}
          className="xs:item-center flex w-full cursor-pointer flex-col items-start justify-between gap-4 rounded-md bg-white px-[24px] py-[10px] duration-300 hover:shadow-md xs:flex-row"
          onClick={() => {
            toPost({ postId: post.id });
          }}
        >
          <div className="flex flex-1 items-center gap-4">
            <img src={ICON_SRC.BOOKMARK.SELECTED} />
            <span className="truncate font-semibold">{post.positionTitle}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="truncate text-left font-semibold text-grey-700 md:text-center">
              {post.companyName}
            </span>
            <Badge variant="primary">
              {formatEmploymentState({
                date: post.employmentEndDate,
              })}
            </Badge>
          </div>
        </div>
      ))}
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
