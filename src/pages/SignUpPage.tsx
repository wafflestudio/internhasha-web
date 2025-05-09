import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { ICON_SRC } from '@/entities/asset';
import { LocalSignUpForm } from '@/feature/auth';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpPage = () => {
  const { toSignInSelect } = useRouteNavigation();

  return (
    <ModalBackgroundWithHeader className="py-[50px]">
      <div className="flex flex-col gap-[46px]">
        <h2 className="text-center text-22 font-bold">회원가입</h2>
        <div className="flex gap-2 bg-grey-50 p-4 text-13 font-light">
          <img src={ICON_SRC.INFO} className="mt-0.5 h-4 w-4" />
          <span>
            학생 회원가입 페이지입니다. 회사 계정은 인턴하샤에서 발급해드립니다.
          </span>
        </div>
        <LocalSignUpForm />
        <div className="text-center">
          <p className="text-sm text-grey-300">
            이미 계정이 있으신가요?{' '}
            <a
              className="text-grey-800 underline-offset-4 hover:cursor-pointer hover:underline hover:decoration-grey-800"
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
