import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { FormContainer } from '@/components/form/FormContainer';
import { LabelContainer } from '@/components/label/LabelContainer';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ICON_SRC } from '@/entities/asset';
import { createErrorMessage } from '@/entities/errors';
import { authFormPresentation } from '@/feature/auth/presentation/authFormPresentation';
import { authInputPresentation } from '@/feature/auth/presentation/authInputPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const ChangePasswordForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isNewPasswordConfirmFocused, setIsNewPasswordConfirmFocused] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const { inputStates, formStates } = authFormPresentation.useValidator({
    authInputPresentation,
  });
  const { toMyPage } = useRouteNavigation();

  const { password, newPassword, newPasswordConfirm } = inputStates;

  const { sendPassword, isPending } = useChangePassword({ setResponseMessage });

  console.log(inputStates);
  console.log(formStates);

  const sendPasswordDisable =
    password.isError || newPassword.isError || newPasswordConfirm.isError;
  const isNewPasswordValid =
    !newPassword.detailedError.lengthError &&
    !newPassword.detailedError.numberError &&
    !newPassword.detailedError.englishError &&
    !newPassword.detailedError.specialCharError &&
    !newPassword.detailedError.patternError;

  const onSubmit = () => {
    if (formStates.newPassword.isError) {
      setResponseMessage(
        '기존 비밀번호와 변경하려는 비밀번호의 값이 동일합니다.',
      );
      return;
    }
    sendPassword({
      oldPassword: formStates.password.value,
      newPassword: formStates.newPassword.value,
    });
  };
  const hanldeClickPreviousButton = () => {
    toMyPage({ query: { tab: 'PROFILE' } });
  };

  const detailedPasswordError = [
    {
      message: '비밀번호 8자리 이상(필수)',
      value: newPassword.detailedError.lengthError,
    },
    { message: '숫자 포함', value: newPassword.detailedError.numberError },
    {
      message: '영문 대소문자 포함',
      value: newPassword.detailedError.englishError,
    },
    {
      message: '특수문자 포함',
      value: newPassword.detailedError.specialCharError,
    },
    {
      message: '연속된 문자열이나 숫자가 없어야 함',
      value: newPassword.detailedError.patternError,
    },
  ];

  return (
    <>
      <FormContainer id="FindPasswordForm" handleSubmit={onSubmit}>
        <LabelContainer label="현재 비밀번호">
          <Input
            id="oldPassword"
            type="password"
            value={password.value}
            onChange={(e) => {
              password.onChange(e.target.value);
            }}
            placeholder="현재 비밀번호를 입력해주세요."
          />
        </LabelContainer>
        <LabelContainer label="새로운 비밀번호">
          <div className="relative">
            <Input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={newPassword.value}
              onChange={(e) => {
                newPassword.onChange(e.target.value);
              }}
              onFocus={() => {
                setIsNewPasswordFocused(true);
              }}
              placeholder="비밀번호를 입력해주세요."
              className="relative"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsPasswordVisible(!isPasswordVisible);
              }}
              className="absolute right-3 top-3 flex items-center"
            >
              <img
                src={isPasswordVisible ? ICON_SRC.EYE.OPEN : ICON_SRC.EYE.CLOSE}
                alt="비밀번호 보기"
                className="h-5 w-5 cursor-pointer"
              />
            </button>
          </div>
          {isNewPasswordFocused && !isNewPasswordValid && (
            <div className="flex flex-col gap-1">
              <div className="flex gap-[6px]">
                <img src={ICON_SRC.INFO} className="h-5 w-5" />
                <span className="text-13">
                  아래와 같이 비밀번호를 설정하면 보안등급을 올릴 수 있어요
                </span>
              </div>
              <div className="flex flex-col gap-1 pl-6">
                {detailedPasswordError.map((detailedError, index) => (
                  <div key={`detailed-error-${index}`} className="flex gap-1">
                    {!detailedError.value ? (
                      <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                    ) : (
                      <img src={ICON_SRC.CLOSE.GREY} alt="재작성 아이콘" />
                    )}{' '}
                    <span
                      className={
                        !detailedError.value
                          ? 'text-sm text-grey-900'
                          : 'text-sm text-grey-300'
                      }
                    >
                      {detailedError.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </LabelContainer>
        <LabelContainer label="새로운 비밀번호 확인">
          <Input
            id="newPassword"
            type="password"
            value={newPasswordConfirm.value}
            onChange={(e) => {
              if (e.target.value === '') {
                setIsNewPasswordConfirmFocused(false);
              } else {
                setIsNewPasswordConfirmFocused(true);
              }
              newPasswordConfirm.onChange(e.target.value);
            }}
            placeholder="새로운 비밀번호를 다시 입력해주세요."
          />
          {isNewPasswordConfirmFocused && newPasswordConfirm.isError && (
            <FormErrorResponse>
              새로운 비밀번호 입력값과 일치하지 않습니다.
            </FormErrorResponse>
          )}
        </LabelContainer>
        {responseMessage.length !== 0 && (
          <FormErrorResponse>{responseMessage}</FormErrorResponse>
        )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              hanldeClickPreviousButton();
            }}
            className="flex-1"
          >
            뒤로가기
          </Button>
          <Button
            className="flex-1"
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            disabled={sendPasswordDisable || isPending}
          >
            비밀번호 변경하기
          </Button>
        </div>
      </FormContainer>
    </>
  );
};

const useChangePassword = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { token } = useGuardContext(TokenContext);
  const { authService } = useGuardContext(ServiceContext);
  const { toMyPage } = useRouteNavigation();

  const { mutate: sendPassword, isPending } = useMutation({
    mutationFn: ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return authService.changePassword({ token, oldPassword, newPassword });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toMyPage({ query: { tab: 'PROFILE' } });
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '비밀번호 전송에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    sendPassword,
    isPending,
  };
};
