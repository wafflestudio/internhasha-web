import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { FormContainer } from '@/components/form';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createErrorMessage } from '@/entities/errors';
import { authPresentation } from '@/feature/auth/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LocalLogInForm = ({
  setShowSignUpModal,
}: {
  setShowSignUpModal(input: boolean): void;
}) => {
  const { localSignIn, responseMessage, isPending } = useLocalSignIn({
    setShowSignUpModal,
  });
  const { localId, password } = authPresentation.useValidator({});

  const onSubmit = () => {
    if (localId.value !== '' || password.value !== '') {
      localSignIn({
        localId: localId.value,
        password: password.value,
      });
    }
  };

  const blockButton =
    localId.value.trim() === '' || password.value.trim() === '';

  return (
    <>
      <FormContainer id="SignInForm" handleSubmit={onSubmit}>
        <div className="flex flex-col gap-[10px]">
          <Input
            id="localId"
            value={localId.value}
            onChange={(e) => {
              localId.onChange(e.target.value);
            }}
            placeholder="아이디"
            disabled={isPending}
            className="mt-1"
          />
          <Input
            id="password"
            type="password"
            value={password.value}
            onChange={(e) => {
              password.onChange(e.target.value);
            }}
            placeholder="비밀번호"
            disabled={isPending}
            className="mt-1"
          />
          {responseMessage !== '' && (
            <FormErrorResponse>{responseMessage}</FormErrorResponse>
          )}
        </div>
        <div className="flex flex-col">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || blockButton}
          >
            로그인
          </Button>
        </div>
      </FormContainer>
    </>
  );
};

const useLocalSignIn = ({
  setShowSignUpModal,
}: {
  setShowSignUpModal(input: boolean): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: localSignIn, isPending } = useMutation({
    mutationFn: ({
      localId,
      password,
    }: {
      localId: string;
      password: string;
    }) => {
      return authService.signIn({
        authType: 'LOCAL',
        info: { type: 'LOCAL', localLoginId: localId, password },
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toMain();
      } else {
        if (response.code === 'USER_004') {
          setShowSignUpModal(true);
          return;
        }
        if (response.code === 'AUTH_002' || response.code === 'GEN_004') {
          setResponseMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
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

  return { localSignIn, responseMessage, isPending };
};
