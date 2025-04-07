import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { FormContainer } from '@/components/form/FormContainer';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { createErrorMessage } from '@/entities/errors';
import { authFormPresentation } from '@/feature/auth/presentation/authFormPresentation';
import { authInputPresentation } from '@/feature/auth/presentation/authInputPresentation';
import { PasswordConfirmField } from '@/feature/auth/ui/fields/PasswordConfirmField';
import { PasswordField } from '@/feature/auth/ui/fields/PasswordField';
import { PasswordFieldWithDetailedError } from '@/feature/auth/ui/fields/PasswordFieldWithDetailedError';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const ChangePasswordForm = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const { inputStates, formStates } = authFormPresentation.useValidator({
    authInputPresentation,
  });
  const { toMyPage } = useRouteNavigation();

  const { password, newPassword, newPasswordConfirm } = inputStates;

  const { sendPassword, isPending } = useChangePassword({ setResponseMessage });

  const sendPasswordDisable =
    password.isError || newPassword.isError || newPasswordConfirm.isError;

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
  const handleClickPreviousButton = () => {
    toMyPage({ query: { tab: 'PROFILE' } });
  };

  return (
    <>
      <FormContainer id="FindPasswordForm" handleSubmit={onSubmit}>
        <PasswordField
          label="현재 비밀번호"
          id="oldPassword"
          password={password}
          placeholder="현재 비밀번호를 입력해주세요."
        />
        <PasswordFieldWithDetailedError
          label="새로운 비밀번호"
          id="newPassword"
          password={newPassword}
          placeholder="새로운 비밀번호를 입력해주세요."
        />
        <PasswordConfirmField
          label="새로운 비밀번호 확인"
          id="newPasswordConfirm"
          password={newPasswordConfirm}
          placeholder="새로운 비밀번호를 다시 입력해주세요."
          formError="비밀번호 입력값이 일치하지 않습니다."
        />
        {responseMessage.length !== 0 && (
          <FormErrorResponse>{responseMessage}</FormErrorResponse>
        )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              handleClickPreviousButton();
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
