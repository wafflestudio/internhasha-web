import { Button } from '@/components/button';
import { LocalSignUpForm } from '@/pages/LocalSignUpPage/LocalSignUpForm';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LocalSignUpPage = () => {
  const { toSignUpSelect } = useRouteNavigation();

  return (
    <div>
      <h1>로컬 회원가입하기</h1>
      <LocalSignUpForm />
      <Button onClick={toSignUpSelect}>이전</Button>
    </div>
  );
};
