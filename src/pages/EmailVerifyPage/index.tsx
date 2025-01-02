import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { authPresentation } from '@/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

type EmailVerifyLocationState = {
  token: string;
};

export const EmailVerifyPage = () => {
  const location = useLocation();
  const state = location.state as EmailVerifyLocationState;
  const token = state.token;

  const [showCodeInput, setShowCodeInput] = useState(false);
  const { email, code } = authPresentation.useValidator();
  const { emailVerify, responseMessage, isPending } = useEmailVerify();

  const handleClickEmailVerifyButton = () => {
    setShowCodeInput(true);
  };

  const onSubmit = () => {
    if (email.isError || code.isError) return;
    emailVerify({ email: email.value, token });
  };

  return (
    <div>
      <h1>이메일 인증</h1>
      <form
        id="EmailVerifyForm"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <input
          id="email"
          type="text"
          value={email.value}
          onChange={(e) => {
            email.onChange(e.target.value);
          }}
          placeholder="스누 메일을 입력하세요"
          disabled={isPending}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
        {email.isError && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: 'black' }}>
            <strong>snu.ac.kr로 끝나는 메일을 작성해주세요.</strong>
          </div>
        )}
        <button
          onClick={(event) => {
            event.preventDefault();
            handleClickEmailVerifyButton();
          }}
          disabled={isPending}
        >
          이메일 인증하기
        </button>
        {showCodeInput && (
          <input
            id="code"
            type="text"
            value={code.value}
            onChange={(e) => {
              code.onChange(e.target.value);
            }}
            placeholder="인증 코드를 입력하세요"
            disabled={isPending}
            style={{ padding: '10px', width: '300px', fontSize: '16px' }}
          />
        )}
        <button
          type="submit"
          form="EmailVerifyForm"
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          disabled={isPending}
        >
          회원 가입하기
        </button>
      </form>

      {responseMessage !== '' && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
          <strong>Response:</strong> {responseMessage}
        </div>
      )}
    </div>
  );
};

const useEmailVerify = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: emailVerify, isPending } = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) => {
      return authService.socialSignUp({ email, token, authProvider: 'GOOGLE' });
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

  return { emailVerify, responseMessage, isPending };
};
