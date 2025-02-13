import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignInForCoffeeChatModal = ({ onClose }: { onClose(): void }) => {
  const { toSignInSelect } = useRouteNavigation();
  const { isVisible, handleClose } = useDialog({ onClose });

  return (
    <ModalFloatBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleClose}
    >
      <div className="flex flex-col text-center">
        <p>커피챗을 신청하려면</p>
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
    </ModalFloatBackground>
  );
};
