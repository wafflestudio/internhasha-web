import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { FilterElements, Series } from '@/entities/post';
import { PaginationBar } from '@/feature/landing/ui/PaginationBar';
import { PostCard } from '@/feature/landing/ui/PostCard';
import { SkeletonPostCard } from '@/feature/landing/ui/SkeletonPostCard';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPostView = ({
  filterElements,
  setShowSignInModal,
}: {
  filterElements: FilterElements;
  setShowSignInModal: (input: boolean) => void;
}) => {
  const { toPost } = useRouteNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { postsData } = useGetPosts({
    page: currentPage,
    ...filterElements,
  });

  const PAGES_PER_GROUP = 5;

  const PostCardView = () => {
    if (postsData === undefined) {
      return (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonPostCard key={index} />
          ))}
        </>
      );
    }
    if (postsData.type === 'error') {
      return <p>채용공고를 불러오는 데 실패하였습니다. 새로고침해주세요.</p>;
    }
    return (
      <>
        {postsData.data.posts.map((post, idx) => (
          <PostCard
            key={`post-${idx}`}
            post={post}
            onDetailClick={(postId) => {
              toPost({ postId });
            }}
            setShowSignInModal={setShowSignInModal}
          />
        ))}
      </>
    );
  };

  return (
    <>
      {' '}
      {/* 게시글 리스트 */}
      <main>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <PostCardView />
        </div>
      </main>
      {/* 페이지네이션 */}
      <footer className="mt-6 flex justify-center">
        {postsData !== undefined && postsData.type === 'success' && (
          <PaginationBar
            totalPages={postsData.data.paginator.lastPage}
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
    </>
  );
};

const useGetPosts = ({
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
      return postService.getPosts({
        page,
        roles,
        investmentMax,
        investmentMin,
        series,
        pathStatus,
        token,
        order,
      });
    },
  });

  return { postsData };
};
