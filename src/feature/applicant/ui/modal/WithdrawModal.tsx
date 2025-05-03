import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';

export const WithdrawModal = ({
  onClose,
  onAction,
}: {
  onClose(): void;
  onAction(): void;
}) => {
  const { isVisible, handleClose: handleCancel } = useDialog({
    onClose,
  });
  return (
    <ModalFloatBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleCancel}
      className="text-grey-900"
    >
      <div className="flex flex-col gap-[14px] text-center">
        <p className="text-18 font-bold">정말 탈퇴하시겠어요?</p>
        <p className="text-16 font-medium">
          탈퇴 시에는 가입했던 정보가 모두 삭제됩니다.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={handleCancel} className="flex-1">
          뒤로가기
        </Button>
        <Button variant="destructive" onClick={onAction} className="flex-1">
          탈퇴하기
        </Button>
      </div>
    </ModalFloatBackground>
  );
};
