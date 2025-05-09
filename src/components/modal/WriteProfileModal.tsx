import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useDialog } from '@/shared/modal/hooks';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const WriteProfileModal = ({ onClose }: { onClose: () => void }) => {
  const { isVisible, handleClose: handleCancel } = useDialog({
    onClose,
  });
  const { toCreateProfile } = useRouteNavigation();

  return (
    <ModalFloatBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleCancel}
    >
      <div className="flex flex-col gap-[14px] text-center">
        <h2 className="text-18 font-bold">아직 프로필이 작성되지 않았어요!</h2>
        <p className="text-16 font-medium">
          프로필을 작성해야 커피챗을 신청할 수 있어요.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={handleCancel} className="flex-1">
          뒤로가기
        </Button>
        <Button
          onClick={() => {
            toCreateProfile({});
          }}
          className="flex-1"
        >
          프로필 작성하기
        </Button>
      </div>
    </ModalFloatBackground>
  );
};
