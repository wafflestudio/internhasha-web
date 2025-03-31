import type { CompanyResponse } from '@/mocks/company/schemas';

export const mockCompany: CompanyResponse = {
  id: 'c123456',
  companyName: 'Tech Innovators',
  companyEstablishedYear: 2015,
  domain: 'FINTECH',
  headcount: 120,
  location: '서울특별시 강남구 테헤란로 123',
  slogan: '혁신적인 금융 기술을 선도합니다.',
  detail:
    'Tech Innovators는 AI 기반 금융 솔루션을 제공하는 핀테크 기업입니다. 머신러닝을 활용한 신용 평가 시스템과 블록체인 기술을 접목한 보안 결제 시스템을 개발하고 있습니다.',
  profileImageKey: 'tech_innovators_profile.jpg',
  companyInfoPDFKey: 'tech_innovators_info.pdf',
  landingPageLink: 'https://www.techinnovators.com',
  links: [
    {
      link: 'https://www.linkedin.com/company/techinnovators',
      description: 'LinkedIn',
    },
    {
      link: 'https://github.com/techinnovators',
      description: 'GitHub',
    },
  ],
  tags: [{ tag: 'AI' }, { tag: '블록체인' }, { tag: '핀테크' }],
  vcName: 'Global Venture Partners',
  vcRecommendation:
    'Tech Innovators는 AI 및 블록체인 기술을 활용한 금융 혁신을 주도하는 기업으로, 향후 큰 성장이 기대됩니다.',
};
