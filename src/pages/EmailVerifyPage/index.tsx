import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { Button } from '@/components/button';
import { SubmitButton } from '@/components/button';
import { FormContainer } from '@/components/form';
import { TextInput } from '@/components/input';
import { LabelContainer } from '@/components/input/LabelContainer';
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

  const handleClickSendEmailCodeButton = () => {
    setShowCodeInput(true);
  };

  const handleClickEmailVerifyButton = () => {};

  const onSubmit = () => {
    if (email.isError || code.isError) return;
    emailVerify({ email: email.value, token });
  };

  return (
    <div>
      <h1>이메일 인증하기</h1>
      <FormContainer
        id="EmailVerifyForm"
        handleSubmit={onSubmit}
        response={responseMessage}
      >
        <LabelContainer label="이메일" id="email" isError={email.isError}>
          <TextInput
            id="email"
            value={email.value}
            onChange={(e) => {
              email.onChange(e.target.value);
            }}
            disabled={isPending}
          />
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleClickSendEmailCodeButton();
            }}
            disabled={isPending}
          >
            인증코드 받기
          </Button>
        </LabelContainer>
        {showCodeInput && (
          <>
            <LabelContainer label="인증 코드" id="code" isError={code.isError}>
              <TextInput
                id="code"
                value={code.value}
                onChange={(e) => {
                  code.onChange(e.target.value);
                }}
                disabled={isPending}
              />
            </LabelContainer>
            <Button
              onClick={(event) => {
                event.preventDefault();
                handleClickEmailVerifyButton();
              }}
              disabled={isPending}
            >
              인증코드 확인
            </Button>
          </>
        )}
        <SubmitButton form="EmailVerifyForm" disabled={isPending}>
          회원가입 완료
        </SubmitButton>
      </FormContainer>
    </div>
  );
};

const useEmailVerify = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: emailVerify, isPending } = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) => {
      return authService.socialSignUp({
        email: `${email}@snu.ac.kr`,
        token,
        authProvider: 'GOOGLE',
      });
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
