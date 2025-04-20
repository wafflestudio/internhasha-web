import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const WriteCVModal = ({
  onClose,
  postId,
}: {
  onClose: () => void;
  postId: string;
}) => {
  const { isVisible, handleClose: handleCancel } = useDialog({
    onClose,
  });
  const { toPatchProfile, toCreateCoffeeChat } = useRouteNavigation();

  return (
    <ModalFloatBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleCancel}
    >
      <div className="flex flex-col gap-[14px] text-center">
        <h2 className="text-18 font-bold">
          커피챗 신청 이전에 CV 작성을 하시겠어요?
        </h2>
        <div className="flex flex-col items-center gap-1">
          <p>CV를 작성하면 채용 담당자에게 자신을</p>
          <p>더 잘 보여줄 수 있어요.</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            toCreateCoffeeChat({ postId });
          }}
          className="flex-1"
        >
          CV 없이 신청
        </Button>
        <Button
          onClick={() => {
            toPatchProfile();
          }}
          className="flex-1"
        >
          CV 작성하기
        </Button>
      </div>
    </ModalFloatBackground>
  );
};
