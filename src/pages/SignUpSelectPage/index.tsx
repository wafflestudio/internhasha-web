import { Button } from '@/components/button';
import { GoogleSocialSignUpButton } from '@/pages/SignUpSelectPage/GoogleSocialSignUpButton';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpSelectPage = () => {
  const { toMain, toSignUpLocal } = useRouteNavigation();

  return (
    <div>
      <p>회원가입 페이지입니다.</p>
      <GoogleSocialSignUpButton />
      <Button onClick={toSignUpLocal}>일반 회원가입</Button>
      <Button onClick={toMain}>메인으로 이동</Button>
    </div>
  );
};
