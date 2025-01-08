import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import { useGuardContext } from '@/shared/context/hooks';
import { ReSignInModalContext } from '@/shared/context/ReSignInModalContext';
import { ServiceContext } from '@/shared/context/ServiceContext';

export const AuthProtectedRoute = () => {
  const [isRefreshed, setIsRefreshed] = useState(false);
  const { isOpen, setModalOpen } = useGuardContext(ReSignInModalContext);
  const { reissueToken, isPending } = useRefreshToken({ setModalOpen });

  if (isOpen && !isPending && !isRefreshed) {
    reissueToken();
    setIsRefreshed(true);
  }

  return isOpen ? <ReSignInModal /> : <Outlet />;
};

const useRefreshToken = ({
  setModalOpen,
}: {
  setModalOpen(input: boolean): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);

  const { mutate: reissueToken, isPending } = useMutation({
    mutationFn: () => {
      return authService.ReissueAccessToken();
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setModalOpen(false);
      } else {
        setModalOpen(true);
      }
    },
    onError: () => {
      setModalOpen(true);
    },
  });

  return {
    reissueToken,
    isPending,
  };
};
