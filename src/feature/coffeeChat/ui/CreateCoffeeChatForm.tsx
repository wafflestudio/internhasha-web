import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { StringField } from '@/components/field/StringField';
import { TextareaField } from '@/components/field/TextareaField';
import { FormContainer } from '@/components/form/FormContainer';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import type { CoffeeChatRequest } from '@/entities/coffeeChat';
import {
  coffeeChatPresentation,
  CONTENTS_MAX_LENGTH,
} from '@/feature/coffeeChat/presentation/coffeeChatPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const CreateCoffeeChatForm = ({ postId }: { postId: string }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const { createCoffeeChat, isPending } = useCreateCoffeeChat({
    setResponseMessage,
    postId,
  });

  const { phoneNumber, contents } = coffeeChatPresentation.useValidator({});
  const { toPost } = useRouteNavigation();

  const handleSubmit = () => {
    setIsSubmit(true);
    if (phoneNumber.isError || contents.isError) {
      return;
    }

    createCoffeeChat({
      coffeeChat: { phoneNumber: phoneNumber.value, content: contents.value },
    });
  };

  const handleClickCancelButton = () => {
    setIsCancel(true);
  };

  const closeCancelModal = () => {
    setIsCancel(false);
  };

  return (
    <>
      <FormContainer handleSubmit={handleSubmit}>
        <StringField
          label="전화번호"
          input={phoneNumber}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={phoneNumber.isError}
          placeholder="010-0000-0000"
          errorMessage="전화번호 양식에 맞게 작성해주세요. (예시: 010-0000-0000)"
          required={true}
        />

        <TextareaField
          label="내용"
          input={contents}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={contents.isError}
          maxLength={CONTENTS_MAX_LENGTH}
          placeholder="간단한 자기소개, 커피챗 신청 사유, 가능한 시간대를 작성해주세요"
          errorMessage={`내용은 ${CONTENTS_MAX_LENGTH}자 이내로 작성해주세요.`}
          minLine={7}
        />

        {responseMessage !== '' && (
          <FormErrorResponse>{responseMessage}</FormErrorResponse>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              handleClickCancelButton();
            }}
            disabled={isPending}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={isPending}
            className="flex-1"
          >
            등록
          </Button>
        </div>
      </FormContainer>
      {isCancel && (
        <CancelCheckModal
          onClose={() => {
            toPost({ postId });
          }}
          onCancel={closeCancelModal}
        />
      )}
    </>
  );
};

const useCreateCoffeeChat = ({
  setResponseMessage,
  postId,
}: {
  setResponseMessage(input: string): void;
  postId: string;
}) => {
  const { coffeeChatService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { toPost } = useRouteNavigation();
  const queryClient = useQueryClient();

  const { mutate: createCoffeeChat, isPending } = useMutation({
    mutationFn: ({ coffeeChat }: { coffeeChat: CoffeeChatRequest }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.createCoffeeChat({
        token,
        coffeeChatContents: coffeeChat,
        postId,
      });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
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
  });
  return {
    createCoffeeChat,
    isPending,
  };
};
