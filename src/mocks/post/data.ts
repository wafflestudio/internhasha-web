export const mockPosts = [
  {
    id: '1',
    companyName: 'ABC 회사',
    title: 'string',
    email: 'string',
    author: {
      id: 'string',
      name: 'string',
      profileImageLink: 'String?',
    },
    explanation: '회사 설명입니다.', // 추가
    tags: ['ABC초콜릿', 'ABC초코쿠키도 있어요', '설빙ABC초코쿠키도 많은관심'],
    roles: [
      {
        id: 'asdjfkadf',
        category: '개발자',
        detail: '프론트엔드',
        headcount: '3', // 문자열로 수정
      },
      {
        id: 'sjdfhsjldf',
        category: '개발자',
        detail: 'SpringBoot',
        headcount: '2', // 문자열로 수정
      },
    ],
    imageLink: '목업',
    investAmount: 12345,
    investCompany: ['String'], // 배열로 수정
    isActive: true,
    employmentEndDate: new Date('2023-12-31'), // 추가
  },
  {
    id: '2',
    companyName: 'ABC 회사',
    title: 'string',
    email: 'string',
    author: {
      id: 'string',
      name: 'string',
      profileImageLink: 'String?',
    },
    explanation: '회사 설명입니다.', // 추가
    tags: ['ABC초콜릿', 'ABC초코쿠키도 있어요', '설빙ABC초코쿠키도 많은관심'],
    roles: [
      {
        id: 'asdjfkadf',
        category: '개발자',
        detail: '프론트엔드',
        headcount: '3', // 문자열로 수정
      },
      {
        id: 'sjdfhsjldf',
        category: '개발자',
        detail: 'SpringBoot',
        headcount: '2', // 문자열로 수정
      },
    ],
    imageLink: '목업',
    investAmount: 12345,
    investCompany: ['String'], // 배열로 수정
    isActive: true,
    employmentEndDate: new Date('2023-12-31'), // 추가
  },
  {
    id: '3',
    companyName: 'ABC 회사',
    title: 'string',
    email: 'string',
    author: {
      id: 'string',
      name: 'string',
      profileImageLink: 'String?',
    },
    explanation: '회사 설명입니다.', // 추가
    tags: ['ABC초콜릿', 'ABC초코쿠키도 있어요', '설빙ABC초코쿠키도 많은관심'],
    roles: [
      {
        id: 'asdjfkadf',
        category: '개발자',
        detail: '프론트엔드',
        headcount: '3', // 문자열로 수정
      },
      {
        id: 'sjdfhsjldf',
        category: '개발자',
        detail: 'SpringBoot',
        headcount: '2', // 문자열로 수정
      },
    ],
    imageLink: '목업',
    investAmount: 12345,
    investCompany: ['String'], // 배열로 수정
    isActive: true,
    employmentEndDate: new Date('2023-12-31'), // 추가
  },
  {
    id: '4',
    companyName: 'ABC 회사',
    title: 'string',
    email: 'string',
    author: {
      id: 'string',
      name: 'string',
      profileImageLink: 'String?',
    },
    explanation: '회사 설명입니다.', // 추가
    tags: ['ABC초콜릿', 'ABC초코쿠키도 있어요', '설빙ABC초코쿠키도 많은관심'],
    roles: [
      {
        id: 'asdjfkadf',
        category: '개발자',
        detail: '프론트엔드',
        headcount: '3', // 문자열로 수정
      },
      {
        id: 'sjdfhsjldf',
        category: '개발자',
        detail: 'SpringBoot',
        headcount: '2', // 문자열로 수정
      },
    ],
    imageLink: '목업',
    investAmount: 12345,
    investCompany: ['String'], // 배열로 수정
    isActive: true,
    employmentEndDate: new Date('2023-12-31'), // 추가
  },
  {
    id: '5',
    companyName: 'ABC 회사',
    title: 'string',
    email: 'string',
    author: {
      id: 'string',
      name: 'string',
      profileImageLink: 'String?',
    },
    explanation: '회사 설명입니다.', // 추가
    tags: ['ABC초콜릿', 'ABC초코쿠키도 있어요', '설빙ABC초코쿠키도 많은관심'],
    roles: [
      {
        id: 'asdjfkadf',
        category: '개발자',
        detail: '프론트엔드',
        headcount: '3', // 문자열로 수정
      },
      {
        id: 'sjdfhsjldf',
        category: '개발자',
        detail: 'SpringBoot',
        headcount: '2', // 문자열로 수정
      },
    ],
    imageLink: '목업',
    investAmount: 12345,
    investCompany: ['String'], // 배열로 수정
    isActive: true,
    employmentEndDate: new Date('2023-12-31'), // 추가
  },
];

export const mockPost1 = {
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

export const mockPost2 = {
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
