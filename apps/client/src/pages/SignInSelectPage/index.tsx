import { Button } from '@/components/button';
import { GoogleSocialSignInButton } from '@/pages/SignInSelectPage/GoogleSocialSignInButton';
import { LocalLogInForm } from '@/pages/SignInSelectPage/LogInForm';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignInSelectPage = () => {
  const { toMain, toSignUpSelect } = useRouteNavigation();

  return (
    <div>
      <p>로그인 페이지입니다.</p>
      <LocalLogInForm />
      <GoogleSocialSignInButton />
      <Button onClick={toSignUpSelect}>회원가입하기</Button>
      <Button onClick={toMain}>메인으로 이동</Button>
    </div>
  );
};
