import { Button } from '@/components/button';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpCompletePage = () => {
  const { toMain } = useRouteNavigation();
  return (
    <div>
      <p>회원가입이 완료되었어요!</p>
      <p>지금 바료 서비스를 이용할 수 있어요.</p>
      <Button onClick={toMain}>메인 페이지로</Button>
    </div>
  );
};
