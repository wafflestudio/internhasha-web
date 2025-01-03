import { Button } from '@/components/button';
import { GoogleSocialSignInButton } from '@/pages/SignInSelectPage/GoogleSocialSignInButton';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignInSelectPage = () => {
  const { toMain, toLocalSignIn } = useRouteNavigation();

  return (
    <div>
      <p>로그인 페이지입니다.</p>
      <GoogleSocialSignInButton />
      <Button onClick={toLocalSignIn}>이메일/비밀번호로 로그인하기</Button>
      <Button onClick={toMain}>메인으로 이동</Button>
    </div>
  );
};
