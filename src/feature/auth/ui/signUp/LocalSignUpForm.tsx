import { useState } from 'react';

import { FormContainer } from '@/components/form/FormContainer';
import { LabelContainer } from '@/components/label/LabelContainer';
import { ProgressBar } from '@/components/progressBar/ProgressBar';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ICON_SRC } from '@/entities/asset';
import type { PreviousSignUpFormRouteQuery } from '@/entities/route';
import { authFormPresentation } from '@/feature/auth/presentation/authFormPresentation';
import { authInputPresentation } from '@/feature/auth/presentation/authInputPresentation';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useRouteLocation } from '@/shared/route/useRouteParams';

export const LocalSignUpForm = () => {
  const body = useRouteLocation() as PreviousSignUpFormRouteQuery | null;

  const { toVerifyEmail } = useRouteNavigation();
  const { inputStates, formStates } = authFormPresentation.useValidator({
    authInputPresentation,
    initialState: body !== null ? body : undefined,
  });
  const { password, passwordConfirm, username } = inputStates;

  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const signUpDisable =
    username.isError || password.isError || passwordConfirm.isError;

  const detailedError =
    password.detailedError.lengthError === true ||
    password.detailedError.numberError === true ||
    password.detailedError.englishError === true ||
    password.detailedError.specialCharError === true ||
    password.detailedError.patternError === true;

  const onSubmit = () => {
    if (username.isError) {
      setResponseMessage(
        '실명은 한글명 2~6자 이내, 영문명 2~20자 이내로 구성되어야 합니다.',
      );
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
        password: formStates.password.value,
        username: formStates.username.value,
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
            />
            {isUsernameFocused && username.isError && (
              <FormErrorResponse>
                한글명 또는 영문명을 작성해주세요.
              </FormErrorResponse>
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
              placeholder="비밀번호를 입력해주세요."
            />
            {isPasswordFocused && detailedError && (
              <div className="flex flex-col gap-1">
                <div className="flex gap-[6px]">
                  <img src={ICON_SRC.INFO} className="h-5 w-5" />
                  <span className="text-13">
                    아래와 같이 비밀번호를 설정하면 보안등급을 올릴 수 있어요
                  </span>
                </div>
                <div className="flex flex-col gap-1 pl-6">
                  <div className="flex gap-1">
                    {password.detailedError.lengthError === false ? (
                      <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                    ) : (
                      <img src={ICON_SRC.CLOSE.GREY} alt="재작성 아이콘" />
                    )}{' '}
                    <span
                      className={
                        password.detailedError.lengthError === false
                          ? 'text-sm text-grey-900'
                          : 'text-sm text-grey-300'
                      }
                    >
                      비밀번호 8자리 이상(필수)
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {password.detailedError.numberError === false ? (
                      <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                    ) : (
                      <img src={ICON_SRC.CLOSE.GREY} alt="재작성 아이콘" />
                    )}{' '}
                    <span
                      className={
                        password.detailedError.numberError === false
                          ? 'text-sm text-grey-900'
                          : 'text-sm text-grey-300'
                      }
                    >
                      숫자 포함
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {password.detailedError.englishError === false ? (
                      <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                    ) : (
                      <img src={ICON_SRC.CLOSE.GREY} alt="재작성 아이콘" />
                    )}{' '}
                    <span
                      className={
                        password.detailedError.englishError === false
                          ? 'text-sm text-grey-900'
                          : 'text-sm text-grey-300'
                      }
                    >
                      영문 대소문자 포함
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {password.detailedError.specialCharError === false ? (
                      <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                    ) : (
                      <img src={ICON_SRC.CLOSE.GREY} alt="재작성 아이콘" />
                    )}{' '}
                    <span
                      className={
                        password.detailedError.specialCharError === false
                          ? 'text-sm text-grey-900'
                          : 'text-sm text-grey-300'
                      }
                    >
                      특수문자 포함
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {password.detailedError.patternError === false ? (
                      <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                    ) : (
                      <img src={ICON_SRC.CLOSE.GREY} alt="재작성 아이콘" />
                    )}{' '}
                    <span
                      className={
                        password.detailedError.patternError === false
                          ? 'text-sm text-grey-900'
                          : 'text-sm text-grey-300'
                      }
                    >
                      연속된 문자열이나 숫자가 없어야 함
                    </span>
                  </div>
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
        <Button form="SignUpForm" disabled={signUpDisable}>
          다음
        </Button>
      </FormContainer>
    </>
  );
};
