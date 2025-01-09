import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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

  const totalPages = 20; // 총 페이지 수 (예시)
  const pagesPerGroup = 5; // 한 그룹당 표시할 페이지 수

  const startPage = currentGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i,
  );

  const { data: posts } = useGetPosts({
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

  useEffect(() => {
    console.log(currentPage);
    console.log(currentGroup);
  }, [currentPage, currentGroup]);

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
              startPage + pagesPerGroup >= totalPages ? prev : prev + 1,
            );
          }}
          disabled={startPage + pagesPerGroup >= totalPages}
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

  return { data };
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
