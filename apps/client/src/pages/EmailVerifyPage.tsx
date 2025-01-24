import { ModalBackground } from '@/components/ui/layout';
import { EmailVerifyForm } from '@/feature/auth';

export const EmailVerifyPage = () => {
  return (
    <ModalBackground>
      <h2 className="text-2xl font-bold text-center">회원가입</h2>
      <EmailVerifyForm />
    </ModalBackground>
  );
};
