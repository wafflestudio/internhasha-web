import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const GoogleSocialSignUpForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const { toVerifyEmail } = useRouteNavigation();

  const popupGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const token = credentialResponse.access_token;
      toVerifyEmail({ token });
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
      <button onClick={handleClickGoogleSignUpButton}>
        구글 계정으로 가입하기 🚀
      </button>
      {error !== undefined && (
        <div>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
