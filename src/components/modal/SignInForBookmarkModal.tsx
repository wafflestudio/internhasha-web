import { Button } from '@/components/ui/button';
import { ModalSelectBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignInForBookmarkModal = ({ onClose }: { onClose(): void }) => {
  const { toSignInSelect } = useRouteNavigation();
  const { isVisible, handleClose } = useDialog({ onClose });

  return (
    <ModalSelectBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleClose}
    >
      <div className="flex flex-col text-center text-14 font-semibold text-grey-900">
        <p>관심 채용 공고를 추가하려면</p>
        <p>로그인이 필요합니다.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={handleClose} className="flex-1">
          닫기
        </Button>
        <Button onClick={toSignInSelect} className="flex-1">
          로그인하러 가기
        </Button>
      </div>
    </ModalSelectBackground>
  );
};
