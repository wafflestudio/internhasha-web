import { useState } from 'react';

import { useRouteNavigation } from '@/shared/route/hooks';

export const LandingPage = () => {
  const { toEcho } = useRouteNavigation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { googleSignIn, responseMessage, isPending } = useLogin();

  const onSubmit = () => {
    if (password !== '' && id !== '') {
      googleSignIn();
    }
  };

  return (
    <div>
      <p>랜딩 페이지입니다.</p>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Echo Message</h1>
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
      <button onClick={toEcho}>에코 페이지로 이동</button>
    </div>
  );
};

const useLogin = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: ({ accessToken }: { accessToken: string }) => {
      return authService.googleSignIn({ accessToken });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage(
          '로그인에 실패했습니다. 잠시 후에 다시 실행해주세요.',
        );
      }
    },
    onError: () => {
      setResponseMessage('로그인에 실패했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });

  return { signIn, responseMessage, isPending };
};
