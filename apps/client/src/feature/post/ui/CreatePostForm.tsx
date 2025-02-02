import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { MarkdownEditorField } from '@/components/field/MarkdownEditorField';
import { StringField } from '@/components/field/StringField';
import { FormContainer } from '@/components/form';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { RewritePostModal } from '@/components/modal/RewritePostModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { createErrorMessage } from '@/entities/errors';
import type { CreatePostRequest } from '@/entities/post';
import { postFormPresentation } from '@/feature/post/presentation/postFormPresentation';
import {
  CONTENT_MAX_LENGTH,
  postInputPresentation,
} from '@/feature/post/presentation/postInputPresentation';
import { EmploymentEndDateField } from '@/feature/post/ui/field/EmploymentEndDateField';
import { HeadcountField } from '@/feature/post/ui/field/HeadcountField';
import { JobCategoryField } from '@/feature/post/ui/field/JobCategoryField';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const CreatePostForm = ({ companyId }: { companyId: string }) => {
  const [showFilter, setShowFilter] = useState<
    'NONE' | 'CALENDAR' | 'CATEGORY'
  >('NONE');
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState<'NONE' | 'CANCEL' | 'NEXT'>(
    'NONE',
  );
  const [responseMessage, setResponseMessage] = useState('');
  const { toMain } = useRouteNavigation();

  const onSuccessSubmit = () => {
    setShowModal('NEXT');
  };
  const { createPost, isPending } = useCreatePost({
    setResponseMessage,
    onSuccess: onSuccessSubmit,
  });

  const { inputStates, formStates } = postFormPresentation.useValidator({
    postInputPresentation,
  });

  const {
    title,
    jobMajorCategory,
    jobMinorCategory,
    headcount,
    detail,
    employmentEndDate,
  } = inputStates;

  const handleSubmit = () => {
    setIsSubmit(true);
    if (
      formStates.title.isError ||
      formStates.employmentEndDateTime.isError ||
      formStates.job.isError ||
      formStates.headcount.isError ||
      formStates.detail.isError
    ) {
      return;
    }
    if (formStates.job.value === 'NONE') {
      return;
    }
    createPost({
      companyId: companyId,
      post: {
        title: formStates.title.value,
        employmentEndDate: formStates.employmentEndDateTime.value,
        category: formStates.job.value,
        headcount: formStates.headcount.value,
        detail: formStates.detail.value,
        isActive: true,
      },
    });
  };

  const handleClickCancelButton = () => {
    setShowModal('CANCEL');
  };

  const closeCancelModal = () => {
    setShowModal('NONE');
  };

  return (
    <>
      <FormContainer id="CreatePostForm" handleSubmit={handleSubmit}>
        <StringField
          label="모집 직무 이름"
          input={title}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.title.isError}
          placeholder="모집 직무 이름을 구체적으로 작성해주세요. (e.g. React 프론트엔드 개발자)"
          errorMessage="공고명은 500자 이내로 작성해주세요."
          required={true}
        />
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="flex-1">
            <JobCategoryField
              label="직무 유형"
              input={{
                major: jobMajorCategory,
                minor: jobMinorCategory,
              }}
              showFilter={showFilter}
              onClick={() => {
                if (showFilter !== 'CATEGORY') {
                  setShowFilter('CATEGORY');
                  return;
                }
                setShowFilter('NONE');
              }}
              isPending={isPending}
              isSubmit={isSubmit}
              isSubmitError={formStates.job.isError}
              errorMessage="직무를 선택해주세요."
              required={true}
            />
          </div>
          <div className="flex-2">
            <HeadcountField
              label="모집 인원"
              input={headcount}
              unit="명"
              isPending={isPending}
              isSubmit={isSubmit}
              isSubmitError={formStates.headcount.isError}
              errorMessage={'모집 인원은 0 또는 양의 정수여야 합니다.'}
              placeholder="모집 인원 수"
              required={true}
            />
          </div>
        </div>
        <MarkdownEditorField
          label="상세 공고 글"
          input={detail}
          maxLength={CONTENT_MAX_LENGTH}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.detail.isError}
          errorMessage={`공고 글은 0자 이상 ${CONTENT_MAX_LENGTH}자 이내로 작성해주세요.`}
          required={true}
        />
        <EmploymentEndDateField
          label="채용 마감일"
          showFilter={showFilter}
          onClick={() => {
            if (showFilter !== 'CALENDAR') {
              setShowFilter('CALENDAR');
              return;
            }
            setShowFilter('NONE');
          }}
          input={employmentEndDate}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.employmentEndDateTime.isError}
          infoMessage={`채용 마감일을 설정하지 않으면 '상시' 상태로 등록돼요.`}
          errorMessage="올바른 채용 마감일을 선택해주세요."
          required={true}
        />
        {responseMessage !== '' && (
          <FormErrorResponse>{responseMessage}</FormErrorResponse>
        )}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              handleClickCancelButton();
            }}
            disabled={isPending}
            className="flex-1"
          >
            이전으로
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={isPending}
            className="flex-1"
          >
            제출하기
          </Button>
        </div>
      </FormContainer>
      {showModal === 'CANCEL' && (
        <CancelCheckModal onClose={toMain} onCancel={closeCancelModal} />
      )}
      {showModal === 'NEXT' && <RewritePostModal />}
    </>
  );
};

const useCreatePost = ({
  setResponseMessage,
  onSuccess,
}: {
  setResponseMessage(input: string): void;
  onSuccess(): void;
}) => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: ({
      companyId,
      post,
    }: {
      companyId: string;
      post: CreatePostRequest;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.createPost({ token, companyId, postContents: post });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        onSuccess();
      } else {
        console.log(response);
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: (error) => {
      console.log(error);
      setResponseMessage(
        '공고 생성에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    createPost,
    isPending,
  };
};
