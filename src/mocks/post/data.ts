import type {
  PostDetailResponse,
  PostsResponse,
} from '@/mocks/post/schemas.ts';

const mockPostsResponse = Array.from({ length: 100 }, (_, index) => ({
  id: `${index + 1}`,
  companyName: `Company ${index + 1}`,
  email: `contact${index + 1}@company.com`,
  author: {
    id: `author-${index + 1}`,
    name: `Author ${index + 1}`,
    profileImageLink:
      index % 2 === 0
        ? `https://example.com/profile${index + 1}.jpg`
        : undefined,
  },
  explanation: `This is a brief explanation for Company ${index + 1}.`,
  tags: [`tag${index + 1}-1`, `tag${index + 1}-2`, `tag${index + 1}-3`],
  roles: [
    {
      id: `role-${index + 1}-1`,
      category: 'Engineering',
      detail: 'Frontend Developer',
      headcount: '5',
    },
    {
      id: `role-${index + 1}-2`,
      category: 'Engineering',
      detail: 'Backend Developer',
      headcount: '3',
    },
  ],
  imageLink: `https://example.com/image${index + 1}.jpg`,
  investAmount: (index + 1) * 1000,
  investCompany: [`Investor ${index + 1}`, `Investor ${index + 2}`],
  isActive: index % 2 === 0,
  employmentEndDate: new Date(2025, index % 12, (index % 28) + 1), // 날짜를 동적으로 생성
}));

export const mockPost1: PostDetailResponse = {
  id: '1',
  companyName: 'Mock Company Inc.', // 수정된 회사 이름
  email: 'contact@mockcompany.com',
  author: {
    id: 'author123',
    name: 'John Doe',
    profileImageLink: 'https://example.com/profile.jpg',
  },
  explanation:
    'This is a mock company providing innovative solutions for businesses.',
  tags: ['Innovation', 'Technology', 'Solutions'],
  roles: [
    {
      id: 'role1',
      category: 'Engineering',
      detail: 'Frontend Developer',
      headcount: '5',
    },
    {
      id: 'role2',
      category: 'Engineering',
      detail: 'Backend Developer',
      headcount: '3',
    },
  ],
  imageLink: 'https://example.com/company-image.jpg',
  investAmount: 5000000,
  investCompany: ['Mock Ventures', 'Tech Angels'],
  IRDeckLink: 'https://example.com/ir-deck.pdf',
  landingPageLink: 'https://mockcompany.com',
  externalDescriptionLink: [
    'https://linkedin.com/mockcompany',
    'https://twitter.com/mockcompany',
  ],
  isActive: true,
  employmentEndDate: new Date('2024-12-31T23:59:59'),
};

export const mockPost2: PostDetailResponse = {
  id: '2',
  companyName: 'Mock Company Inc.', // 수정된 회사 이름
  email: 'contact@mockcompany.com',
  author: {
    id: 'author123',
    name: 'John Doe',
    profileImageLink: 'https://example.com/profile.jpg',
  },
  explanation:
    'This is a mock company providing innovative solutions for businesses.',
  tags: ['Innovation', 'Technology', 'Solutions'],
  roles: [
    {
      id: 'role1',
      category: 'Engineering',
      detail: 'Frontend Developer',
      headcount: '5',
    },
    {
      id: 'role2',
      category: 'Engineering',
      detail: 'Backend Developer',
      headcount: '3',
    },
  ],
  imageLink: 'https://example.com/company-image.jpg',
  investAmount: 5000000,
  investCompany: ['Mock Ventures', 'Tech Angels'],
  IRDeckLink: 'https://example.com/ir-deck.pdf',
  landingPageLink: 'https://mockcompany.com',
  externalDescriptionLink: [
    'https://linkedin.com/mockcompany',
    'https://twitter.com/mockcompany',
  ],
  isActive: true,
  employmentEndDate: new Date('2024-12-31T23:59:59'),
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
