import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const RedirectSignInModal = () => {
  const { toSignInSelect } = useRouteNavigation();
  return (
    <ModalFloatBackground>
      <div className="flex flex-col text-center gap-[14px]">
        <p className="text-xl font-bold">이미 회원가입이 되어있어요!</p>
        <p>바로 로그인하러 가요.</p>
      </div>
      <Button onClick={toSignInSelect}>로그인하러 가기</Button>
    </ModalFloatBackground>
  );
};
