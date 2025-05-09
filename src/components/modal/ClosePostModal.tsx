import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { ModalSelectBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';

export const ClosePostModal = ({
  onClose,
  onConfirm,
  modalMessage,
}: {
  onClose(): void;
  onConfirm(): void;
  modalMessage: string;
}) => {
  const { isVisible, handleClose } = useDialog({
    onClose,
  });

  return (
    <ModalSelectBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleClose}
    >
      <div className="flex flex-col pt-4 text-center">
        <p className="text-14 font-semibold text-grey-900">
          공고를 정말 마감하시겠어요?
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="destructive" onClick={onConfirm} className="flex-1">
          공고 마감
        </Button>
        <Button variant="secondary" onClick={handleClose} className="flex-1">
          취소
        </Button>
      </div>
      {modalMessage.trim().length !== 0 && (
        <FormErrorResponse>{modalMessage}</FormErrorResponse>
      )}
    </ModalSelectBackground>
  );
};
