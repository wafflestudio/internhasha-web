import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/button';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toEcho, toSignUpSelect, toSignInSelect } = useRouteNavigation();

  const { data: posts, isLoading, isError } = useGetPosts();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 가져오는 중 에러가 발생했습니다.</p>;
  if (posts === undefined) return <p>받아온 데이터에 이상이 생겼습니다.</p>;

  return (
    <div>
      <p>랜딩페이지</p>
      <Button onClick={toSignUpSelect}>회원가입 페이지로 이동</Button>
      <Button onClick={toSignInSelect}>로그인 페이지로 이동</Button>
      <Button onClick={toEcho}>에코 페이지로 이동</Button>

      {
        <div className="">
          {posts.map((post) => (
            <p key={post.id}>
              {post.companyName}
              <div>자세히 보기</div>
            </p>
          ))}
        </div>
      }
    </div>
  );
};

const useGetPosts = () => {
  const { postService } = useGuardContext(ServiceContext);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['postService', 'getPosts'],
    queryFn: async () => {
      const response = await postService.getPosts();
      if (response.type === 'success') {
        return response.data;
      }
      throw new Error('회사 정보를 가져오는데 실패했습니다.');
    },
  });

  return { data, isLoading, isError };
};
