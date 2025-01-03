import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/button';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const GoogleSocialSignInButton = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const { googleSignIn, responseMessage, isPending } = useGoogleSignIn();

  const popupGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const token = credentialResponse.access_token;
      googleSignIn({ token });
    },
    onError: (errorResponse) => {
      setError(errorResponse.error_description);
    },
  });

  const handleClickGoogleSignUpButton = () => {
    popupGoogle();
  };

  return (
    <div>
      <Button onClick={handleClickGoogleSignUpButton} disabled={isPending}>
        구글 계정으로 로그인하기 🚀
      </Button>
      {error !== undefined && (
        <div>
          <span>{error}</span>
        </div>
      )}
      {responseMessage !== '' && (
        <div>
          <span>{responseMessage}</span>
        </div>
      )}
    </div>
  );
};

const useGoogleSignIn = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: googleSignIn, isPending } = useMutation({
    mutationFn: ({ token }: { token: string }) => {
      const body = {
        token,
        authProvider: 'GOOGLE',
      };
      return authService.socialSignIn(body);
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toMain();
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

  return { googleSignIn, responseMessage, isPending };
};
