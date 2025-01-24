import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router';

import { FormContainer } from '@/components/form';
import { LabelContainer } from '@/components/input/LabelContainer';
import { ProgressBar } from '@/components/progressBar/ProgressBar';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createErrorMessage } from '@/entities/errors';
import { authPresentation } from '@/feature/auth/presentation/authPresentation';
import {
  AddGoogleSignUpModal,
  AddLocalSignUpModal,
  RedirectSignInModal,
} from '@/feature/auth/ui/signUp/AddSignUpModal';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { formatNumberToTime } from '@/util/format';

type VerifyMailBody =
  | {
      authProvider: 'GOOGLE';
      token: string;
    }
  | {
      authProvider: 'LOCAL';
      localId: string;
      password: string;
      username: string;
    };

type EmailVerifyLocationState = {
  body: VerifyMailBody;
};

export const EmailVerifyForm = () => {
  const location = useLocation();
  const state = location.state as EmailVerifyLocationState | undefined;

  const { toSignUpLocal, toSignUpSelect } = useRouteNavigation();
  const [showSendCodeError, setShowSendCodeError] = useState(false);
  const [showModal, setShowModal] = useState<'NONE' | 'ADD' | 'REDIRECT'>(
    'NONE',
  );
  const { snuMail, code } = authPresentation.useValidator({});
  const {
    sendCode,
    sendSuccess,
    isCodeExpired,
    timeLeft,
    responseMessage: codeResponseMessage,
    isPending: isPendingSend,
  } = useSendCode({ setShowModal });
  const {
    emailVerify,
    verifySuccess,
    responseMessage: emailResponseMessage,
    isPending: isPendingVerify,
  } = useEmailVerify({ setShowModal });
  const {
    googleSignUp,
    responseMessage: googleSignUpResponseMessage,
    isPending: isPendingGoogleSignup,
  } = useGoogleSignUp({ setShowModal });
  const {
    localSignUp,
    responseMessage: localSignUpResponseMessage,
    isPending: isPendingLocalSignUp,
  } = useLocalSignUp({ setShowModal });

  const sendCodeDisable = snuMail.isError;
  const verifyEmailDisable =
    snuMail.isError || !sendSuccess || code.isError || verifySuccess;
  const signUpDisable =
    snuMail.isError || code.isError || !verifySuccess || isCodeExpired;

  const isPending =
    isPendingSend ||
    isPendingVerify ||
    isPendingGoogleSignup ||
    isPendingLocalSignUp;

  if (state === undefined) {
    return <div>유효하지 않은 접근입니다.</div>;
  }
  const { body } = state;

  const handleClickSendEmailCodeButton = () => {
    if (sendCodeDisable) {
      setShowSendCodeError(true);
      return;
    }

    sendCode({ snuMail: snuMail.postfix });
  };

  const handleClickVerifyEmailButton = () => {
    if (verifyEmailDisable) return;
    emailVerify({ snuMail: snuMail.postfix, code: code.value });
  };

  const onSubmit = () => {
    if (signUpDisable) return;
    if (body.authProvider === 'GOOGLE') {
      googleSignUp({
        snuMail: snuMail.postfix,
        token: body.token,
      });
    }
    if (body.authProvider === 'LOCAL') {
      localSignUp({
        snuMail: snuMail.postfix,
        localId: body.localId,
        password: body.password,
        username: body.username,
      });
    }
  };

  const hanldeClickPreviousButton = () => {
    if (body.authProvider === 'LOCAL') {
      toSignUpLocal({ body });
      return;
    }
    toSignUpSelect();
  };

  return (
    <>
      <FormContainer
        id="EmailVerifyForm"
        handleSubmit={onSubmit}
        response={
          body.authProvider === 'LOCAL'
            ? localSignUpResponseMessage
            : googleSignUpResponseMessage
        }
      >
        {body.authProvider === 'LOCAL' && (
          <ProgressBar totalProgress={2} present={2} />
        )}
        <LabelContainer label="이메일" id="email">
          <div className="flex relative gap-2 items-center">
            <div className="flex gap-1 items-center">
              <Input
                id="email"
                value={snuMail.value}
                onChange={(e) => {
                  snuMail.onChange(e.target.value);
                }}
                placeholder="마이스누 아이디"
                disabled={isPending}
              />
              <span className="text-grey-dark">@snu.ac.kr</span>
            </div>
            {!verifySuccess && (
              <Button
                onClick={handleClickSendEmailCodeButton}
                disabled={isPending || sendCodeDisable}
              >
                인증코드 받기
              </Button>
            )}
          </div>
          {showSendCodeError && snuMail.isError && (
            <div>유효하지 않은 스누메일입니다.</div>
          )}
          <div>{codeResponseMessage}</div>
        </LabelContainer>
        {sendSuccess && (
          <>
            <LabelContainer label="인증 코드" id="code">
              <div className="flex relative gap-2">
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
                  <div className="absolute top-[9px] left-[210px]">
                    <FormErrorResponse>
                      {formatNumberToTime({ time: timeLeft })}
                    </FormErrorResponse>
                  </div>
                )}
                {!verifySuccess && !isCodeExpired && (
                  <Button
                    onClick={handleClickVerifyEmailButton}
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
                <FormErrorResponse>{emailResponseMessage}</FormErrorResponse>
              </div>
            </LabelContainer>
          </>
        )}
        {sendSuccess && (
          <p className="text-center">
            <span className="text-grey-normal">인증코드가 오지 않았다면? </span>
            <a
              onClick={handleClickSendEmailCodeButton}
              className=" underline-offset-4 hover:cursor-pointer hover:underline"
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
          <FormErrorResponse>
            {createErrorMessage(localSignUpResponseMessage)}
          </FormErrorResponse>
        )}
        {googleSignUpResponseMessage !== '' && (
          <FormErrorResponse>
            {createErrorMessage(googleSignUpResponseMessage)}
          </FormErrorResponse>
        )}
      </FormContainer>
      {showModal === 'ADD' && body.authProvider === 'GOOGLE' && (
        <AddGoogleSignUpModal />
      )}
      {showModal === 'ADD' && body.authProvider === 'LOCAL' && (
        <AddLocalSignUpModal />
      )}
      {showModal === 'REDIRECT' && <RedirectSignInModal />}
    </>
  );
};

