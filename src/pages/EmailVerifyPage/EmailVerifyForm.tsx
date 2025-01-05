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

export const EmailVerifyForm = () => {
  const location = useLocation();
  const state = location.state as EmailVerifyLocationState;
  const token = state.token;

  const { email, code } = authPresentation.useValidator();
  const {
    sendCode,
    showCodeInput,
    timeLeft,
    responseMessage: codeResponseMessage,
    isPending: isPendingSend,
  } = useSendCode();
  const {
    emailVerify,
    verifySuccess,
    responseMessage: emailResponseMessage,
    isPending: isPendingVerify,
  } = useEmailVerify();
  const {
    googleSignUp,
    responseMessage: signUpResponseMessage,
    isPending: isPendingSignup,
  } = useGoogleSignUp();

  const isPending = isPendingSend || isPendingVerify || isPendingSignup;

  const handleClickSendEmailCodeButton = () => {
    if (email.isError) return;
    sendCode({ snuMail: email.value });
  };

  const handleClickVerifyEmailButton = () => {
    if (email.isError || code.isError) return;
    emailVerify({ snuMail: email.value, code: code.value });
  };

  const onSubmit = () => {
    if (email.isError || code.isError || !verifySuccess) return;
    googleSignUp({ snuMail: email.value, token });
  };

  return (
    <FormContainer
      id="EmailVerifyForm"
      handleSubmit={onSubmit}
      response={signUpResponseMessage}
    >
      <LabelContainer
        label="이메일"
        id="email"
        isError={email.isError}
        description={codeResponseMessage}
      >
        <TextInput
          id="email"
          value={email.value}
          onChange={(e) => {
            email.onChange(e.target.value);
          }}
          disabled={isPending}
        />
        <Button onClick={handleClickSendEmailCodeButton} disabled={isPending}>
          인증코드 받기
        </Button>
      </LabelContainer>
      {showCodeInput && (
        <>
          <LabelContainer
            label="인증 코드"
            id="code"
            isError={code.isError}
            description={emailResponseMessage}
          >
            <TextInput
              id="code"
              value={code.value}
              onChange={(e) => {
                code.onChange(e.target.value);
              }}
              disabled={isPending}
            />
            <div>{timeLeft}</div>
            <Button onClick={handleClickVerifyEmailButton} disabled={isPending}>
              인증코드 확인
            </Button>
          </LabelContainer>
        </>
      )}
      <SubmitButton
        form="EmailVerifyForm"
        disabled={isPending}
        onSubmit={onSubmit}
      >
        회원가입 완료
      </SubmitButton>
    </FormContainer>
  );
};

const useSendCode = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  let timer: NodeJS.Timeout | null = null;

  const startTimer = () => {
    setTimeLeft(300);

    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          if (timer !== null) {
            clearInterval(timer);
          }
          timer = null;
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    setTimeLeft(null);
  };

  const { mutate: sendCode, isPending } = useMutation({
    mutationFn: ({ snuMail }: { snuMail: string }) => {
      return authService.sendEmailCode({
        snuMail,
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setShowCodeInput(true);
        stopTimer();
        startTimer();
      } else {
        console.log(response);
        setResponseMessage(response.message);
        setShowCodeInput(false);
        stopTimer();
      }
    },
    onError: () => {
      setResponseMessage(
        '코드 전송에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
      setShowCodeInput(false);
      stopTimer();
    },
  });

  return { sendCode, showCodeInput, timeLeft, responseMessage, isPending };
};

const useEmailVerify = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const [verifySuccess, setVerifySuccess] = useState(false);

  const { mutate: emailVerify, isPending } = useMutation({
    mutationFn: ({ snuMail, code }: { snuMail: string; code: string }) => {
      return authService.verifyCode({
        snuMail,
        code,
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setVerifySuccess(true);
      } else {
        setResponseMessage(response.message);
        setVerifySuccess(false);
      }
    },
    onError: () => {
      setResponseMessage(
        '이메일 인증에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
      setVerifySuccess(false);
    },
  });

  return { emailVerify, verifySuccess, responseMessage, isPending };
};

const useGoogleSignUp = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: googleSignUp, isPending } = useMutation({
    mutationFn: ({ snuMail, token }: { snuMail: string; token: string }) => {
      return authService.googleSignUp({
        snuMail,
        googleAccessToken: token,
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

  return { googleSignUp, responseMessage, isPending };
};
