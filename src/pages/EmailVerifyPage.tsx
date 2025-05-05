import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { EmailVerifyForm } from '@/feature/auth';

export const EmailVerifyPage = () => {
  return (
    <ModalBackgroundWithHeader>
      <h2 className="text-center text-22 font-bold">회원가입</h2>
      <EmailVerifyForm />
    </ModalBackgroundWithHeader>
  );
};
