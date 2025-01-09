import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/button';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

type AddGoogleSignUpModalProps = {
  body: {
    token: string;
    snuMail: string;
  };
};

type AddLocalSignUpModalProps = {
  body: {
    snuMail: string;
    localId: string;
    password: string;
    username: string;
  };
};

export const AddGoogleSignUpModal = ({ body }: AddGoogleSignUpModalProps) => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const { toSignInSelect } = useRouteNavigation();
  const { addGoogleSignUp, isPending } = useAddGoogleSignUp({
    setResponseMessage,
  });
  const handleClickAddGoogleSignUpButton = () => {
    addGoogleSignUp(body);
  };

  return (
    <div>
      <p>이미 회원가입 내역이 존재합니다.</p>
      <p>구글 로그인을 추가하시겠습니까?</p>
      <div>
        <Button onClick={toSignInSelect} disabled={isPending}>
          로그인하러 가기
        </Button>
        <Button onClick={handleClickAddGoogleSignUpButton} disabled={isPending}>
          구글 로그인 추가하기
        </Button>
      </div>
      {responseMessage !== null && <div>{responseMessage}</div>}
    </div>
  );
};

export const AddLocalSignUpModal = ({ body }: AddLocalSignUpModalProps) => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const { toSignInSelect } = useRouteNavigation();
  const { addLocalSignUp, isPending } = useAddLocalSignUp({
    setResponseMessage,
  });
  const handleClickAddLocalSignUpButton = () => {
    addLocalSignUp(body);
  };

  return (
    <div>
      <p>이미 회원가입 내역이 존재합니다.</p>
      <p>아이디/비밀번호 로그인을 추가하시겠습니까?</p>
      <div>
        <Button onClick={toSignInSelect} disabled={isPending}>
          로그인하러 가기
        </Button>
        <Button onClick={handleClickAddLocalSignUpButton} disabled={isPending}>
          로컬 로그인 추가
        </Button>
      </div>
      {responseMessage !== null && <div>{responseMessage}</div>}
    </div>
  );
};

const useAddGoogleSignUp = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const { toSignUpComplete } = useRouteNavigation();

  const { mutate: addGoogleSignUp, isPending } = useMutation({
    mutationFn: ({ snuMail, token }: { snuMail: string; token: string }) => {
      return authService.addGoogleSignUp({ snuMail, googleAccessToken: token });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toSignUpComplete();
      } else {
        setResponseMessage(response.message);
      }
    },
    onError: () => {
      setResponseMessage(
        '구글 회원가입 추가에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    addGoogleSignUp,
    isPending,
  };
};

const useAddLocalSignUp = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const { toSignUpComplete } = useRouteNavigation();

  const { mutate: addLocalSignUp, isPending } = useMutation({
    mutationFn: ({
      snuMail,
      localId,
      password,
      username,
    }: {
      snuMail: string;
      localId: string;
      password: string;
      username: string;
    }) => {
      return authService.addLocalSignUp({
        snuMail,
        localId,
        password,
        username,
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toSignUpComplete();
      } else {
        setResponseMessage(response.message);
      }
    },
    onError: () => {
      setResponseMessage(
        '로컬 회원가입 추가에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    addLocalSignUp,
    isPending,
  };
};
