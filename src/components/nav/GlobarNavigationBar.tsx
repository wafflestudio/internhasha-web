import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const GlobalNavigationBar = () => {
  const { token } = useGuardContext(TokenContext);
  const { logout, isPending } = useLogout();
  const { toSignUp, toSignInSelect, toMyPage, toMain } = useRouteNavigation();
  const handleClickLogoutButton = () => {
    logout();
    toMain();
  };

  return (
    <header className="sticky top-0 z-50 flex justify-center bg-grey-50 shadow-md">
      <div className="flex w-full items-center justify-between px-6 py-4 sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1
          onClick={toMain}
          className="hover:text-blue-normal cursor-pointer text-xl font-bold text-gray-800 transition-colors duration-150"
        >
          인턴하샤
        </h1>
        <div className="flex gap-5">
          {token == null ? (
            <>
              <Button
                onClick={() => {
                  toSignUp({});
                }}
                variant="ghost"
              >
                회원가입
              </Button>
              <Button onClick={toSignInSelect} variant="ghost">
                로그인
              </Button>
            </>
          ) : (
            <>
              <Button onClick={toMyPage} disabled={isPending} variant="ghost">
                마이페이지
              </Button>
              <Button
                onClick={handleClickLogoutButton}
                disabled={isPending}
                variant="ghost"
              >
                로그아웃
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const useLogout = () => {
  const { authService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { refreshPage } = useRouteNavigation();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return authService.logout({ token });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
        refreshPage();
      }
    },
  });

  return { logout, isPending };
};
