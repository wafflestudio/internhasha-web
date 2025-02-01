import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/button';
import { Card } from '@/components/card/card.tsx';
import { ICON_SRC } from '@/entities/asset.ts';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext.ts';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation.ts';
import { getEmploymentStatus } from '@/util/postFormatFunctions.ts';

export const BookmarkListView = () => {
  const { bookmarkListData } = useGetBookmarkList();
  const { toPost } = useRouteNavigation();

  if (bookmarkListData === undefined) {
    return <div>로딩중...</div>;
  }

  if (bookmarkListData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const { posts: bookmarkList } = bookmarkListData.data;

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
    <div>
      <div className="max-w-screen-lg">
        <div className="space-y-4 w-3/5">
          {bookmarkList.map((post) => (
            <Card key={post.id} className="">
              <Button
                onClick={() => {
                  toPost({ postId: post.id });
                }}
                className="flex justify-between w-full h-full p-5"
              >
                <img src={ICON_SRC.BOOKMARK.SELECTED} />
                <span>{post.title}</span>
                <div className="flex gap-8">
                  <span>{post.companyName}</span>
                  <span className="text-gray-400">
                    {formatEmploymentState({
                      isActive: post.isActive,
                      employmentEndDate: post.employmentEndDate,
                    })}
                  </span>
                </div>
              </Button>
            </Card>
          ))}
        </div>
      </div>
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
