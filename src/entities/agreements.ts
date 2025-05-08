import { PATH } from '@/shared/route/constants';

export type Agreement = {
  id: string;
  label: string;
  required: boolean;
  url: string;
  checked: boolean;
};

export const TERMS = [
  {
    id: 'terms-service',
    label: '서비스 이용약관에 동의합니다',
    required: true,
    url: PATH.SERVICE_TERM,
  },
  {
    id: 'terms-info',
    label: '개인정보 수집 및 이용에 동의합니다',
    required: true,
    url: PATH.INFORMATION_TERM,
  },
];
