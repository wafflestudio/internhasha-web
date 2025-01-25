import { useState } from 'react';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { FilterElements, JobMinorCategory } from '@/entities/post';
import {
  FilterSection,
  NarrowRolesFilter,
  Pagination,
  PostCard,
  RolesFilter,
  useGetPosts,
} from '@/feature/landing';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toPost } = useRouteNavigation();
  const [filterElements, setFilterElements] = useState<FilterElements>({
    roles: undefined,
    investmentMax: undefined,
    investmentMin: undefined,
    series: undefined,
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

  if (postsData === undefined) {
    return <p>로딩 중...</p>;
  }

  const TOTAL_PAGES = postsData.paginator.lastPage;
  const PAGES_PER_GROUP = 5;

  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        {/* 헤더 */}
        <GlobalNavigationBar />

        {/* 메인 컨텐츠 */}
        <div className="container mx-auto py-6 flex flex-col lg:flex-row gap-2">
          {/* RolesFilter */}
          {/* RolesFilter */}
          <div className="hidden lg:block lg:w-1/4 w-full order-1 lg:order-none">
            <RolesFilter
              roles={filterElements.roles}
              onChangeRoles={handleRolesChange}
            />
          </div>

          {/* NarrowRolesFilter */}
          <div className="block  w-full order-1 lg:hidden lg:order-none">
            <NarrowRolesFilter
              roles={filterElements.roles}
              onChangeRoles={handleRolesChange}
            />
          </div>

          {/* 게시글 리스트 및 상단 필터 */}
          <div className="flex-1 order-2 lg:order-none">
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
                    onDetailClick={(postId) => {
                      toPost({ postId });
                    }}
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
                onChangePage={(page) => {
                  setCurrentPage(page);
                }}
                onChangeGroup={(group) => {
                  setCurrentGroup(group);
                }}
              />
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
