import { Button } from '@/components/button';
import { LogInForm } from '@/pages/LocalSignInPage/LogInForm';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LocalSignInPage = () => {
  const { toSignInSelect, toSignUpSelect } = useRouteNavigation();
  return (
    <div>
      <p>로그인하기</p>
      <LogInForm />
      <Button onClick={toSignInSelect}>이전</Button>
      <Button onClick={toSignUpSelect}>회원가입 페이지로 이동</Button>
    </div>
  );
};
