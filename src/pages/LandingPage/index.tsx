import { Button } from '@/components/button';
import { LogInForm } from '@/pages/LandingPage/LogInForm';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toEcho, toSignUp } = useRouteNavigation();
  return (
    <div>
      <p>로그인하기</p>
      <LogInForm />
      <Button onClick={toSignUp}>회원가입 페이지로 이동</Button>
      <Button onClick={toEcho}>에코 페이지로 이동</Button>
    </div>
  );
};
