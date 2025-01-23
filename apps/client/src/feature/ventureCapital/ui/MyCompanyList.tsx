import { Button } from '@waffle/design-system';

import type { Series } from '@/entities/post';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const MyCompanyList = () => {
  const { toCreatePost } = useRouteNavigation();
  const mockCompanyList = [
    {
      companyName: 'AAA',
      email: 'AAA@gmail.com',
      slogan: '연우의 회사',
      series: 'A' as Series,
      imageLink: '...',
      investAmount: 12,
      investCompany: ['연우의 투자사'],
    },
    {
      companyName: 'bbb',
      email: 'BBB@gmail.com',
      slogan: '연우의 회사2',
      series: 'A' as Series,
      imageLink: '...',
      investAmount: 3,
      investCompany: ['연우의 투자사', '카카오 투자사'],
    },
  ];
  return (
    <div>
      {mockCompanyList.map((item, idx) => (
        <div key={`company-list-${idx}`}>
          <span>{item.companyName}</span>
          <Button
            onClick={() => {
              toCreatePost({ companyBody: item });
            }}
          >
            공고 작성
          </Button>
        </div>
      ))}
    </div>
  );
};
