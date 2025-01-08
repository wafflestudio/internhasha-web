import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/button';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const GoogleSocialSignUpButton = () => {
  const [responseMessage, setResponseMessage] = useState<string | undefined>(
    undefined,
  );
  const [googleMail, setGoogleMail] = useState<string | null>(null);

  const { checkGoogleMail, isPending: isPendingCheckMail } = useCheckGoogleMail(
    {
      setGoogleMail,
      setResponseMessage,
      onSnuEmailSuccess: (email, token) => {
        googleSignUp({ snuMail: email, token });
      },
    },
  );

  const { googleSignUp, isPending: isPendingSignUp } = useGoogleSignUp({
    setResponseMessage,
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
      <Button onClick={handleClickGoogleSignUpButton} disabled={isPending}>
        구글 계정으로 가입하기 🚀
      </Button>
      {responseMessage !== undefined && (
        <div>
          <span>{responseMessage}</span>
        </div>
      )}
      {googleMail !== null && (
        <div>
          <span>확인된 이메일: {googleMail}</span>
        </div>
      )}
    </div>
  );
};

const useCheckGoogleMail = ({
  setGoogleMail,
  setResponseMessage,
  onSnuEmailSuccess,
}: {
  setGoogleMail(input: string | null): void;
  setResponseMessage(input: string): void;
  onSnuEmailSuccess(email: string, token: string): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@snu\.ac\.kr$/;

  const { toVerifyEmail } = useRouteNavigation();

  const { mutate: checkGoogleMail, isPending } = useMutation({
    mutationFn: ({ token }: { token: string }) => {
      return authService.checkGoogleEmail({ token });
    },
    onSuccess: (response, variables) => {
      if (response.type === 'success') {
        const email = response.data.googleEmail;
        setGoogleMail(email);

        if (EMAIL_REGEX.test(email)) {
          onSnuEmailSuccess(email, variables.token);
        } else {
          toVerifyEmail({ token: variables.token, authProvider: 'GOOGLE' });
        }
      } else {
        setGoogleMail(null);
        setResponseMessage(response.message);
      }
    },
    onError: () => {
      setGoogleMail(null);
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
}: {
  setResponseMessage(input: string): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const { toSignUpComplete } = useRouteNavigation();

  const { mutate: googleSignUp, isPending } = useMutation({
    mutationFn: ({ snuMail, token }: { snuMail: string; token: string }) => {
      return authService.googleSignUp({
        snuMail,
        googleAccessToken: token,
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toSignUpComplete();
      } else {
        setResponseMessage(response.message);
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
