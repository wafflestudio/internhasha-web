import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/button';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toEcho, toSignUpSelect, toSignInSelect, toPost } =
    useRouteNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { data: postsData } = useGetPosts({
    page: currentPage,
    roles: undefined,
    investment: undefined,
    investor: undefined,
    pathStatus: undefined,
  });

  const { logout, isPending } = useLogout();

  const hanldeClickLogoutButton = () => {
    logout();
  };

  if (postsData === undefined) {
    return <p>로딩 중...</p>;
  }

  // TODO: Total pages 값은 서버에서 받아온 값으로 변경하기
  const TOTAL_PAGES = postsData.paginator.lastPage;
  const PAGES_PER_GROUP = 12;

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
