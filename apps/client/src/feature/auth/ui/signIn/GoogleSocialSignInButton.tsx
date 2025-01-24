import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { FormErrorResponse } from '@/components/response/formError';
import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import { createErrorMessage } from '@/entities/errors';
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
    <div className="w-full">
      <Button
        onClick={handleClickGoogleSignUpButton}
        disabled={isPending}
        variant="outline"
        className="w-full"
      >
        <img src={ICON_SRC.GOOGLE} />
        구글 계정으로 간편 로그인
      </Button>
      {error !== undefined && (
        <div>
          <span>{error}</span>
        </div>
      )}
      {responseMessage !== '' && (
        <div className="text-red-500 text-sm mt-2">
          <FormErrorResponse>
            {createErrorMessage(responseMessage)}
          </FormErrorResponse>
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
      return authService.signIn({
        authType: 'SOCIAL',
        info: {
          type: 'SOCIAL',
          provider: 'google',
          token,
        },
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toMain();
      } else {
        setResponseMessage(response.code);
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
