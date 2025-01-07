import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { SubmitButton } from '@/components/button';
import { Button } from '@/components/button';
import { FormContainer } from '@/components/form';
import { TextInput } from '@/components/input';
import { LabelContainer } from '@/components/input/LabelContainer';
import { authPresentation } from '@/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LocalSignUpForm = () => {
  const { toVerifyEmail } = useRouteNavigation();
  const { password, passwordConfirm, localId, username } =
    authPresentation.useValidator();
  const [localIdCheckSuccess, setLocalIdCheckSuccess] = useState(false);

  const changeLocalIdCheckSuccess = (input: boolean) => {
    setLocalIdCheckSuccess(input);
  };

  const { checkLocalId, responseMessage, isPending } = useCheckLocalId({
    changeLocalIdCheckSuccess,
  });

  const handleClickUsernameDuplicateCheck = () => {
    if (localId.isError || localIdCheckSuccess) return;
    checkLocalId({ localId: localId.value });
  };

  const onSubmit = () => {
    if (
      localId.isError ||
      password.isError ||
      passwordConfirm.isError ||
      username.isError ||
      !localIdCheckSuccess
    )
      return;
    toVerifyEmail({
      authProvider: 'LOCAL',
      localId: localId.value,
      password: password.value,
      username: username.value,
    });
  };

  return (
    <div>
      <FormContainer
        id="SignUpForm"
        handleSubmit={onSubmit}
        response={responseMessage}
      >
        <LabelContainer
          label="이름"
          id="username"
          isError={username.isError}
          description="실명을 작성해주세요"
        >
          <TextInput
            id="username"
            value={username.value}
            onChange={(e) => {
              username.onChange(e.target.value);
            }}
            placeholder="홍길동"
            disabled={isPending}
          />
        </LabelContainer>
        <LabelContainer
          label="아이디"
          id="localId"
          isError={localId.isError || !localIdCheckSuccess}
          description={responseMessage}
        >
          <TextInput
            id="localId"
            value={localId.value}
            onChange={(e) => {
              setLocalIdCheckSuccess(false);
              localId.onChange(e.target.value);
            }}
            placeholder="아이디를 입력하세요"
            disabled={isPending}
          />
          {localIdCheckSuccess ? (
            <div>중복 인증 완료</div>
          ) : (
            <Button onClick={handleClickUsernameDuplicateCheck}>
              중복확인
            </Button>
          )}
        </LabelContainer>
        <LabelContainer
          label="비밀번호"
          id="password"
          isError={password.isError}
          description="비밀번호는 8~20자리이며 영문 대소문자, 숫자, 특수문자(@#$!^*) 중 하나를 반드시 포함해야 합니다."
        >
          <TextInput
            id="password"
            type="password"
            value={password.value}
            onChange={(e) => {
              password.onChange(e.target.value);
            }}
            placeholder="비밀번호를 입력해주세요"
            disabled={isPending}
          />
        </LabelContainer>
        <LabelContainer
          label="비밀번호 확인"
          id="passwordConfirm"
          isError={passwordConfirm.isError}
          description="비밀번호가 일치하지 않습니다."
        >
          <TextInput
            id="passwordCheck"
            type="password"
            value={passwordConfirm.value}
            onChange={(e) => {
              passwordConfirm.onChange(e.target.value);
            }}
            disabled={isPending}
          />
        </LabelContainer>
        <SubmitButton form="SignUpForm" disabled={isPending}>
          다음
        </SubmitButton>
      </FormContainer>
    </div>
  );
};

const useCheckLocalId = ({
  changeLocalIdCheckSuccess,
}: {
  changeLocalIdCheckSuccess(input: boolean): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');

  const { mutate: checkLocalId, isPending } = useMutation({
    mutationFn: ({ localId }: { localId: string }) => {
      return authService.checkLocalIdDuplicate({ localId });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        changeLocalIdCheckSuccess(true);
      } else {
        changeLocalIdCheckSuccess(false);
        setResponseMessage(response.message);
      }
    },
    onError: () => {
      changeLocalIdCheckSuccess(false);
      setResponseMessage(
        '회원가입에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    checkLocalId,
    responseMessage,
    isPending,
  };
};
