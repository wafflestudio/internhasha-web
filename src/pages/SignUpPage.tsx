import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { LocalSignUpForm } from '@/feature/auth';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpPage = () => {
  const { toSignInSelect } = useRouteNavigation();

  return (
    <ModalBackgroundWithHeader className="py-[50px]">
      <div className="flex flex-col gap-[46px]">
        <h2 className="text-2xl font-bold text-center">회원가입</h2>
        <LocalSignUpForm />
        <div className="text-center">
          <p className="text-sm text-grey-normal">
            이미 계정이 있으신가요?{' '}
            <a
              className="text-grey-dark-active underline-offset-4 hover:cursor-pointer hover:underline hover:decoration-grey-dark-active"
              onClick={toSignInSelect}
            >
              로그인
            </a>
          </p>
        </div>
      </div>
    </ModalBackgroundWithHeader>
  );
};
