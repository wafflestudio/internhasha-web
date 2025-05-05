import { Button } from '@/components/ui/button';
import { ModalSelectBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';

export const CancelCoffeeChatCancelModal = ({
  onClose,
  onCancel,
}: {
  onClose(): void;
  onCancel(): void;
}) => {
  const { isVisible, handleClose } = useDialog({
    onClose: onClose,
  });
  return (
    <ModalSelectBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleClose}
    >
      <div className="flex flex-col gap-[14px] text-center">
        <p className="text-14 font-semibold text-grey-900">
          커피챗 신청을 취소하시겠어요?
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onClose} className="flex-1">
          뒤로 가기
        </Button>
        <Button variant="destructive" onClick={onCancel} className="flex-1">
          신청 취소
        </Button>
      </div>
    </ModalSelectBackground>
  );
};
