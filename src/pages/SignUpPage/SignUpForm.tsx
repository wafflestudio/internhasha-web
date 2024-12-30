import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/hooks';

export const SignUpForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { LocalSignUp, responseMessage, isPending } = useSignUp();

  const onSubmit = () => {
    if (password !== '' && id !== '') {
      LocalSignUp({ id, password });
    }
  };
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>회원가입하기</h1>
      <form
        id="signInForm"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <input
          id="id"
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디를 입력하세요"
          disabled={isPending}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호를 입력하세요"
          disabled={isPending}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
        <button
          type="submit"
          form="signInForm"
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          disabled={isPending}
        >
          Send
        </button>
      </form>
      <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
        <strong>Response:</strong> {responseMessage}
      </div>
    </div>
  );
};

const useSignUp = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: LocalSignUp, isPending } = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) => {
      return authService.localSignIn({ id, password });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        // TODO: 토큰 저장
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

  return { LocalSignUp, responseMessage, isPending };
};
