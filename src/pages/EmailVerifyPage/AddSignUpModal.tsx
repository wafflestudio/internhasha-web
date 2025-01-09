import { useMutation } from '@tanstack/react-query';

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
  const { toSignInSelect } = useRouteNavigation();
  const handleClickAddGoogleSignUpButton = () => {};

  return (
    <div>
      <p>이미 회원가입 내역이 존재합니다.</p>
      <p>구글 로그인을 추가하시겠습니까?</p>
      <div>
        <Button onClick={toSignInSelect}>로그인하러 가기</Button>
        <Button onClick={handleClickAddGoogleSignUpButton}>
          구글 로그인 추가하기
        </Button>
      </div>
    </div>
  );
};

export const AddLocalSignUpModal = ({ body }: AddLocalSignUpModalProps) => {
  const { toSignInSelect } = useRouteNavigation();
  const handleClickAddLocalSignUpButton = () => {};

  return (
    <div>
      <p>이미 회원가입 내역이 존재합니다.</p>
      <p>아이디/비밀번호 로그인을 추가하시겠습니까?</p>
      <div>
        <Button onClick={toSignInSelect}>로그인하러 가기</Button>
        <Button onClick={handleClickAddLocalSignUpButton}>
          로컬 로그인 추가
        </Button>
      </div>
    </div>
  );
};

// const useAddGoogleSignUp = () => {
//   const { authService } = useGuardContext(ServiceContext);

//   const { mutate: sendCode, isPending } = useMutation({
//     mutationFn: ({ snuMail }: { snuMail: string }) => {
//       return authService.sendEmailCode({
//         snuMail,
//       });
//     },
//     onSuccess: (response) => {
//       if (response.type === 'success') {
//       } else {
//       }
//     },
//     onError: () => {
//       setResponseMessage(
//         '코드 전송에 실패했습니다. 잠시 후에 다시 실행해주세요.',
//       );
//       setSendSuccess(false);
//       stopTimer();
//     },
//   });

//   return {
//     sendCode,
//     sendSuccess,
//     isCodeExpired,
//     timeLeft,
//     responseMessage,
//     isPending,
//   };
// };
