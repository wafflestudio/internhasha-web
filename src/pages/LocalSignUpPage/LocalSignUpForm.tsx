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
  const { LocalSignUp, responseMessage, isPending } = useSignUp();
  const { email, password, localId, phoneNumber, code } =
    authPresentation.useValidator();

  const [showCodeInput, setShowCodeInput] = useState(false);
  const handleClickSendEmailCodeButton = () => {
    setShowCodeInput(true);
  };

  const handleClickEmailVerifyButton = () => {};

  const onSubmit = () => {
    if (
      !email.isError &&
      !password.isError &&
      !localId.isError &&
      !phoneNumber.isError
    ) {
      LocalSignUp({
        name: localId.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      });
    }
  };
  return (
    <div>
      <FormContainer
        id="SignUpForm"
        handleSubmit={onSubmit}
        response={responseMessage}
      >
        <LabelContainer
          label="아이디"
          id="name"
          isError={localId.isError}
          description="아이디는 4~20자리이며 영문 대소문자 또는 숫자 또는 -, _를 사용할 수 있습니다."
        >
          <TextInput
            id="name"
            value={localId.value}
            onChange={(e) => {
              localId.onChange(e.target.value);
            }}
            placeholder="아이디를 입력하세요"
            disabled={isPending}
          />
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
          id="passwordCheck"
          isError={password.isError}
          description="비밀번호는 8~20자리이며 영문 대소문자, 숫자, 특수문자(@#$!^*) 중 하나를 반드시 포함해야 합니다."
        >
          <TextInput
            id="passwordCheck"
            type="password"
            value={password.value}
            onChange={(e) => {
              password.onChange(e.target.value);
            }}
            placeholder="비밀번호를 다시 입력해주세요"
            disabled={isPending}
          />
        </LabelContainer>
        <LabelContainer
          label="이메일"
          id="email"
          isError={email.isError}
          description="snu.ac.kr로 끝나는 메일을 작성해주세요."
        >
          <TextInput
            id="email"
            value={email.value}
            onChange={(e) => {
              email.onChange(e.target.value);
            }}
            placeholder="스누 메일을 입력하세요"
            disabled={isPending}
          />
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleClickSendEmailCodeButton();
            }}
            disabled={isPending}
          >
            인증코드 받기
          </Button>
        </LabelContainer>
        {showCodeInput && (
          <>
            <LabelContainer label="인증 코드" id="code" isError={code.isError}>
              <TextInput
                id="code"
                value={code.value}
                onChange={(e) => {
                  code.onChange(e.target.value);
                }}
                disabled={isPending}
              />
            </LabelContainer>
            <Button
              onClick={(event) => {
                event.preventDefault();
                handleClickEmailVerifyButton();
              }}
              disabled={isPending}
            >
              인증코드 확인
            </Button>
          </>
        )}
        <SubmitButton form="SignUpForm" disabled={isPending}>
          회원가입 완료
        </SubmitButton>
      </FormContainer>
    </div>
  );
};

const useSignUp = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: LocalSignUp, isPending } = useMutation({
    mutationFn: ({
      name,
      email,
      phoneNumber,
      password,
    }: {
      name: string;
      email: string;
      password: string;
      phoneNumber: string;
    }) => {
      return authService.localSignUp({ name, email, phoneNumber, password });
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

  return { LocalSignUp, responseMessage, isPending };
};
