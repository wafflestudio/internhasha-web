import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpModal = ({ onClose }: { onClose(): void }) => {
  const { toSignUp } = useRouteNavigation();

  return (
    <ModalFloatBackground variant="transparent">
      <div className="flex flex-col text-center gap-[14px]">
        <h2 className="text-xl font-bold">아직 회원가입되지 않았습니다!</h2>
        <p>회원가입 페이지로 이동하시겠습니까?</p>
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
