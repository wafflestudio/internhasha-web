import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

import { Button } from '@/components/button';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const GoogleSocialSignUpButton = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const { toVerifyEmail } = useRouteNavigation();

  const popupGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const token = credentialResponse.access_token;
      toVerifyEmail({ token, authProvider: 'GOOGLE' });
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
      <Button onClick={handleClickGoogleSignUpButton}>
        구글 계정으로 가입하기 🚀
      </Button>
      {error !== undefined && (
        <div>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
