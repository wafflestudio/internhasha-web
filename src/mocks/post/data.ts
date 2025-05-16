import type { PostBriefDTO, PostsResponse } from '@/mocks/post/schemas';

const mockPostsResponse: PostBriefDTO[] = Array.from(
  { length: 100 },
  (_, index) => ({
    id: index.toString(),
    author: { id: `a${index}`, name: `홍길동${index}` },
    companyName: `회사 ${index}`,
    profileImageKey: '/',
    location: '서울시|2층',
    employmentEndDate: null,
    positionTitle: `개발자 ${index}`,
    domain: 'FINTECH',
    detailSummary: '회사 상세 소개 중 일부분만 가지고 왔어요.',
    slogan: '회사 한 줄 소개입니다.',
    positionType: 'FRONT',
    headCount: 3,
    isBookmarked: index % 5 !== 0,
    createdAt: `2024-01-${10 + index}`,
    updatedAt: `2024-01-${15 + index}`,
    tags: [],
    coffeeChatCount: index,
  }),
);

// 페이지당 게시글 수
const POSTS_PER_PAGE = 12;

// 전체 페이지 수 계산
const TOTAL_PAGES = Math.ceil(mockPostsResponse.length / POSTS_PER_PAGE);

export const getPagedPosts = (page: number): PostsResponse => {
  const startIndex = page * POSTS_PER_PAGE;
  const endIndex = Math.min(
    startIndex + POSTS_PER_PAGE,
    mockPostsResponse.length,
  );

  return {
    posts: mockPostsResponse.slice(startIndex, endIndex),
    paginator: {
      lastPage: TOTAL_PAGES,
    },
  };
};
