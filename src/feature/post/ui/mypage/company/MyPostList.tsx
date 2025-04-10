import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { NoCompanyProfile } from '@/feature/company/ui/mypage/NoCompanyProfile';
import { NoCreatedPosts } from '@/feature/company/ui/mypage/NoCreatedPosts';
import { CompanyPostCard } from '@/feature/post/ui/common/CompanyPostCard';
import { SkeletonPostCard } from '@/feature/post/ui/common/SkeletonPostCard';
import { PaginationBar } from '@/feature/post/ui/landing/PaginationBar';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const MyPostList = ({
  setIsExistProfile,
  setCompanyId,
}: {
  setIsExistProfile(input: boolean): void;
  setCompanyId(input: string): void;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  const { toPost } = useRouteNavigation();

  const { myInfoData } = useMyInfo({ setIsExistProfile, setCompanyId });
  const { postsData } = useGetPosts({
    page: currentPage,
  });

  if (myInfoData?.type === 'error') {
    if (myInfoData.code === 'COMPANY_001') {
      return <NoCompanyProfile />;
    }
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  if (postsData?.type === 'error') {
    return (
      <div>데이터를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해주세요.</div>
    );
  }

  if (postsData?.data.posts.length === 0 && myInfoData?.type === 'success') {
    return <NoCreatedPosts companyId={myInfoData.data.id} />;
  }

  const TOTAL_PAGES = postsData?.data.paginator.lastPage;
  const PAGES_PER_GROUP = 5;

  return (
    <div className="order-2 flex flex-1 flex-col gap-6 lg:order-none">
      {/* 회사 소개 카드 */}
      <div className="m-autogap-2 flex w-full flex-col sm:w-screen-sm md:w-screen-md md:flex-row lg:w-screen-lg xl:max-w-screen-xl">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {myInfoData !== undefined && postsData !== undefined ? (
            postsData.data.posts.map((item, idx) => (
              <CompanyPostCard
                key={`post-${idx}`}
                post={item}
                onDetailClick={() => {
                  toPost({ postId: item.id });
                }}
              />
            ))
          ) : (
            <>
              {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonPostCard key={`loading-${index}`} />
              ))}
            </>
          )}
        </div>
      </div>
      {/* 페이지네이션 */}
      <footer className="mt-6 flex justify-center">
        {TOTAL_PAGES !== undefined && (
          <PaginationBar
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
        )}
      </footer>
    </div>
  );
};

const useGetPosts = ({ page = 0 }: { page?: number }) => {
  const { companyService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { data: postsData } = useQuery({
    queryKey: ['companyService', 'getMyPosts', page],
    queryFn: async () => {
      if (token === null) {
        throw new Error('토큰이 존재하자 않습니다.');
      }
      return companyService.getMyPosts({
        token,
        page,
      });
    },
  });

  return { postsData };
};

const useMyInfo = ({
  setIsExistProfile,
  setCompanyId,
}: {
  setIsExistProfile(input: boolean): void;
  setCompanyId(input: string): void;
}) => {
  const { token } = useGuardContext(TokenContext);
  const { companyService } = useGuardContext(ServiceContext);
  const { data: myInfoData } = useQuery({
    queryKey: ['companyService', 'getMyInfo', token] as const,
    queryFn: async ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      const response = await companyService.getMyInfo({ token: t });
      if (response.type === 'success') {
        setIsExistProfile(true);
        setCompanyId(response.data.id);
      }
      return response;
    },
    enabled: token !== null,
  });

  return { myInfoData };
};
