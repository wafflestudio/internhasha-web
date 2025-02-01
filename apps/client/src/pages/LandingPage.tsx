import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { SignInForBookmarkModal } from '@/components/modal/SignInForBookmarkModal';
import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { FilterElements, JobMinorCategory } from '@/entities/post';
import type { Series } from '@/entities/post';
import {
  FilterSection,
  NarrowRolesFilter,
  PaginationBar,
  PostCard,
  RolesFilter,
} from '@/feature/landing';
import { SkeletonPostCard } from '@/feature/landing/ui/SkeletonPostCard';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toPost } = useRouteNavigation();
  const [filterElements, setFilterElements] = useState<FilterElements>({
    roles: undefined,
    investmentMax: undefined,
    investmentMin: undefined,
    series: undefined,
    pathStatus: undefined,
    order: undefined,
  });
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleRolesChange = (updatedRoles: JobMinorCategory[]) => {
    setFilterElements((prev) => ({ ...prev, roles: updatedRoles }));
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { postsData } = useGetPosts({
    page: currentPage,
    ...filterElements,
  });

  const TOTAL_PAGES = postsData?.paginator.lastPage;
  const PAGES_PER_GROUP = 5;

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* 헤더 */}
        <GlobalNavigationBar />

        {/* 메인 컨텐츠 */}
        <div className="flex flex-col w-full sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl md:flex-row m-auto px-2 py-10 gap-2">
          {/* RolesFilter */}
          <div className="hidden md:block md:flex-col order-1 md:order-none md:mt-[50px]">
            <RolesFilter
              roles={filterElements.roles}
              onChangeRoles={handleRolesChange}
            />
          </div>

          {/* NarrowRolesFilter */}
          <div className="block w-full order-1 md:hidden md:order-none">
            <NarrowRolesFilter
              roles={filterElements.roles}
              onChangeRoles={handleRolesChange}
            />
          </div>

          {/* 게시글 리스트 및 상단 필터 */}
          <div className="flex-1 order-2 px-2 lg:order-none">
            <h2 className="text-2xl font-bold">인턴 공고</h2>
            {/* 상단 필터 섹션 */}
            <div className="flex justify-between items-center py-6">
              <FilterSection
                filterElements={filterElements}
                onChangeFilters={setFilterElements}
              />
            </div>

            {/* 게시글 리스트 */}
            <main>
              <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {postsData !== undefined
                  ? postsData.posts.map((post, idx) => (
                      <PostCard
                        key={`post-${idx}`}
                        post={post}
                        onDetailClick={(postId) => {
                          toPost({ postId });
                        }}
                        setShowSignInModal={setShowSignInModal}
                      />
                    ))
                  : Array.from({ length: 10 }).map((_, index) => (
                      <SkeletonPostCard key={index} />
                    ))}
              </div>
            </main>

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
        </div>
      </div>
      {showSignInModal && <SignInForBookmarkModal onClose={closeSignInModal} />}
    </>
  );
};

export const useGetPosts = ({
  page = 0,
  roles,
  investmentMax,
  investmentMin,
  series,
  pathStatus,
  order,
}: {
  page?: number;
  roles?: string[];
  investmentMax?: number;
  investmentMin?: number;
  series?: Series[];
  pathStatus?: number;
  order?: number;
}) => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { data: postsData } = useQuery({
    queryKey: [
      'postService',
      'getPosts',
      page,
      roles,
      investmentMax,
      investmentMin,
      series,
      pathStatus,
      order,
    ],
    queryFn: async () => {
      const response = await postService.getPosts({
        page,
        roles,
        investmentMax,
        investmentMin,
        series,
        pathStatus,
        token,
        order,
      });
      if (response.type === 'success') {
        return response.data;
      }
      throw new Error('회사 정보를 가져오는데 실패했습니다.');
    },
  });

  return { postsData };
};
