import { Button } from '@/components/ui/button';
import { ModalSelectBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';

export const UpdateCoffeeChatStatusModal = ({
  onClose,
  onConfirm,
  status,
  selectedCount,
}: {
  onClose(): void;
  onConfirm(): void;
  status: 'ACCEPTED' | 'REJECTED';
  selectedCount: number;
}) => {
  const { isVisible, handleClose: handleConfirm } = useDialog({
    onClose: onConfirm,
  });

  return (
    <ModalSelectBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleConfirm}
    >
      <div className="flex flex-col text-center">
        <p className="text-14 font-semibold text-grey-900">
          총 {selectedCount}개의 커피챗을{' '}
          {status === 'ACCEPTED' ? '성사시키' : '거절하'}시겠습니까?
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onClose} className="flex-1">
          뒤로 가기
        </Button>
        <Button onClick={onConfirm} className="flex-1">
          모두 {status === 'ACCEPTED' ? '성사하기' : '거절하기'}
        </Button>
      </div>
    </ModalSelectBackground>
  );
};
