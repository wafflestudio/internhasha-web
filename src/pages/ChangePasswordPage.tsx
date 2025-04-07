import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { ChangePasswordForm } from '@/feature/auth';

export const ChangePasswordPage = () => {
  return (
    <ModalBackgroundWithHeader className="py-[50px]">
      <div className="flex flex-col gap-[46px]">
        <h2 className="text-center text-2xl font-bold">비밀번호 변경</h2>
        <ChangePasswordForm />
      </div>
    </ModalBackgroundWithHeader>
  );
};
