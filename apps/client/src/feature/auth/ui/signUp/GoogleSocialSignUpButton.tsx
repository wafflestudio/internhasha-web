import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { FormErrorResponse } from '@/components/response/formError';
import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import { createErrorMessage } from '@/entities/errors';
import { AddGoogleSignUpModal } from '@/feature/auth';
import { RedirectSignInModal } from '@/feature/auth';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const GoogleSocialSignUpButton = () => {
  const [responseMessage, setResponseMessage] = useState<string | undefined>(
    undefined,
  );
  const [showModal, setShowModal] = useState<'NONE' | 'ADD' | 'REDIRECT'>(
    'NONE',
  );

  const { checkGoogleMail, isPending: isPendingCheckMail } = useCheckGoogleMail(
    {
      setResponseMessage,
      onSnuEmailSuccess: (email, token) => {
        googleSignUp({ snuMail: email, token });
      },
    },
  );

  const { googleSignUp, isPending: isPendingSignUp } = useGoogleSignUp({
    setResponseMessage,
    setShowModal,
  });

  const isPending = isPendingCheckMail || isPendingSignUp;

  const popupGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const token = credentialResponse.access_token;
      checkGoogleMail({ token });
    },
    onError: (errorResponse) => {
      setResponseMessage(errorResponse.error_description);
    },
  });

  const handleClickGoogleSignUpButton = () => {
    popupGoogle();
  };

  return (
    <div>
      <Button
        onClick={handleClickGoogleSignUpButton}
        disabled={isPending}
        variant="outline"
        className="w-full"
      >
        <img src={ICON_SRC.GOOGLE} />
        구글 계정으로 간편 회원가입
      </Button>
      {responseMessage !== undefined && (
        <div className="text-red-500 text-sm mt-2">
          <FormErrorResponse>{responseMessage}</FormErrorResponse>
        </div>
      )}
      {showModal === 'ADD' && <AddGoogleSignUpModal />}
      {showModal === 'REDIRECT' && <RedirectSignInModal />}
    </div>
  );
};

const useCheckGoogleMail = ({
  setResponseMessage,
  onSnuEmailSuccess,
}: {
  setResponseMessage(input: string): void;
  onSnuEmailSuccess(email: string, token: string): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const SNU_MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@snu\.ac\.kr$/;

  const { toVerifyEmail } = useRouteNavigation();

  const { mutate: checkGoogleMail, isPending } = useMutation({
    mutationFn: ({ token }: { token: string }) => {
      return authService.checkGoogleEmail({ token });
    },
    onSuccess: (response, variables) => {
      if (response.type === 'success') {
        const email = response.data.googleEmail;

        if (SNU_MAIL_REGEX.test(email)) {
          onSnuEmailSuccess(email, variables.token);
        } else {
          toVerifyEmail({
            body: { token: variables.token, authProvider: 'GOOGLE' },
          });
        }
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '회원가입에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    checkGoogleMail,
    isPending,
  };
};

const useGoogleSignUp = ({
  setResponseMessage,
  setShowModal,
}: {
  setResponseMessage(input: string): void;
  setShowModal(input: 'NONE' | 'ADD' | 'REDIRECT'): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const { toSignUpComplete } = useRouteNavigation();

  const { mutate: googleSignUp, isPending } = useMutation({
    mutationFn: ({ snuMail, token }: { snuMail: string; token: string }) => {
      return authService.signUp({
        authType: 'SOCIAL_NORMAL',
        info: {
          type: 'SOCIAL_NORMAL',
          provider: 'google',
          snuMail,
          token,
        },
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        if (response.data.user.isMerged) {
          setShowModal('ADD');
          return;
        }
        toSignUpComplete();
      } else {
        if (response.code === 'USER-003') {
          setShowModal('REDIRECT');
        }
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '회원가입에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return { googleSignUp, isPending };
};
