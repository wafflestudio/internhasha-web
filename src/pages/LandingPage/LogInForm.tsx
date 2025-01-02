import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { FormContainer } from '@/components/form';
import { TextInput } from '@/components/input';
import { LabelContainer } from '@/components/input/LabelContainer';
import { authPresentation } from '@/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LogInForm = () => {
  const { LocalSignIn, responseMessage, isPending } = useSignIn();
  const { email, password } = authPresentation.useValidator();

  const onSubmit = () => {
    if (!email.isError && !password.isError) {
      LocalSignIn({
        email: email.value,
        password: password.value,
      });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>로그인하기</h1>
      <FormContainer
        id="SignInForm"
        handleSubmit={onSubmit}
        disabled={isPending}
        response={responseMessage}
        buttonDescription="로그인"
      >
        <LabelContainer
          label="이메일"
          id="email"
          isError={email.isError}
          description="아이디는 4~20자리이며 영문 대소문자 또는 숫자 또는 -, _를 사용할 수 있습니다."
        >
          <TextInput
            id="email"
            value={email.value}
            onChange={(e) => {
              email.onChange(e.target.value);
            }}
            placeholder="아이디를 입력하세요"
            disabled={isPending}
          />
        </LabelContainer>
        <LabelContainer
          label="비밀번호"
          id="password"
          isError={password.isError}
          description="비밀번호는 8~20자리이며 영문 대소문자, 숫자, 특수문자(@#$!^*) 중 하나를 반드시 포함해야 합니다."
        >
          <TextInput
            id="password"
            type="password"
            value={password.value}
            onChange={(e) => {
              password.onChange(e.target.value);
            }}
            placeholder="비밀번호를 입력하세요"
            disabled={isPending}
          />
        </LabelContainer>
      </FormContainer>
    </div>
  );
};

const useSignIn = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: LocalSignIn, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return authService.localSignIn({ email, password });
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

  return { LocalSignIn, responseMessage, isPending };
};
