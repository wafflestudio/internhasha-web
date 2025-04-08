import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { WithdrawModal } from '@/feature/applicant/ui/modal/WithdrawModal';
import { ApplicantProfileInfo } from '@/feature/applicant/ui/mypage/ApplicantProfileInfo';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const ApplicantProfileView = ({
  setIsExistProfile,
}: {
  setIsExistProfile(input: boolean): void;
}) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const { toChangePassword } = useRouteNavigation();
  const { withdrawUser } = useWithdrawUser();
  const closeModal = () => {
    setShowWithdrawModal(false);
  };
  const openModal = () => {
    setShowWithdrawModal(true);
  };
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-[700px] flex-col gap-12 rounded-lg bg-white px-[24px] py-[48px] text-grey-900">
          <ApplicantProfileInfo setIsExistProfile={setIsExistProfile} />
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1" onClick={openModal}>
              회원 탈퇴
            </Button>
            <Button className="flex-1" onClick={toChangePassword}>
              비밀번호 수정
            </Button>
          </div>
        </div>
      </div>
      {showWithdrawModal && (
        <WithdrawModal onClose={closeModal} onAction={withdrawUser} />
      )}
    </>
  );
};

const useWithdrawUser = () => {
  const { authService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { toMain } = useRouteNavigation();
  const queryClient = useQueryClient();

  const { mutate: withdrawUser, isPending } = useMutation({
    mutationFn: () => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return authService.withdrawUser({ token });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
        toMain({});
      }
    },
  });

  return { withdrawUser, isPending };
};
