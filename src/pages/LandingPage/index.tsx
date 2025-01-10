import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/button';
import type { Filters } from '@/entities/post.ts';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toEcho, toSignUpSelect, toSignInSelect, toPost } =
    useRouteNavigation();

  const [filters, setFilters] = useState<Filters>({
    roles: undefined,
    investment: undefined,
    investor: undefined,
    pathStatus: undefined,
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { data: postsData } = useGetPosts({
    page: currentPage,
    roles: filters.roles,
    investment: filters.investment,
    investor: filters.investor,
    pathStatus: filters.pathStatus,
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

  const startPage = currentGroup * PAGES_PER_GROUP;
  const endPage = Math.min(startPage + PAGES_PER_GROUP, TOTAL_PAGES);

  const pageNumbers = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i,
  );

  return (
    <div>
      <p>랜딩페이지</p>
      <Button onClick={toSignUpSelect}>회원가입 페이지로 이동</Button>
      <Button onClick={toSignInSelect}>로그인 페이지로 이동</Button>
      <Button onClick={toEcho}>에코 페이지로 이동</Button>
      <Button onClick={hanldeClickLogoutButton} disabled={isPending}>
        로그아웃
      </Button>

      <Button onClick={() => { setIsFilterModalOpen(true); }}>필터링</Button>
      {/* 필터 모달 */}
      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          onClose={() => { setIsFilterModalOpen(false); }}
          onApply={(newFilters: Filters) => {
            setFilters(newFilters);
            setCurrentPage(0); // 필터 적용 시 첫 페이지로 이동
            setCurrentGroup(0); // 첫 그룹으로 이동
            setIsFilterModalOpen(false);
          }}
        />
      )}

      {
        <div className="">
          {postsData.posts.map((post) => (
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

      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <Button
          onClick={() => {
            setCurrentGroup((prev) => Math.max(prev - 1, 0));
          }}
          disabled={currentGroup === 0}
        >
          이전
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => {
              setCurrentPage(page);
            }}
            style={{
              margin: '0 5px',
              fontWeight: currentPage === page ? 'bold' : 'normal',
            }}
          >
            {page + 1} {/* 사용자에게는 1-based index로 표시 */}
          </Button>
        ))}

        <Button
          onClick={() => {
            setCurrentGroup((prev) =>
              startPage + PAGES_PER_GROUP >= TOTAL_PAGES ? prev : prev + 1,
            );
          }}
          disabled={startPage + PAGES_PER_GROUP >= TOTAL_PAGES}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

const useGetPosts = ({
  page = 0,
  roles,
  investment,
  investor,
  pathStatus,
}: {
  page?: number;
  roles?: string[];
  investment?: number;
  investor?: string;
  pathStatus?: number;
}) => {
  const { postService } = useGuardContext(ServiceContext);

  const { data } = useQuery({
    queryKey: [
      'postService',
      'getPosts',
      page,
      roles,
      investment,
      investor,
      pathStatus,
    ],
    queryFn: async () => {
      const response = await postService.getPosts({
        page,
        roles,
        investment,
        investor,
        pathStatus,
      });
      if (response.type === 'success') {
        return response.data;
      }
      throw new Error('회사 정보를 가져오는데 실패했습니다.');
    },
  });

  return { data: data };
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

const FilterModal = ({
  filters,
  onClose,
  onApply,
}: {
  filters: Filters;
  onClose: () => void;
  onApply: (localFilters: Filters) => void;
}) => {
  
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="modal">
      <h2>필터링 설정</h2>

      {/* Roles */}
      <label>
        직무 종류 (roles):
        <input
          type="text"
          value={localFilters.roles}
          onChange={(e) => {
            handleInputChange('roles', e.target.value.split(','));
          }}
        />
      </label>

      {/* Investment */}
      <label>
        투자 금액 (investment):
        <input
          type="number"
          value={localFilters.investment}
          onChange={(e) => {
            handleInputChange('investment', parseInt(e.target.value, 10));
          }}
        />
      </label>

      {/* Investor */}
      <label>
        투자사 (investor):
        <input
          type="text"
          value={localFilters.investor}
          onChange={(e) => {
            handleInputChange('investor', e.target.value);
          }}
        />
      </label>

      {/* Path Status */}
      <label>
        진행 상태 (pathStatus):
        <select
          value={localFilters.pathStatus}
          onChange={(e) =>
            { handleInputChange('pathStatus', parseInt(e.target.value, 10)); }
          }
        >
          <option value="">전체</option>
          <option value="0">진행중</option>
          <option value="1">진행 완료</option>
          <option value="2">전부</option>
        </select>
      </label>

      {/* Buttons */}
      <div className="modal-buttons">
        <Button onClick={onClose}>취소</Button>
        <Button onClick={() => { onApply(localFilters); }}>적용</Button>
      </div>
    </div>
  );
};