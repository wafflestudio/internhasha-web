import { Button } from '@waffle/design-system';

import type { Series } from '@/entities/post';

export const MyCompanyList = () => {
  // TODO: 서버 API와 연결
  const mockCompanyList = [
    {
      companyName: 'AAA',
      email: 'AAA@gmail.com',
      slogan: '연우의 회사',
      series: 'A' as Series,
      imageLink: '...',
      investAmount: 12,
      investCompany: ['연우의 투자사'],
      explanation: '나는 회사 1',
    },
    {
      companyName: 'bbb',
      email: 'BBB@gmail.com',
      slogan: '연우의 회사2',
      series: 'A' as Series,
      imageLink: '...',
      investAmount: 3,
      investCompany: ['연우의 투자사', '카카오 투자사'],
      explanation: '나는 회사 2',
    },
  ];
  return (
    <div>
      {mockCompanyList.map((item, idx) => (
        <div key={`company-list-${idx}`}>
          <span>{item.companyName}</span>
          <Button>공고 작성</Button>
        </div>
      ))}
    </div>
  );
};
