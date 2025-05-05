import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpCompletePage = () => {
  const { toMain } = useRouteNavigation();
  return (
    <ModalFloatBackground>
      <div className="flex flex-col gap-[14px] text-center">
        <p className="text-18 font-bold">회원가입이 완료되었어요!</p>
      </div>
      <Button
        onClick={() => {
          toMain({});
        }}
      >
        메인 화면으로
      </Button>
    </ModalFloatBackground>
  );
};
