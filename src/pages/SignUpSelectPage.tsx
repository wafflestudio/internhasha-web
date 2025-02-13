import { Button } from '@/components/ui/button';
import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { GoogleSocialSignUpButton } from '@/feature/auth';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpSelectPage = () => {
  const { toSignInSelect, toSignUpLocal } = useRouteNavigation();

  return (
    <ModalBackgroundWithHeader>
      <div className="flex flex-col gap-[46px]">
        <h2 className="text-2xl font-bold text-center">회원가입</h2>
        <div className="flex flex-col gap-[10px]">
          <GoogleSocialSignUpButton />
          <Button
            onClick={() => {
              toSignUpLocal({});
            }}
            className="w-full"
          >
            일반 회원가입
          </Button>
        </div>
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
