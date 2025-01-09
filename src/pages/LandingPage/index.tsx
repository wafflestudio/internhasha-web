import { useMutation, useQuery } from '@tanstack/react-query';

import { Button } from '@/components/button';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toEcho, toSignUpSelect, toSignInSelect } = useRouteNavigation();

  const { data: PostsData, isLoading, isError } = useGetPosts();
  const { logout, isPending } = useLogout();

  const hanldeClickLogoutButton = () => {
    logout();
  };

  return (
    <div>
      <p>랜딩페이지</p>
      <Button onClick={toSignUpSelect}>회원가입 페이지로 이동</Button>
      <Button onClick={toSignInSelect}>로그인 페이지로 이동</Button>
      <Button onClick={toEcho}>에코 페이지로 이동</Button>
      <Button onClick={hanldeClickLogoutButton} disabled={isPending}>
        로그아웃
      </Button>

      {!isLoading && !isError && PostsData != null && (
        <ul>
          {PostsData.map((company) => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
      )}
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

const useLogout = () => {
  const { authService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return authService.logout({ token });
    },
  });

  return { logout, isPending };
};
