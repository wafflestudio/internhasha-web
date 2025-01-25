import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const GlobalNavigationBar = () => {
  const { token } = useGuardContext(TokenContext);
  const { logout, isPending } = useLogout();
  const { toSignUpSelect, toSignInSelect, toMyPage } = useRouteNavigation();
  const handleClickLogoutButton = () => {
    logout();
  };

  return (
    <header className="flex justify-center sticky top-0 z-50 bg-white shadow-md">
      <div className="flex w-full sm:w-screen-sm md:w-screen-md lg:w-scrren-lg xl:w-screen-xl px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">인턴하샤</h1>
        <div className="flex gap-5">
          {token == null ? (
            <>
              <Button onClick={toSignUpSelect} variant="ghost">
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
