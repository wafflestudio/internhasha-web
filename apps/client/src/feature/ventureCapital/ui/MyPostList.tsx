import { Button } from '@waffle/design-system';

import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const MyPostList = () => {
  const { toPost } = useRouteNavigation();
  const mockBriefPost = [
    {
      id: 'AAA',
      companyName: '레브잇',
      slogan: '최신 LLM 오픈 소스 모델과 자체개발 어쩌구',
      investAmount: 3,
      investCompany: ['연우 투자사', '우연투자사'],
      series: 'SEED',
      imageLink: '...',

      title: 'react 프론트엔드 개발자',
      isAlways: false,
      employmentEndDate: '2024-01-25T09:00:00',
      createdAt: '2024-01-22T09:00:00',
      updatedAt: '2024-01-23T09:00:00',
      isActive: true,
      category: 'FRONT',

      detail: '이히히',
      headcount: 3,
    },
    {
      id: 'BBB',
      companyName: '마이프랜차이즈',
      slogan: '최신 LLM 오픈 소스 모델과 자체개발 어쩌구',
      investAmount: 3,
      investCompany: ['연우 투자사'],
      series: 'A',
      imageLink: '...',

      title: 'Full Stack Engineer',
      isAlways: false,
      employmentEndDate: '2024-01-25T09:00:00',
      createdAt: '2024-01-22T09:00:00',
      updatedAt: '2024-01-23T09:00:00',
      isActive: true,
      category: 'FRONT',

      detail: '얏호',
      headcount: 3,
    },
  ];
  return (
    <div>
      {mockBriefPost.map((item, idx) => (
        <div key={`post-list-${idx}`}>
          <div>
            <span>{item.title}</span>
          </div>
          <div>{item.companyName}</div>
          <span>{item.companyName}</span>
          <Button
            onClick={() => {
              toPost({ postId: item.id });
            }}
          >
            공고 작성
          </Button>
        </div>
      ))}
    </div>
  );
};
