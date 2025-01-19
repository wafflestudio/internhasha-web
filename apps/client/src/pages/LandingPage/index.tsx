import { useMutation } from '@tanstack/react-query';
import { Button as DesignedButton } from '@waffle/design-system';
import { useState } from 'react';

import { Button } from '@/components/button';
import type { FilterElements } from '@/entities/post.ts';
import { FilterModal } from '@/pages/LandingPage/FilterModal.tsx';
import { Pagination } from '@/pages/LandingPage/Pagination.tsx';
import { PostCard } from '@/pages/LandingPage/PostCard.tsx';
import { useGetPosts } from '@/pages/LandingPage/useGetPosts.ts';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { data: postsData } = useGetPosts({
    page: currentPage,
    ...filterElements,
  });

  const { logout, isPending } = useLogout();

  const hanldeClickLogoutButton = () => {
    logout();
  };

  if (postsData === undefined) {
    return <p>로딩 중...</p>;
  }

  const TOTAL_PAGES = postsData.paginator.lastPage;
  const PAGES_PER_GROUP = 5;

  return (
    <div>
      <p>랜딩페이지</p>
      <DesignedButton>와플의 버튼</DesignedButton>
      <Button onClick={toSignUpSelect}>회원가입 페이지로 이동</Button>
      <Button onClick={toSignInSelect}>로그인 페이지로 이동</Button>
      <Button onClick={toEcho}>에코 페이지로 이동</Button>
      <Button onClick={hanldeClickLogoutButton} disabled={isPending}>
        로그아웃
      </Button>
      <Button onClick={toCoffeeChatList} disabled={isPending}>
        커피챗 목록
      </Button>

      <Button
        onClick={() => {
          setIsFilterModalOpen(true);
        }}
      >
        필터링
      </Button>
      {isFilterModalOpen && (
        <FilterModal
          filterElements={filterElements}
          onChangeFilters={setFilterElements}
          onClose={() => {
            setIsFilterModalOpen(false);
          }}
          onApply={() => {
            setCurrentPage(0);
            setCurrentGroup(0);
            setIsFilterModalOpen(false);
          }}
        />
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
          padding: '20px',
        }}
      >
        {postsData.posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDetailClick={(postId) => {
              toPost({ postId });
            }}
          />
        ))}
      </div>

      <Pagination
        totalPages={TOTAL_PAGES}
        pagesPerGroup={PAGES_PER_GROUP}
        currentPage={currentPage}
        currentGroup={currentGroup}
        onChangePage={(page) => {
          setCurrentPage(page);
        }}
        onChangeGroup={(group) => {
          setCurrentGroup(group);
        }}
      />
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