const useSendCode = ({
  setShowModal,
}: {
  setShowModal(input: 'NONE' | 'ADD' | 'REDIRECT'): void;
}) => {
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
        if (response.code === 'USER_001') {
          setShowModal('ADD');
          return;
        }
        setResponseMessage(response.code);
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

const useEmailVerify = ({
  setShowModal,
}: {
  setShowModal(input: 'NONE' | 'ADD' | 'REDIRECT'): void;
}) => {
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
        if (response.code === 'USER_001') {
          setShowModal('ADD');
          return;
        }
        setResponseMessage(response.code);
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

const useGoogleSignUp = ({
  setShowModal,
}: {
  setShowModal(input: 'NONE' | 'ADD' | 'REDIRECT'): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toSignUpComplete } = useRouteNavigation();

  const { mutate: googleSignUp, isPending } = useMutation({
    mutationFn: ({ snuMail, token }: { snuMail: string; token: string }) => {
      return authService.signUp({
        authType: 'SOCIAL_NORMAL',
        info: {
          type: 'SOCIAL_NORMAL',
          provider: 'google',
          snuMail,
          token,
        },
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toSignUpComplete();
      } else {
        if (response.code === 'USER_001') {
          setShowModal('ADD');
          return;
        }
        if (response.code === 'USER-003') {
          setShowModal('REDIRECT');
          return;
        }
        setResponseMessage(response.code);
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

const useLocalSignUp = ({
  setShowModal,
}: {
  setShowModal(input: 'NONE' | 'ADD' | 'REDIRECT'): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toSignUpComplete } = useRouteNavigation();

  const { mutate: localSignUp, isPending } = useMutation({
    mutationFn: ({
      snuMail,
      username,
      localId,
      password,
    }: {
      snuMail: string;
      username: string;
      localId: string;
      password: string;
    }) => {
      return authService.signUp({
        authType: 'LOCAL_NORMAL',
        info: {
          type: 'LOCAL_NORMAL',
          name: username,
          snuMail,
          localLoginId: localId,
          password,
        },
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toSignUpComplete();
      } else {
        if (response.code === 'USER_001') {
          setShowModal('ADD');
          return;
        }
        if (response.code === 'USER_002') {
          setShowModal('REDIRECT');
          return;
        }
        setResponseMessage(response.code);
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
