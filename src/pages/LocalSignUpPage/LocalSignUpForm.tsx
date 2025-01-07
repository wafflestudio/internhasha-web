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
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const { checkLocalId, isPending } = useCheckLocalId({
    setLocalIdCheckSuccess,
    setResponseMessage,
  });

  const handleClickUsernameDuplicateCheck = () => {
    if (localId.isError || localIdCheckSuccess) return;
    checkLocalId({ localId: localId.value });
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
        <div>
          <LabelContainer label="이름" id="username">
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
          <LabelContainer label="아이디" id="localId">
            <TextInput
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
              onClick={(event) => {
                event.preventDefault();
                handleClickUsernameDuplicateCheck();
              }}
            >
              중복확인
            </Button>
            {localIdCheckSuccess ? (
              <div>사용할 수 있는 아이디입니다.</div>
            ) : (
              <div>사용할 수 없는 아이디입니다. 다시 입력해주세요.</div>
            )}
          </LabelContainer>
          <LabelContainer label="비밀번호" id="password">
            <TextInput
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
              <div>
                <p>
                  {password.detailedError?.englishError === false ? '✅' : '❌'}{' '}
                  영문 대소문자 각각 1개 이상
                </p>
                <p>
                  {password.detailedError?.numberError === false ? '✅' : '❌'}{' '}
                  숫자 1개 이상
                </p>
                <p>
                  {password.detailedError?.specialCharError === false
                    ? '✅'
                    : '❌'}{' '}
                  특수문자(@, #, $, !, ^, *) 1개 이상
                </p>
                <p>
                  {password.detailedError?.lengthError === false ? '✅' : '❌'}{' '}
                  길이는 8~20자리
                </p>
              </div>
            )}
          </LabelContainer>
          <LabelContainer label="비밀번호 확인" id="passwordConfirm">
            <TextInput
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
              onFocus={() => {}}
              placeholder="비밀번호를 한번 더 입력해주세요."
              disabled={isPending}
            />
            {isPasswordConfirmFocused && passwordConfirm.isError && (
              <div>비밀번호가 일치하지 않습니다.</div>
            )}
          </LabelContainer>
          {responseMessage !== '' && <div></div>}
        </div>
        <SubmitButton form="SignUpForm" disabled={isPending}>
          다음
        </SubmitButton>
      </FormContainer>
    </div>
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
        setResponseMessage(response.message);
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
