import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpCompletePage = () => {
  const { toMain } = useRouteNavigation();
  return (
    <ModalFloatBackground>
      <div className="flex flex-col gap-[14px] text-center">
        <p className="text-xl font-bold">회원가입이 완료되었어요!</p>
        <p>지금 바로 서비스를 이용할 수 있어요.</p>
      </div>
      <Button onClick={toMain}>메인 페이지로</Button>
    </ModalFloatBackground>
  );
};
