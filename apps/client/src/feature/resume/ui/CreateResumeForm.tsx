import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { Button, SubmitButton } from '@/components/button';
import { FormContainer } from '@/components/form';
import { TextInput } from '@/components/input';
import { LabelContainer } from '@/components/input/LabelContainer.tsx';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal.tsx';
import type { ResumeRequest } from '@/entities/resume.ts';
import { resumePresentation } from '@/feature/resume/presentation/resumePresentation.ts';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext.ts';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation.ts';

export const CreateResumeForm = ({ postId }: { postId: string }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const { createResume, isPending } = useCreateResume({
    setResponseMessage,
    postId,
  });
  
  const { phoneNumber, contents } = resumePresentation.useValidator({})

  const { toPost } = useRouteNavigation();

  const handleSubmit = () => {
    setIsSubmit(true);

    const isPhoneNumberValid = !phoneNumber.isError;
    const isContentsValid = !contents.isError;

    if (!isPhoneNumberValid || !isContentsValid) {
      return;
    }

    createResume({
      resume: { phoneNumber: phoneNumber.value, content: contents.value },
    });
  }

  const handleClickCancelButton = () => {
    setIsCancel(true);
  };

  const closeCancelModal = () => {
    setIsCancel(false);
  };

  return (
    <>
      <FormContainer
        id="CreateResumeForm"
        handleSubmit={handleSubmit}
        response={responseMessage}
      >
        <LabelContainer label="전화번호" id="phoneNumber">
          <TextInput
            id="phoneNumber"
            value={phoneNumber.value}
            disabled={isPending}
            onChange={(e) => {
              phoneNumber.onChange(e.target.value);
            }}
            placeholder="010-0000-0000"
          />
          {isSubmit && phoneNumber.isError && (
          <p>전화번호 양식에 맞게 작성해주세요. (예시: 010-0000-0000)</p>
          )}
        </LabelContainer>

        <LabelContainer label="내용" id="contents">
          <TextInput
            id="contents"
            value={contents.value}
            disabled={isPending}
            onChange={(e) => {
              contents.onChange(e.target.value);
            }}
            placeholder="간단한 자기소개, 커피챗 신청 사유, 가능한 시간대를 작성해주세요"
          />
          {isSubmit && contents.isError && (
            <p>내용은 10,000자 이하로 작성해주세요.</p>
          )}
        </LabelContainer>

        <div>
          <Button
            type="button"
            onClick={handleClickCancelButton} disabled={isPending}
          >
            이전으로
          </Button>

          <SubmitButton
            type="submit"
            form="CreateResumeForm"
            onClick={handleSubmit}
            disabled={isPending}
          >
            제출하기
          </SubmitButton>
        </div>
        {isCancel && (
          <CancelCheckModal
            onClose={() => { toPost({ postId }); }}
            onCancel={closeCancelModal}/>
        )}
      </FormContainer>
    </>
  );
  
};

const useCreateResume = ({
  setResponseMessage,
  postId,
}: {
  setResponseMessage(input: string): void;
  postId: string;
}) => {

  const { resumeService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { toPost } = useRouteNavigation();

  const { mutate: createResume, isPending } = useMutation({
    mutationFn: ({ resume }: { resume: ResumeRequest }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return resumeService.createResume({ token, resumeContents: resume, postId })
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toPost({ postId });
      } else {
        setResponseMessage(response.code);
      }
    },
    onError: () => {
    setResponseMessage(
      '공고 생성에 실패했습니다. 잠시 후에 다시 실행해주세요.',
    );
  },
  })
  return {
    createResume,
    isPending,
  };
};
