import { Button } from '@waffle/design-system';

export const CancelCheckModal = ({
  onClose,
  onCancel,
  className,
}: {
  onClose(): void;
  onCancel(): void;
  className?: string;
}) => {
  return (
    <div>
      <p>작성을 취소하시겠어요?</p>
      <div>
        <Button onClick={onCancel}>계속 작성</Button>
        <Button onClick={onClose}>취소</Button>
      </div>
    </div>
  );
};
