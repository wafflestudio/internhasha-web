import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { FormContainer } from '@/components/form';
import { TextInput } from '@/components/input';
import { LabelContainer } from '@/components/input/LabelContainer';
import { authPresentation } from '@/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LocalSignUpForm = () => {
  const { LocalSignUp, responseMessage, isPending } = useSignUp();
  const { email, password, name, phoneNumber } =
    authPresentation.useValidator();

  const onSubmit = () => {
    if (
      !email.isError &&
      !password.isError &&
      !name.isError &&
      !phoneNumber.isError
    ) {
      LocalSignUp({
        name: name.value,
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
        disabled={isPending}
        response={responseMessage}
        buttonDescription="회원가입 완료하기"
      >
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
            placeholder="비밀번호를 입력하세요"
            disabled={isPending}
          />
        </LabelContainer>
        <LabelContainer
          label="아이디"
          id="name"
          isError={name.isError}
          description="아이디는 4~20자리이며 영문 대소문자 또는 숫자 또는 -, _를 사용할 수 있습니다."
        >
          <TextInput
            id="name"
            value={name.value}
            onChange={(e) => {
              name.onChange(e.target.value);
            }}
            placeholder="아이디를 입력하세요"
            disabled={isPending}
          />
        </LabelContainer>
        <LabelContainer
          label="전화번호"
          id="phoneNumber"
          isError={phoneNumber.isError}
          description="전화번호는 010-1111-1111의 형태로 작성해주세요."
        >
          <TextInput
            id="phoneNumber"
            value={phoneNumber.value}
            onChange={(e) => {
              phoneNumber.onChange(e.target.value);
            }}
            placeholder="전화번호를 입력하세요"
            disabled={isPending}
          />
        </LabelContainer>
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
