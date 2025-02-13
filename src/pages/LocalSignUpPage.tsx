import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { LocalSignUpForm } from '@/feature/auth';

export const LocalSignUpPage = () => {
  return (
    <ModalBackgroundWithHeader className="py-[50px]">
      <h2 className="text-2xl font-bold text-center">회원가입</h2>
      <LocalSignUpForm />
    </ModalBackgroundWithHeader>
  );
};
