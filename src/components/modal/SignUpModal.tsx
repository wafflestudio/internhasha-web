import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpModal = ({ onClose }: { onClose(): void }) => {
  const { toSignUp } = useRouteNavigation();

  return (
    <ModalFloatBackground variant="transparent">
      <div className="flex flex-col gap-[14px] text-center text-grey-900">
        <h2 className="text-18 font-bold">아직 회원가입되지 않았습니다!</h2>
        <p className="text-16 font-medium">
          회원가입 페이지로 이동하시겠습니까?
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onClose} className="flex-1">
          닫기
        </Button>
        <Button
          onClick={() => {
            toSignUp({});
          }}
          className="flex-1"
        >
          회원가입 페이지로
        </Button>
      </div>
    </ModalFloatBackground>
  );
};
