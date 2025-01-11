import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/button';
import {
  FilterModal,
  type RoleCategory,
} from '@/pages/LandingPage/FilterModal.tsx';
import { Pagination } from '@/pages/LandingPage/Pagination.tsx';
import { useGetPosts } from '@/pages/LandingPage/useGetPosts.ts';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { PostCard } from '@/pages/LandingPage/PostCard.tsx';

export const LandingPage = () => {
  const { toEcho, toSignUpSelect, toSignInSelect, toPost } =
    useRouteNavigation();

  const [roles, setRoles] = useState<RoleCategory[] | undefined>(undefined);
  const [investment, setInvestment] = useState<number | undefined>(undefined);
  const [investor, setInvestor] = useState<string | undefined>(undefined);
  const [pathStatus, setPathStatus] = useState<0 | 1 | 2 | undefined>(
    undefined,
  );

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { data: postsData } = useGetPosts({
    page: currentPage,
    roles: roles,
    investment: investment,
    investor: investor,
    pathStatus: pathStatus,
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
      <Button onClick={toSignUpSelect}>회원가입 페이지로 이동</Button>
      <Button onClick={toSignInSelect}>로그인 페이지로 이동</Button>
      <Button onClick={toEcho}>에코 페이지로 이동</Button>
      <Button onClick={hanldeClickLogoutButton} disabled={isPending}>
        로그아웃
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
          roles={roles}
          setRoles={setRoles}
          investment={investment}
          setInvestment={setInvestment}
          investor={investor}
          setInvestor={setInvestor}
          pathStatus={pathStatus}
          setPathStatus={setPathStatus}
          onClose={() => {
            setIsFilterModalOpen(false);
          }}
          onApply={() => {
            // 필터 적용 시 페이지/그룹 초기화
            setCurrentPage(0);
            setCurrentGroup(0);
            setIsFilterModalOpen(false);
          }}
        />
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {postsData.posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDetailClick={(postId) => { toPost({ postId }); }}
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
