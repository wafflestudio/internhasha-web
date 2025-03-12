import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { FindPasswordForm } from '@/feature/auth';

export const FindAccountPage = () => {
  return (
    <ModalBackgroundWithHeader>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[22px] font-bold text-center">비밀번호 찾기</h2>
        <FindPasswordForm />
      </div>
    </ModalBackgroundWithHeader>
  );
};
