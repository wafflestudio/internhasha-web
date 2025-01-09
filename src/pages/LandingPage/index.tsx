import { useMutation, useQuery } from '@tanstack/react-query';

import { Button } from '@/components/button';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toEcho, toSignUpSelect, toSignInSelect, toPost } =
    useRouteNavigation();

  const { data: posts } = useGetPosts();
  const { logout, isPending } = useLogout();

  const hanldeClickLogoutButton = () => {
    logout();
  };

  if (posts === undefined) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <p>랜딩페이지</p>
      <Button onClick={toSignUpSelect}>회원가입 페이지로 이동</Button>
      <Button onClick={toSignInSelect}>로그인 페이지로 이동</Button>
      <Button onClick={toEcho}>에코 페이지로 이동</Button>
      <Button onClick={hanldeClickLogoutButton} disabled={isPending}>
        로그아웃
      </Button>

      {
        <div className="">
          {posts.map((post) => (
            <p key={post.id}>
              {post.id}: {post.companyName}
              <Button
                onClick={() => {
                  toPost({ postId: post.id });
                }}
              >
                자세히 보기
              </Button>
            </p>
          ))}
        </div>
      }
    </div>
  );
};

const useGetPosts = () => {
  const { postService } = useGuardContext(ServiceContext);

  const { data } = useQuery({
    queryKey: ['postService', 'getPosts'],
    queryFn: async () => {
      const response = await postService.getPosts();
      if (response.type === 'success') {
        return response.data;
      }
      throw new Error('회사 정보를 가져오는데 실패했습니다.');
    },
  });

  return { data };
};

const useLogout = () => {
  const { authService } = useGuardContext(ServiceContext);

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => {
      return authService.logout();
    },
  });

  return { logout, isPending };
};
