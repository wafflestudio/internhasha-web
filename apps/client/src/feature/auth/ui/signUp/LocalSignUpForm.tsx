import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { FormContainer } from '@/components/form';
import { LabelContainer } from '@/components/input/LabelContainer';
import { ProgressBar } from '@/components/progressBar/ProgressBar';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ICON_SRC } from '@/entities/asset';
import { createErrorMessage } from '@/entities/errors';
import { authPresentation } from '@/feature/auth/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

type PreviousForm = {
  authProvider: 'LOCAL';
  localId: string;
  password: string;
  username: string;
};

type LocalSignUpInitialBody = {
  body: PreviousForm | undefined;
};

export const LocalSignUpForm = () => {
  const location = useLocation();
  const state = location.state as LocalSignUpInitialBody | null;

  const { toVerifyEmail } = useRouteNavigation();
  const { password, passwordConfirm, localId, username } =
    authPresentation.useValidator({ initialState: state?.body });
  const [localIdCheckSuccess, setLocalIdCheckSuccess] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const { checkLocalId, isPending } = useCheckLocalId({
    setLocalIdCheckSuccess,
    setResponseMessage,
  });

  const checkLocalIdDisable = localId.isError || localIdCheckSuccess;
  const signUpDisable =
    username.isError ||
    localId.isError ||
    password.isError ||
    passwordConfirm.isError;

  const handleClickUsernameDuplicateCheck = () => {
    if (checkLocalIdDisable) return;
    checkLocalId({ localId: localId.value });
    setResponseMessage('');
  };

  const onSubmit = () => {
    if (username.isError) {
      setResponseMessage(
        '실명은 한글명 2~6자 이내, 영문명 2~20자 이내로 구성되어야 합니다.',
      );
      return;
    }
    if (localId.isError) {
      setResponseMessage(
        '아이디는 3~20자 이내의 영어 대소문자 또는 숫자 또는 -, _로 구성되어야 합니다.',
      );
      return;
    }
    if (!localIdCheckSuccess) {
      setResponseMessage('아이디 중복확인이 완료되지 않았습니다.');
      return;
    }
    if (password.isError) {
      setResponseMessage('비밀번호가 유효하지 않습니다.');
      return;
    }
    if (passwordConfirm.isError) {
      setResponseMessage('비밀번호가 일치하지 않습니다');
      return;
    }

    toVerifyEmail({
      body: {
        authProvider: 'LOCAL',
        localId: localId.value,
        password: password.value,
        username: username.value,
      },
    });
  };

  return (
    <>
      <FormContainer id="SignUpForm" handleSubmit={onSubmit}>
        <ProgressBar totalProgress={2} present={1} />
        <div className="flex flex-col gap-6">
          <LabelContainer label="이름" id="username">
            <Input
              id="username"
              value={username.value}
              onChange={(e) => {
                username.onChange(e.target.value);
              }}
              placeholder="실명을 입력해주세요."
              onFocus={() => {
                setIsUsernameFocused(true);
              }}
              onBlur={() => {
                setIsUsernameFocused(false);
              }}
              disabled={isPending}
            />
            {isUsernameFocused && username.isError && (
              <FormErrorResponse>
                한글명 또는 영문명을 작성해주세요.
              </FormErrorResponse>
            )}
          </LabelContainer>
          <LabelContainer label="아이디" id="localId">
            <div className="flex gap-2">
              <Input
                id="localId"
                value={localId.value}
                onChange={(e) => {
                  setLocalIdCheckSuccess(false);
                  localId.onChange(e.target.value);
                }}
                placeholder="아이디를 입력해주세요."
                disabled={isPending}
              />
              <Button
                variant="outline"
                onClick={(event) => {
                  event.preventDefault();
                  handleClickUsernameDuplicateCheck();
                }}
                disabled={isPending || checkLocalIdDisable}
              >
                중복확인
              </Button>
            </div>
            {localIdCheckSuccess && (
              <FormInfoResponse>사용할 수 있는 아이디입니다.</FormInfoResponse>
            )}
          </LabelContainer>
          <LabelContainer label="비밀번호" id="password">
            <Input
              id="password"
              type="password"
              value={password.value}
              onChange={(e) => {
                password.onChange(e.target.value);
              }}
              onFocus={() => {
                setIsPasswordFocused(true);
              }}
              onBlur={() => {
                setIsPasswordFocused(false);
              }}
              placeholder="비밀번호를 입력해주세요."
              disabled={isPending}
            />
            {isPasswordFocused && password.isError && (
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  {password.detailedError.englishError === false ? (
                    <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                  ) : (
                    <img src={ICON_SRC.CLOSE} alt="재작성 아이콘" />
                  )}{' '}
                  <span
                    className={
                      password.detailedError.englishError === false
                        ? 'text-sm text-black'
                        : 'text-sm text-grey-normal'
                    }
                  >
                    영문 대소문자 각각 1개 이상
                  </span>
                </div>
                <div className="flex gap-1">
                  {password.detailedError.numberError === false ? (
                    <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                  ) : (
                    <img src={ICON_SRC.CLOSE} alt="재작성 아이콘" />
                  )}{' '}
                  <span
                    className={
                      password.detailedError.numberError === false
                        ? 'text-sm text-black'
                        : 'text-sm text-grey-normal'
                    }
                  >
                    숫자 1개 이상
                  </span>
                </div>
                <div className="flex gap-1">
                  {password.detailedError.specialCharError === false ? (
                    <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                  ) : (
                    <img src={ICON_SRC.CLOSE} alt="재작성 아이콘" />
                  )}{' '}
                  <span
                    className={
                      password.detailedError.specialCharError === false
                        ? 'text-sm text-black'
                        : 'text-sm text-grey-normal'
                    }
                  >
                    특수문자(@, #, $, !, ^, *) 1개 이상
                  </span>
                </div>
                <div className="flex gap-1">
                  {password.detailedError.lengthError === false ? (
                    <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                  ) : (
                    <img src={ICON_SRC.CLOSE} alt="재작성 아이콘" />
                  )}{' '}
                  <span
                    className={
                      password.detailedError.lengthError === false
                        ? 'text-sm text-black'
                        : 'text-sm text-grey-normal'
                    }
                  >
                    길이는 8~20자리
                  </span>
                </div>
              </div>
            )}
          </LabelContainer>
          <LabelContainer label="비밀번호 확인" id="passwordConfirm">
            <Input
              id="passwordCheck"
              type="password"
              value={passwordConfirm.value}
              onChange={(e) => {
                if (e.target.value === '') {
                  setIsPasswordConfirmFocused(false);
                } else {
                  setIsPasswordConfirmFocused(true);
                }
                passwordConfirm.onChange(e.target.value);
              }}
              placeholder="비밀번호를 한번 더 입력해주세요."
              disabled={isPending}
            />
            {isPasswordConfirmFocused && passwordConfirm.isError && (
              <FormErrorResponse>
                비밀번호가 일치하지 않습니다.
              </FormErrorResponse>
            )}
          </LabelContainer>
        </div>
        <div>
          {responseMessage !== '' && (
            <FormErrorResponse>{responseMessage}</FormErrorResponse>
          )}
        </div>
        <Button form="SignUpForm" disabled={isPending || signUpDisable}>
          다음
        </Button>
      </FormContainer>
    </>
  );
};

const useCheckLocalId = ({
  setLocalIdCheckSuccess,
  setResponseMessage,
}: {
  setLocalIdCheckSuccess(input: boolean): void;
  setResponseMessage(input: string): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);

  const { mutate: checkLocalId, isPending } = useMutation({
    mutationFn: ({ localId }: { localId: string }) => {
      return authService.checkLocalIdDuplicate({ localId });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setLocalIdCheckSuccess(true);
      } else {
        setLocalIdCheckSuccess(false);
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setLocalIdCheckSuccess(false);
      setResponseMessage(
        '회원가입에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    checkLocalId,
    isPending,
  };
};
