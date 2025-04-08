import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';

export const ClosePostModal = ({
  onClose,
  onConfirm,
}: {
  onClose(): void;
  onConfirm(): void;
}) => {
  const { isVisible, handleClose: handleConfirm } = useDialog({
    onClose: onClose,
  });

  return (
    <ModalFloatBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleConfirm}
    >
      <div className="flex flex-col pt-4 text-center">
        <p className="text-14 font-semibold text-grey-900">
          공고를 정말 마감하시겠어요?
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onConfirm} className="flex-1">
          공고 마감
        </Button>
        <Button variant="destructive" onClick={onClose} className="flex-1">
          취소
        </Button>
      </div>
    </ModalFloatBackground>
  );
};
