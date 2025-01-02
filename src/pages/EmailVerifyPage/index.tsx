import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router';

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
      <FormContainer
        id="EmailVerifyForm"
        handleSubmit={onSubmit}
        disabled={isPending}
        response={responseMessage}
        buttonDescription="회원가입 완료하기"
      >
        <LabelContainer
          label="이메일"
          id="email"
          isError={email.isError}
          description="snu.ac.kr로 끝나는 메일을 작성해주세요."
        >
          <TextInput
            id="email"
            value={email.value}
            onChange={(e) => {
              email.onChange(e.target.value);
            }}
            placeholder="스누 메일을 입력하세요"
            disabled={isPending}
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              handleClickEmailVerifyButton();
            }}
            disabled={isPending}
          >
            이메일 인증하기
          </button>
        </LabelContainer>
        <LabelContainer
          label="인증 코드"
          id="code"
          isError={code.isError}
          description="유효하지 않은 인증코드입니다."
        >
          {showCodeInput && (
            <TextInput
              id="code"
              value={code.value}
              onChange={(e) => {
                code.onChange(e.target.value);
              }}
              placeholder="이메일 인증 코드를 입력하세요"
              disabled={isPending}
            />
          )}
        </LabelContainer>
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
