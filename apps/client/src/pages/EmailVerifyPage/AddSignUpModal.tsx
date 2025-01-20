import { Button } from '@/components/button';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const AddGoogleSignUpModal = () => {
  const { toSignInSelect } = useRouteNavigation();

  return (
    <div>
      <p>구글 로그인을 추가했어요!</p>
      <div>
        <Button onClick={toSignInSelect}>로그인하러 가기</Button>
      </div>
    </div>
  );
};

export const AddLocalSignUpModal = () => {
  const { toSignInSelect } = useRouteNavigation();

  return (
    <div>
      <p>아이디/비밀번호 로그인을 추가했어요!</p>
      <div>
        <Button onClick={toSignInSelect}>로그인하러 가기</Button>
      </div>
    </div>
  );
};

export const RedirectSignInModal = () => {
  const { toSignInSelect } = useRouteNavigation();
  return (
    <div>
      <p>이미 회원가입이 되어있습니다.</p>
      <Button onClick={toSignInSelect}>로그인하러 가기</Button>
    </div>
  );
};
