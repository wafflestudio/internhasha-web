import { ModalBackground } from '@/components/ui/layout';
import { LocalSignUpForm } from '@/feature/auth';

export const LocalSignUpPage = () => {
  return (
    <ModalBackground>
      <h2 className="text-2xl font-bold text-center">회원가입</h2>
      <div>
        <LocalSignUpForm />
      </div>
    </ModalBackground>
  );
};
