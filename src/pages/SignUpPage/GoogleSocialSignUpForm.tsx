import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export const GoogleSocialSignUpForm = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const popupGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      setToken(credentialResponse.access_token);
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
