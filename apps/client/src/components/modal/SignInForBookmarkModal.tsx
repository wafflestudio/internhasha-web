import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignInForBookmarkModal = ({ onClose }: { onClose(): void }) => {
  const { toSignInSelect } = useRouteNavigation();
  return (
    <ModalFloatBackground variant="transparent">
      <div className="flex flex-col text-center">
        <p>관심 채용 공고를 추가하려면</p>
        <p> 로그인이 필요합니다.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onClose} className="flex-1">
          닫기
        </Button>
        <Button onClick={toSignInSelect} className="flex-1">
          로그인하러 가기
        </Button>
      </div>
    </ModalFloatBackground>
  );
};
