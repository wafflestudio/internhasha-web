import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { authPresentation } from '@/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LocalSignUpForm = () => {
  const { LocalSignUp, responseMessage, isPending } = useSignUp();
  const { email, password, name, phoneNumber } =
    authPresentation.useValidator();

  const onSubmit = () => {
    if (
      !email.isError &&
      !password.isError &&
      !name.isError &&
      !phoneNumber.isError
    ) {
      LocalSignUp({
        name: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      });
    }
  };
  return (
    <div>
      <form
        id="signUpForm"
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
        <input
          id="name"
          type="text"
          value={name.value}
          onChange={(e) => {
            name.onChange(e.target.value);
          }}
          placeholder="아이디를 입력하세요"
          disabled={isPending}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
        {name.isError && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: 'black' }}>
            <strong>
              아이디는 4~20자리이며 영문 대소문자 또는 숫자 또는 -, _를 사용할
              수 있습니다.
            </strong>
          </div>
        )}
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber.value}
          onChange={(e) => {
            phoneNumber.onChange(e.target.value);
          }}
          placeholder="전화번호를 입력하세요"
          disabled={isPending}
          style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        />
        {phoneNumber.isError && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: 'black' }}>
            <strong>전화번호는 010-1111-1111의 형태로 작성해주세요.</strong>
          </div>
        )}
        <button
          type="submit"
          form="signUpForm"
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          disabled={isPending}
        >
          회원가입하기
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
    mutationFn: ({
      name,
      email,
      phoneNumber,
      password,
    }: {
      name: string;
      email: string;
      password: string;
      phoneNumber: string;
    }) => {
      return authService.localSignUp({ name, email, phoneNumber, password });
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

  return { LocalSignUp, responseMessage, isPending };
};
