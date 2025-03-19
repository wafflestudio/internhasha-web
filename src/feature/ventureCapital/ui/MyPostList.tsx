import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { JobMinorCategory, PostFilter } from '@/entities/post';
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
  const [postFilter, setPostFilter] = useState<PostFilter>({
    roles: undefined,
    investmentMax: undefined,
    investmentMin: undefined,
    series: undefined,
    employing: undefined,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { toPost } = useRouteNavigation();

  const { postsData } = useGetPosts({
    page: currentPage,
    ...postFilter,
  });

  if (postsData?.type === 'error') {
    return (
      <div>데이터를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해주세요.</div>
    );
  }

  const TOTAL_PAGES = postsData?.data.paginator.lastPage;
  const PAGES_PER_GROUP = 5;

  return (
    <div className="order-2 flex flex-1 flex-col gap-6 lg:order-none">
      {/* 상단 필터 섹션 */}
      <div className="flex items-center justify-between">
        <FilterSection
          postFilter={postFilter}
          onChangeFilters={setPostFilter}
        />
      </div>
      {/* 회사 소개 카드 */}
      <div className="m-autogap-2 flex w-full flex-col sm:w-screen-sm md:w-screen-md md:flex-row lg:w-screen-lg xl:max-w-screen-xl">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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

const useGetPosts = ({
  page = 0,
  roles,
  investmentMax,
  investmentMin,
  series,
  employing,
}: {
  page?: number;
  roles?: JobMinorCategory[];
  investmentMax?: number;
  investmentMin?: number;
  series?: Series[];
  employing?: 0 | 1;
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
      employing,
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
        employing,
      });
    },
  });

  return { postsData };
};
