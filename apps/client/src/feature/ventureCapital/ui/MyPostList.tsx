import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const MyPostList = () => {
  const { toPost } = useRouteNavigation();
  const { postsData } = useGetPosts();

  if (postsData === undefined) {
    return (
      <div className="grid w-full gap-x-4 gap-y-3 grid-cols-1 md:grid-cols-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={`loading-${index}`}>
            <span></span>
            <Button>공고 작성</Button>
          </div>
        ))}
      </div>
    );
  }

  if (postsData.type === 'error') {
    return (
      <div>데이터를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해주세요.</div>
    );
  }

  const posts = postsData.data;

  return (
    <div>
      {posts.map((item, idx) => (
        <div key={`post-list-${idx}`}>
          <div>
            <span>{item.title}</span>
          </div>
          <div>{item.companyName}</div>
          <span>{item.companyName}</span>
          <Button
            onClick={() => {
              toPost({ postId: item.id });
            }}
          >
            공고 작성
          </Button>
        </div>
      ))}
    </div>
  );
};

export const useGetPosts = () => {
  const { ventureCapitalService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { data: postsData } = useQuery({
    queryKey: ['postService', 'getMyCompany'],
    queryFn: async () => {
      if (token === null) {
        throw new Error('토큰이 존재하자 않습니다.');
      }
      return ventureCapitalService.getMyCompany({
        token,
      });
    },
  });

  return { postsData };
};
