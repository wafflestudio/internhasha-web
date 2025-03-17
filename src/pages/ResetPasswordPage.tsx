import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { FindPasswordForm } from '@/feature/auth';

export const ResetPasswordPage = () => {
  return (
    <ModalBackgroundWithHeader>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-center text-[22px] font-bold">비밀번호 재발급</h2>
        <FindPasswordForm />
      </div>
    </ModalBackgroundWithHeader>
  );
};
