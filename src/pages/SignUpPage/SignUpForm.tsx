import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { authPresentation } from '@/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/hooks';

export const SignUpForm = () => {
  const { LocalSignUp, responseMessage, isPending } = useSignUp();
  const { input: id } = authPresentation.useIdValidator();
  const { input: password } = authPresentation.usePasswordValidator();

  const onSubmit = () => {
    if (!id.isError && !password.isError) {
      LocalSignUp({ id: id.value, password: password.value });
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
          value={id.value}
          onChange={(e) => {
            id.onChange(e.target.value);
          }}
          placeholder="아이디를 입력하세요"
          disabled={isPending}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
        {id.isError && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: 'black' }}>
            <strong>
              아이디는 4~20자리이며 영문 대소문자 또는 숫자 또는 -, _를 사용할
              수 있습니다.
            </strong>
          </div>
        )}
        <input
          id="password"
          type="password"
          value={password.value}
          onChange={(e) => {
            password.onChange(e.target.value);
          }}
          placeholder="비밀번호를 입력하세요"
          disabled={isPending}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
        {password.isError && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: 'black' }}>
            <strong>
              비밀번호는 8~20자리이며 영문 대소문자, 숫자, 특수문자(@#$!^*) 중
              하나를 반드시 포함해야 합니다.
            </strong>
          </div>
        )}
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
