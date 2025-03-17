import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';

export const CancelCheckModal = ({
  onClose,
  onCancel,
}: {
  onClose(): void;
  onCancel(): void;
}) => {
  const { isVisible, handleClose: handleCancel } = useDialog({
    onClose: onCancel,
  });
  return (
    <ModalFloatBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleCancel}
    >
      <div className="flex flex-col gap-[14px] text-center">
        <p className="text-xl font-bold">작성을 취소하시겠어요?</p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={handleCancel} className="flex-1">
          계속 작성
        </Button>
        <Button variant="destructive" onClick={onClose} className="flex-1">
          취소
        </Button>
      </div>
    </ModalFloatBackground>
  );
};
