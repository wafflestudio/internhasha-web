import type { PostDetailResponse, PostsResponse } from '@/mocks/post/schemas';

const mockPostsResponse: PostDetailResponse[] = Array.from(
  { length: 100 },
  (_, index) => ({
    id: index.toString(),
    author: { id: `a${index}`, name: `홍길동${index}` },
    companyName: `스타트업 ${String.fromCharCode(index)}`,
    explanation: `혁신적인 서비스 ${index}`,
    email: `info@startup${index}.com`,
    slogan: `미래를 여는 기술 ${index}`,
    investAmount: index % 2 === 0 ? 3000000 : undefined,
    investCompany: [`VC ${index}`],
    series: index % 5 === 0 ? 'C' : 'SEED',
    irDeckLink: `https://example.com/deck${index}.pdf`,
    landingPageLink: `https://startup${index}.com`,
    imageLink: `https://example.com/startup${index}.jpg`,
    externalDescriptionLink: [
      {
        link: `https://news${index}.com`,
        description: `관련 기사 ${index}`,
      },
    ],
    tags: [`태그${index}`, '스타트업'],
    title: `개발자 모집 ${index}`,
    employmentEndDate: index % 3 === 0 ? '2025-04-01' : undefined,
    createdAt: `2024-01-${10 + index}`,
    updatedAt: `2024-01-${15 + index}`,
    isActive: index % 2 === 0,
    category: index % 3 === 0 ? 'APP' : 'PLANNER',
    detail: `프로젝트 관리 및 실행 ${index}`,
    headcount: index + 1,
    isBookmarked: index % 2 !== 0,
  }),
);

export const mockPost1: PostDetailResponse = {
  id: '1',
  author: {
    id: 'a1',
    name: '김철수',
    profileImageLink: 'https://example.com/profile1.jpg',
  },
  companyName: '스타트업 A',
  explanation: '혁신적인 AI 솔루션을 제공합니다.',
  email: 'contact@startupA.com',
  slogan: 'AI로 더 나은 세상을',
  investAmount: 5000000,
  investCompany: ['VC Alpha', 'VC Beta'],
  series: 'A',
  irDeckLink: 'https://example.com/deckA.pdf',
  landingPageLink: 'https://startupA.com',
  imageLink: 'https://example.com/startupA.jpg',
  externalDescriptionLink: [
    { link: 'https://newsA.com', description: '스타트업 A 관련 기사' },
  ],
  tags: ['AI', '혁신', '스타트업'],
  title: 'AI 개발자 모집',
  employmentEndDate: '2025-03-01',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-10',
  isActive: true,
  category: 'BACKEND',
  detail: 'AI 모델 개발 및 운영',
  headcount: 3,
  isBookmarked: false,
};

export const mockPost2: PostDetailResponse = {
  id: '2',
  author: { id: 'a2', name: '이영희' },
  companyName: '핀테크 B',
  explanation: '차세대 금융 서비스 제공',
  email: 'info@fintechB.com',
  slogan: '금융의 새로운 패러다임',
  investCompany: ['VC Gamma'],
  series: 'SEED',
  title: '프론트엔드 개발자 모집',
  createdAt: '2024-01-05',
  updatedAt: '2024-01-15',
  isActive: true,
  category: 'FRONT',
  detail: 'React 기반 웹앱 개발',
  headcount: 5,
  isBookmarked: true,
};

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
