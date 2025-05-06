import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { CancelButton } from '@/components/button/CancelButton';
import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import { CoffeeChatNumberBadge } from '@/feature/coffeeChat';
import { cn } from '@/lib/utils';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const GlobalNavigationBar = () => {
  const { token } = useGuardContext(TokenContext);
  const { logout, isPending } = useLogout();
  const { toSignUp, toSignInSelect, toMyPage, toMain } = useRouteNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClickLogoutButton = () => {
    logout();
    toMain({});
  };

  return (
    <header className="sticky top-0 z-50 flex justify-center bg-grey-50 shadow-md">
      <div className="flex w-full items-center justify-between px-6 py-4 sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1
          onClick={() => {
            toMain({});
          }}
          className="hover:text-blue-normal cursor-pointer text-xl font-bold text-gray-800 transition-colors duration-150"
        >
          <div className="flex gap-2">
            <img src={ICON_SRC.GNB.LETTER} />
          </div>
        </h1>

        <div className="hidden items-center gap-5 xs:flex">
          {/* TODO: 검색기능*/}
          {/* <Button variant="ghost">
            <img src={ICON_SRC.GNB.SEARCH} />
          </Button> */}
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
              <Button
                onClick={() => {
                  toMyPage({});
                }}
                disabled={isPending}
                variant="ghost"
              >
                마이페이지
                <CoffeeChatNumberBadge
                  onClick={(e) => {
                    e.stopPropagation();
                    toMyPage({ query: { tab: 'COFFEE_CHAT' } });
                  }}
                />
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
        <div className="flex xs:hidden">
          <Button
            variant="ghost"
            onClick={() => {
              setMenuOpen((prev) => !prev);
            }}
          >
            <img src={ICON_SRC.GNB.HAMBURGER} />
          </Button>
          {menuOpen && (
            <div
              className="fixed inset-0 z-40 bg-grey-400 bg-opacity-30 xs:hidden"
              onClick={() => {
                setMenuOpen(false);
              }}
            />
          )}

          <div
            className={cn(
              'fixed right-0 top-0 z-50 h-full transform bg-grey-50 shadow-xl transition-transform duration-300 ease-in-out xs:hidden',
              menuOpen ? 'translate-x-0' : 'translate-x-full',
            )}
          >
            <div className="flex justify-start px-2 py-4">
              <CancelButton
                onClick={() => {
                  setMenuOpen(false);
                }}
                className=""
              />
            </div>
            <div className="flex flex-col space-y-6 px-6">
              {token == null ? (
                <>
                  <Button
                    onClick={() => {
                      toSignUp({});
                    }}
                    variant="ghost"
                    className="flex items-center justify-between"
                  >
                    회원가입
                  </Button>
                  <Button
                    onClick={toSignInSelect}
                    variant="ghost"
                    className="flex items-center justify-between"
                  >
                    로그인
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      toMyPage({});
                    }}
                    disabled={isPending}
                    variant="ghost"
                    className="flex justify-between"
                  >
                    마이페이지
                    <CoffeeChatNumberBadge
                      onClick={(e) => {
                        e.stopPropagation();
                        toMyPage({ query: { tab: 'COFFEE_CHAT' } });
                      }}
                    />
                  </Button>
                  <Button
                    onClick={handleClickLogoutButton}
                    disabled={isPending}
                    variant="ghost"
                    className="flex items-center justify-between"
                  >
                    로그아웃
                  </Button>
                </>
              )}
            </div>
          </div>
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
