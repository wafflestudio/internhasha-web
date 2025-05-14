import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { MarkdownEditorField } from '@/components/field/MarkdownEditorField';
import { StringField } from '@/components/field/StringField';
import { FormContainer } from '@/components/form/FormContainer';
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
import { EmploymentEndDateField } from '@/feature/post/ui/form/fields/EmploymentEndDateField';
import { HeadcountField } from '@/feature/post/ui/form/fields/HeadcountField';
import { JobCategoryField } from '@/feature/post/ui/form/fields/JobCategoryField';
import { SalaryField } from '@/feature/post/ui/form/fields/SalaryField';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const CreatePostForm = ({ companyId }: { companyId: string }) => {
  const [postId, setPostId] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState<
    'NONE' | 'CALENDAR' | 'CATEGORY'
  >('NONE');
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState<'NONE' | 'CANCEL' | 'NEXT'>(
    'NONE',
  );
  const [responseMessage, setResponseMessage] = useState('');
  const [disableSalary, setDisableSalary] = useState(false);
  const [disableEmploymentEndDate, setDisableEmploymentEndDate] =
    useState(false);
  const { toMain } = useRouteNavigation();

  const onSuccessSubmit = ({ id }: { id: string }) => {
    setShowModal('NEXT');
    setPostId(id);
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
    salary,
    detail,
    employmentEndDate,
  } = inputStates;

  const handleSubmit = () => {
    setIsSubmit(true);
    if (
      formStates.title.isError ||
      (!disableEmploymentEndDate && formStates.employmentEndDateTime.isError) ||
      formStates.job.isError ||
      formStates.headcount.isError ||
      (!disableSalary && formStates.salary.isError) ||
      formStates.detail.isError
    ) {
      return;
    }
    if (formStates.job.value === 'NONE') {
      return;
    }
    const finalEmploymentEndDate = disableEmploymentEndDate
      ? undefined
      : formStates.employmentEndDateTime.value;
    const finalSalary = disableSalary ? undefined : formStates.salary.value;

    createPost({
      companyId: companyId,
      post: {
        positionTitle: formStates.title.value,
        positionType: formStates.job.value,
        employmentEndDate: finalEmploymentEndDate,
        headCount: formStates.headcount.value,
        salary: finalSalary,
        detail: formStates.detail.value,
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
      <FormContainer
        id="CreatePostForm"
        handleSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // 엔터키 기본 동작 방지
          }
        }}
      >
        <StringField
          label="모집 직무 이름"
          input={title}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.title.isError}
          placeholder="모집 직무 이름을 구체적으로 작성해주세요. (e.g. React 프론트엔드 개발자)"
          errorMessage="공고명은 100자 이내로 작성해주세요."
          required={true}
        />
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <div className="md:flex-2 flex-auto">
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
          <div className="flex-auto md:flex-1">
            <HeadcountField
              label="모집 인원"
              input={headcount}
              unit="명"
              isPending={isPending}
              isSubmit={isSubmit}
              isSubmitError={formStates.headcount.isError}
              errorMessage={'0 또는 9,999 이하의 정수여야 합니다.'}
              infoMessage="0명일 경우 '0'을 작성해주세요."
              placeholder="모집 인원 수"
              required={true}
            />
          </div>
        </div>
        <SalaryField
          label="월급"
          input={salary}
          unit="만원"
          isDisabled={disableSalary}
          onCheckboxClick={() => {
            setDisableSalary(!disableSalary);
          }}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={!disableSalary && formStates.salary.isError}
          errorMessage="0 또는 2,000 이하의 자연수를 입력해주세요."
          placeholder="월급 액수"
          required={true}
        />
        <MarkdownEditorField
          label="상세 공고 글"
          input={detail}
          maxLength={CONTENT_MAX_LENGTH}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.detail.isError}
          placeholder="직무 설명, 근무 조건, 지원 조건, 지원 절차 등에 대해 구체적으로 작성해주세요."
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
          onCheckboxClick={() => {
            setDisableEmploymentEndDate(!disableEmploymentEndDate);
          }}
          input={employmentEndDate}
          isPending={isPending}
          isDisabled={disableEmploymentEndDate}
          isSubmit={isSubmit}
          isSubmitError={
            !disableEmploymentEndDate &&
            formStates.employmentEndDateTime.isError
          }
          errorMessage="올바른 채용 마감일 또는 상시 채용을 선택해주세요."
          required={true}
        />
        {responseMessage !== '' && (
          <FormErrorResponse>{responseMessage}</FormErrorResponse>
        )}
        <div className="mt-[46px] flex gap-2">
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
      {showModal === 'CANCEL' && (
        <CancelCheckModal
          onClose={() => {
            toMain({});
          }}
          onCancel={closeCancelModal}
        />
      )}
      {showModal === 'NEXT' && <RewritePostModal postId={postId} />}
    </>
  );
};

const useCreatePost = ({
  setResponseMessage,
  onSuccess,
}: {
  setResponseMessage(input: string): void;
  onSuccess({ id }: { id: string }): void;
}) => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const queryClient = useQueryClient();

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
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
        onSuccess({ id: response.data.id });
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
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
