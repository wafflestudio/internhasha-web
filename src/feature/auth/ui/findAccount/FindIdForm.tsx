import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { FormContainer } from '@/components/form/FormContainer';
import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createErrorMessage } from '@/entities/errors';
import { authPresentation } from '@/feature/auth/presentation/authPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';

export const FindIdForm = () => {
  const { snuMail } = authPresentation.useValidator({});

  const { sendId, sendSuccess, responseMessage, isPending } = useSendId();

  const sendIdDisable = snuMail.isError;

  const onSubmit = () => {
    sendId({ snuMail: snuMail.postfix });
  };

  return (
    <>
      <FormContainer id="FindIdForm" handleSubmit={onSubmit}>
        <LabelContainer label="이메일" id="email">
          <div className="relative">
            <Input
              id="email"
              value={snuMail.value}
              onChange={(e) => {
                snuMail.onChange(e.target.value);
              }}
              placeholder="마이스누 아이디"
              className="pr-[84px]"
            />
            <span
              className={`absolute top-[11px] right-3 ${sendIdDisable ? 'text-grey' : 'text-black'} text-sm`}
            >
              @snu.ac.kr
            </span>
          </div>
          {sendSuccess && (
            <FormInfoResponse>
              이메일로 아이디 정보를 전송했어요.
            </FormInfoResponse>
          )}
          {responseMessage !== '' && (
            <FormErrorResponse>{responseMessage}</FormErrorResponse>
          )}
        </LabelContainer>
        <Button className="mt-[16px]" disabled={sendIdDisable || isPending}>
          메일로 전송
        </Button>
      </FormContainer>
    </>
  );
};

const useSendId = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  const { mutate: sendId, isPending } = useMutation({
    mutationFn: ({ snuMail }: { snuMail: string }) => {
      return authService.sendEmailId({ snuMail });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setSendSuccess(true);
        setResponseMessage('');
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '아이디 전송에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
      setSendSuccess(false);
    },
  });

  return {
    sendId,
    sendSuccess,
    responseMessage,
    isPending,
  };
};
