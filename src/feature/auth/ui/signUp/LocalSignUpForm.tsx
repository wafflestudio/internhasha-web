import { useState } from 'react';

import { FormContainer } from '@/components/form/FormContainer';
import { LabelContainer } from '@/components/label/LabelContainer';
import { ProgressBar } from '@/components/progressBar/ProgressBar';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PreviousSignUpFormRouteQuery } from '@/entities/route';
import { authFormPresentation } from '@/feature/auth/presentation/authFormPresentation';
import { authInputPresentation } from '@/feature/auth/presentation/authInputPresentation';
import { PasswordConfirmField } from '@/feature/auth/ui/fields/PassowordConfirmField';
import { PasswordFieldWithDetailedError } from '@/feature/auth/ui/fields/PasswordFieldWithDetailedError';
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
  const [responseMessage, setResponseMessage] = useState('');

  const signUpDisable =
    username.isError || password.isError || passwordConfirm.isError;

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
          <PasswordFieldWithDetailedError
            label="비밀번호"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            password={password}
          />
          <PasswordConfirmField
            label="비밀번호 확인"
            id="passwordConfirm"
            password={passwordConfirm}
            placeholder="비밀번호를 한번 더 입력해주세요."
            formError="비밀번호가 일치하지 않습니다."
          />
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
