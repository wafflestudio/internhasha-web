import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { FormContainer } from '@/components/form/FormContainer';
import { LabelContainer } from '@/components/label/LabelContainer';
import { ProgressBar } from '@/components/progressBar/ProgressBar';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createErrorMessage } from '@/entities/errors';
import type { VerifyMailRouteQuery } from '@/entities/route';
import { authFormPresentation } from '@/feature/auth/presentation/authFormPresentation';
import { authInputPresentation } from '@/feature/auth/presentation/authInputPresentation';
import { RedirectSignInModal } from '@/feature/auth/ui/signUp/RedirectSignInModal';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { PATH } from '@/shared/route/constants';
import { RouteNavigator } from '@/shared/route/RouteNavigator';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useRouteLocation } from '@/shared/route/useRouteParams';
import { formatNumberToTime } from '@/util/format';

export const EmailVerifyForm = () => {
  const body = useRouteLocation() as VerifyMailRouteQuery | null;

  const { toSignUp } = useRouteNavigation();
  const [showSendCodeError, setShowSendCodeError] = useState(false);
  const [showModal, setShowModal] = useState<'NONE' | 'REDIRECT'>('NONE');
  const { inputStates, formStates } = authFormPresentation.useValidator({
    authInputPresentation,
  });
  const { snuMailPrefix, code } = inputStates;

  const {
    sendCode,
    sendSuccess,
    isCodeExpired,
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
    localSignUp,
    responseMessage: localSignUpResponseMessage,
    isPending: isPendingLocalSignUp,
  } = useLocalSignUp({ setShowModal });

  const sendCodeDisable = snuMailPrefix.isError;
  const verifyEmailDisable =
    snuMailPrefix.isError || !sendSuccess || code.isError || verifySuccess;
  const signUpDisable =
    snuMailPrefix.isError || code.isError || !verifySuccess || isCodeExpired;

  const isPending = isPendingSend || isPendingVerify || isPendingLocalSignUp;

  if (body === null) {
    return <RouteNavigator link={PATH.SIGN_IN} />;
  }

  const handleClickSendEmailCodeButton = () => {
    if (sendCodeDisable) {
      setShowSendCodeError(true);
      return;
    }
    sendCode({ snuMail: formStates.snuMail.value });
  };

  const handleClickVerifyEmailButton = () => {
    if (verifyEmailDisable) return;
    emailVerify({
      snuMail: formStates.snuMail.value,
      code: formStates.code.value,
    });
  };

  const onSubmit = () => {
    if (signUpDisable) return;
    localSignUp({
      snuMail: formStates.snuMail.value,
      password: body.password,
      username: body.username,
    });
  };

  const hanldeClickPreviousButton = () => {
    toSignUp({ body });
  };

  return (
    <>
      <FormContainer id="EmailVerifyForm" handleSubmit={onSubmit}>
        <ProgressBar totalProgress={2} present={2} />
        <LabelContainer label="이메일" id="email">
          <div className="flex items-center gap-2">
            <div className="relative flex w-full items-center gap-1">
              <Input
                id="email"
                value={snuMailPrefix.value}
                onChange={(e) => {
                  snuMailPrefix.onChange(e.target.value);
                }}
                placeholder="마이스누 아이디"
                disabled={isPending}
              />
              <span className="absolute right-[8px] top-[11px] text-sm text-grey-300">
                @snu.ac.kr
              </span>
            </div>
            {!verifySuccess && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleClickSendEmailCodeButton();
                }}
                disabled={isPending || sendCodeDisable}
              >
                인증코드 받기
              </Button>
            )}
          </div>
          {showSendCodeError && snuMailPrefix.isError && (
            <div>유효하지 않은 스누메일입니다.</div>
          )}
          <div>{codeResponseMessage}</div>
        </LabelContainer>
        {sendSuccess && (
          <>
            <LabelContainer label="인증 코드" id="code">
              <div className="relative flex gap-2">
                <Input
                  id="code"
                  value={code.value}
                  placeholder="인증코드"
                  onChange={(e) => {
                    code.onChange(e.target.value);
                  }}
                  disabled={isPending}
                />
                {timeLeft !== null && !verifySuccess && (
                  <div className="absolute left-[210px] top-[9px]">
                    <FormErrorResponse>
                      {formatNumberToTime({ time: timeLeft })}
                    </FormErrorResponse>
                  </div>
                )}
                {!verifySuccess && !isCodeExpired && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleClickVerifyEmailButton();
                    }}
                    disabled={isPending || verifyEmailDisable}
                  >
                    인증코드 확인
                  </Button>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {verifySuccess && (
                  <FormInfoResponse>인증 성공</FormInfoResponse>
                )}
                {!verifySuccess && isCodeExpired && (
                  <FormErrorResponse>
                    인증코드가 만료되었습니다.
                  </FormErrorResponse>
                )}
                {!verifySuccess && (
                  <FormErrorResponse>{emailResponseMessage}</FormErrorResponse>
                )}
              </div>
            </LabelContainer>
          </>
        )}
        {sendSuccess && (
          <p className="text-center">
            <span className="text-grey-300">인증코드가 오지 않았다면? </span>
            <a
              onClick={handleClickSendEmailCodeButton}
              className="underline-offset-4 hover:cursor-pointer hover:underline"
            >
              재발송
            </a>
          </p>
        )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={hanldeClickPreviousButton}
            className="flex-1"
          >
            이전
          </Button>
          <Button
            form="EmailVerifyForm"
            disabled={isPending}
            onSubmit={onSubmit}
            className="flex-1"
          >
            회원가입 완료
          </Button>
        </div>
        {localSignUpResponseMessage !== '' && (
          <FormErrorResponse>{localSignUpResponseMessage}</FormErrorResponse>
        )}
      </FormContainer>
      {showModal === 'REDIRECT' && <RedirectSignInModal />}
    </>
  );
};

const useSendCode = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isCodeExpired, setIsCodeExpired] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const TIME_OUT = 180;

  const startTimer = () => {
    stopTimer();
    setTimeLeft(TIME_OUT);
    setIsCodeExpired(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          stopTimer();
          setIsCodeExpired(true);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
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
        setSendSuccess(true);
        startTimer();
      } else {
        stopTimer();
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '코드 전송에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
      setSendSuccess(false);
      stopTimer();
    },
  });

  return {
    sendCode,
    sendSuccess,
    isCodeExpired,
    timeLeft,
    responseMessage,
    isPending,
  };
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
        setResponseMessage(createErrorMessage(response.code));
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

const useLocalSignUp = ({
  setShowModal,
}: {
  setShowModal(input: 'NONE' | 'REDIRECT'): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toSignUpComplete } = useRouteNavigation();

  const { mutate: localSignUp, isPending } = useMutation({
    mutationFn: ({
      snuMail,
      username,
      password,
    }: {
      snuMail: string;
      username: string;
      password: string;
    }) => {
      return authService.signUp({
        name: username,
        mail: snuMail,
        password,
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toSignUpComplete();
      } else {
        if (response.code === 'USER_001' || response.code === 'USER_002') {
          setShowModal('REDIRECT');
          return;
        }
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '회원가입에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return { localSignUp, responseMessage, isPending };
};
