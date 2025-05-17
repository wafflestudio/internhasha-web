import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export const LinkCopyButton = ({
  companyName,
  title,
}: {
  companyName: string;
  title: string;
}) => {
  const handleCopyLink = () => {
    const currentUrl = window.location.href;

    // 가독성을 높인 복사 문구 생성
    const copyText = [
      `📢 인턴하샤에서 ${companyName}의 ${title} 모집 공고를 확인해보세요!`,
      currentUrl,
    ].join('\n');

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        toast('링크가 복사되었습니다.');
      })
      .catch(() => {
        toast.error('링크 복사 중 오류가 발생했습니다.');
      });
  };

  return (
    <Button onClick={handleCopyLink} variant="outline">
      <Copy size={16} />
      <span>공유하기</span>
    </Button>
  );
};
