import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import { useGuardContext } from '@/shared/context/hooks';
import { ReSignInModalContext } from '@/shared/context/ReSignInModalContext';
import { ServiceContext } from '@/shared/context/ServiceContext';

import { TokenContext } from '../context/TokenContext';

export const AuthProtectedRoute = () => {
  const hasReissued = useRef(false);
  const { token } = useGuardContext(TokenContext);
  const { isOpen, setModalOpen } = useGuardContext(ReSignInModalContext);
  const { reissueToken, isPending } = useRefreshToken({ setModalOpen });

  console.log(token);
  if (token === null && !isPending && !hasReissued.current) {
    reissueToken();
    hasReissued.current = true;
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
