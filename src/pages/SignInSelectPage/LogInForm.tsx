import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { SubmitButton } from '@/components/button';
import { FormContainer } from '@/components/form';
import { TextInput } from '@/components/input';
import { LabelContainer } from '@/components/input/LabelContainer';
import { authPresentation } from '@/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LocalLogInForm = () => {
  const { localSignIn, responseMessage, isPending } = useLocalSignIn();
  const { localId, password } = authPresentation.useValidator();

  const onSubmit = () => {
    if (!localId.isError && !password.isError) {
      localSignIn({
        localId: localId.value,
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
        response={responseMessage}
      >
        <LabelContainer label="아이디" id="localId">
          <TextInput
            id="localId"
            value={localId.value}
            onChange={(e) => {
              localId.onChange(e.target.value);
            }}
            placeholder="아이디를 입력하세요"
            disabled={isPending}
          />
        </LabelContainer>
        <LabelContainer label="비밀번호" id="password">
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
        <SubmitButton form="SignInForm" disabled={isPending}>
          로그인
        </SubmitButton>
      </FormContainer>
    </div>
  );
};

const useLocalSignIn = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: localSignIn, isPending } = useMutation({
    mutationFn: ({
      localId,
      password,
    }: {
      localId: string;
      password: string;
    }) => {
      return authService.localSignIn({ localId, password });
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

  return { localSignIn, responseMessage, isPending };
};
