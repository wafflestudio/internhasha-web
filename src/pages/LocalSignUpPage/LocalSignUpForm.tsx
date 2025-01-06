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
  const {
    localSignUp,
    responseMessage: responseMessageSignUp,
    isPending: isPendingSignUp,
  } = useSignUp();
  const { snuMail, password, passwordConfirm, localId, code, username} =
    authPresentation.useValidator();
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [localIdCheckSuccess, setLocalIdCheckSuccess] = useState(false);

  const changeLocalIdCheckSuccess = (input: boolean) => {
    setLocalIdCheckSuccess(input);
  };

  const {
    checkLocalId,
    responseMessage: responseMessageLocalId,
    isPending: isPendingLocalId,
  } = useCheckLocalId({ changeLocalIdCheckSuccess });

  const isPending = isPendingLocalId || isPendingSignUp;

  const handleClickSendEmailCodeButton = () => {
    setShowCodeInput(true);
  };

  const handleClickUsernameDuplicateCheck = () => {
    if (localId.isError || localIdCheckSuccess) return;
    checkLocalId({ localId: localId.value });
  };

  const onSubmit = () => {
    if (!snuMail.isError && !password.isError && !localId.isError) {
      localSignUp({
        localId: localId.value,
        snuMail: snuMail.value,
        username: username.value,
        password: password.value,
      });
    }
  };
  return (
    <div>
      <FormContainer
        id="SignUpForm"
        handleSubmit={onSubmit}
        response={responseMessageSignUp}
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
          description={responseMessageLocalId}
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
        <LabelContainer
          label="이메일"
          id="email"
          isError={snuMail.isError}
          description="snu.ac.kr로 끝나는 메일을 작성해주세요."
        >
          <TextInput
            id="email"
            value={snuMail.value}
            onChange={(e) => {
              snuMail.onChange(e.target.value);
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

const useSignUp = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const { mutate: localSignUp, isPending } = useMutation({
    mutationFn: ({
      username,
      snuMail,
      localId,
      password,
    }: {
      username: string;
      snuMail: string;
      localId: string;
      password: string;
    }) => {
      return authService.localSignUp({ username, snuMail, localId, password });
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

  return { localSignUp, responseMessage, isPending };
};
