import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/button';
import type { FilterElements, JobMinorCategory } from '@/entities/post';
import { FilterSection } from '@/pages/LandingPage/FilterSection';
import { Pagination } from '@/pages/LandingPage/Pagination';
import { PostCard } from '@/pages/LandingPage/PostCard';
import { RolesFilter } from '@/pages/LandingPage/RolesFilter.tsx';
import { useGetPosts } from '@/pages/LandingPage/useGetPosts';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toEcho, toSignUpSelect, toSignInSelect, toPost, toCoffeeChatList } =
    useRouteNavigation();

  const [filterElements, setFilterElements] = useState<FilterElements>({
    roles: undefined,
    investmentMax: undefined,
    investmentMin: undefined,
    pathStatus: undefined,
  });

  const handleRolesChange = (updatedRoles: JobMinorCategory[]) => {
    setFilterElements((prev) => ({ ...prev, roles: updatedRoles }));
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { data: postsData } = useGetPosts({
    page: currentPage,
    ...filterElements,
  });

  const { logout, isPending } = useLogout();
  const { token } = useGuardContext(TokenContext);

  const handleClickLogoutButton = () => {
    logout();
  };

  if (postsData === undefined) {
    return <p>로딩 중...</p>;
  }

  const TOTAL_PAGES = postsData.paginator.lastPage;
  const PAGES_PER_GROUP = 5;

  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        {/* 헤더 */}
        <header className="bg-white shadow-md">
          <div className="container px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">랜딩페이지</h1>
            <div className="flex gap-4">
              {token == null ? (
                <>
                  <Button onClick={toEcho} className="text-blue-600">
                    에코 페이지
                  </Button>
                  <Button onClick={toSignUpSelect} className="text-blue-600">
                    회원가입
                  </Button>
                  <Button onClick={toSignInSelect} className="text-blue-600">
                    로그인
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleClickLogoutButton}
                    disabled={isPending}
                    className="text-red-600"
                  >
                    로그아웃
                  </Button>
                  <Button
                    onClick={toCoffeeChatList}
                    disabled={isPending}
                    className="text-blue-600"
                  >
                    커피챗 목록
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="container mx-auto py-6 flex gap-2">
          {/* 좌측 Roles 필터 */}
          <RolesFilter roles={filterElements.roles} onChangeRoles={handleRolesChange} />

          {/* 우측 게시글 리스트 및 상단 필터 */}
          <div className="flex-1">
            {/* 상단 필터 섹션 */}
            <div className="flex justify-between items-center mb-2 pl-2">
              <FilterSection
                filterElements={filterElements}
                onChangeFilters={setFilterElements}
              />
            </div>

            {/* 게시글 리스트 */}
            <main>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pr-2">
                {postsData.posts.map((post, idx) => (
                  <PostCard
                    key={`post-${idx}`}
                    post={post}
                    onDetailClick={(postId) => { toPost({ postId }); }}
                  />
                ))}
              </div>
            </main>

            {/* 페이지네이션 */}
            <footer className="mt-6 flex justify-center">
              <Pagination
                totalPages={TOTAL_PAGES}
                pagesPerGroup={PAGES_PER_GROUP}
                currentPage={currentPage}
                currentGroup={currentGroup}
                onChangePage={(page) => { setCurrentPage(page); }}
                onChangeGroup={(group) => { setCurrentGroup(group); }}
              />
            </footer>
          </div>
        </div>
      </div>
    </div>
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
