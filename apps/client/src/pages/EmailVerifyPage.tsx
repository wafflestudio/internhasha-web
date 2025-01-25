import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { EmailVerifyForm } from '@/feature/auth';

export const EmailVerifyPage = () => {
  return (
    <ModalBackgroundWithHeader>
      <h2 className="text-2xl font-bold text-center">회원가입</h2>
      <EmailVerifyForm />
    </ModalBackgroundWithHeader>
  );
};
