import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { FilterElements } from '@/entities/post';
import type { Series } from '@/entities/post';
import { FilterSection } from '@/feature/landing';
import { PaginationBar } from '@/feature/landing';
import { SkeletonPostCard } from '@/feature/landing/ui/SkeletonPostCard';
import { PostCard } from '@/feature/ventureCapital/ui/PostCard';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const MyPostList = () => {
  const [filterElements, setFilterElements] = useState<FilterElements>({
    roles: undefined,
    investmentMax: undefined,
    investmentMin: undefined,
    series: undefined,
    pathStatus: undefined,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { toPost } = useRouteNavigation();

  const { postsData } = useGetPosts({
    page: currentPage,
    ...filterElements,
  });

  if (postsData?.type === 'error') {
    return (
      <div>데이터를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해주세요.</div>
    );
  }

  const TOTAL_PAGES = postsData?.data.paginator.lastPage;
  const PAGES_PER_GROUP = 5;

  return (
    <div className="flex flex-col gap-6 flex-1 order-2 lg:order-none">
      {/* 상단 필터 섹션 */}
      <div className="flex justify-between items-center">
        <FilterSection
          filterElements={filterElements}
          onChangeFilters={setFilterElements}
        />
      </div>
      {/* 회사 소개 카드 */}
      <div className="flex flex-col w-full sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl md:flex-row m-autogap-2">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {postsData !== undefined ? (
            postsData.data.posts.map((item, idx) => (
              <PostCard
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

export const useGetPosts = ({
  page = 0,
  roles,
  investmentMax,
  investmentMin,
  series,
  pathStatus,
}: {
  page?: number;
  roles?: string[];
  investmentMax?: number;
  investmentMin?: number;
  series?: Series[];
  pathStatus?: number;
}) => {
  const { ventureCapitalService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { data: postsData } = useQuery({
    queryKey: [
      'postService',
      'getMyPosts',
      page,
      roles,
      investmentMax,
      investmentMin,
      series,
      pathStatus,
    ],
    queryFn: async () => {
      if (token === null) {
        throw new Error('토큰이 존재하자 않습니다.');
      }
      return ventureCapitalService.getMyPosts({
        token,
        page,
        roles,
        investmentMax,
        investmentMin,
        series,
        pathStatus,
      });
    },
  });

  return { postsData };
};
