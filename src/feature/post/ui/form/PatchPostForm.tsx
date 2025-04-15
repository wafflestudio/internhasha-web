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
import type { CreatePostRequest, JobMinorCategory } from '@/entities/post';
import type { PostRouteQuery } from '@/entities/route';
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

export const PatchPostForm = ({
  companyId,
  body,
}: {
  companyId: string;
  body: PostRouteQuery;
}) => {
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
  const { patchPost, isPending } = usePatchPost({
    setResponseMessage,
    onSuccess: onSuccessSubmit,
  });

  const initialEmploymentEndDate = body.employmentEndDateTime ?? undefined;

  const { inputStates, formStates } = postFormPresentation.useValidator({
    initialState: {
      title: body.positionTitle,
      job: body.jobMinorCategory as JobMinorCategory,
      headcount: body.headcount,
      salary: body.salary,
      detail: body.detail,
      employmentEndDateTime:
        initialEmploymentEndDate !== undefined
          ? initialEmploymentEndDate.split('T')[0]
          : undefined,
    },
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

    patchPost({
      companyId: companyId,
      post: {
        positionTitle: formStates.title.value,
        positionType: formStates.job.value,
        employmentEndDate: finalEmploymentEndDate,
        headCount: formStates.headcount.value,
        salary: finalSalary,
        detail: formStates.detail.value,
        isActive: true,
      },
      postId: body.id,
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
      <FormContainer id="PatchPostForm" handleSubmit={handleSubmit}>
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
        <div className="flex w-full flex-col gap-2 md:flex-row">
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
              infoMessage="0명일 경우 '0'을 작성해주세요."
              placeholder="모집 인원 수"
              required={true}
            />
          </div>
        </div>
        <SalaryField
          label="월급"
          input={salary}
          unit="원"
          isDisabled={disableSalary}
          onCheckboxClick={() => {
            setDisableSalary(!disableSalary);
          }}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={!disableSalary && formStates.salary.isError}
          errorMessage="월급은 0 또는 양의 정수여야 합니다."
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

const usePatchPost = ({
  setResponseMessage,
  onSuccess,
}: {
  setResponseMessage(input: string): void;
  onSuccess({ id }: { id: string }): void;
}) => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const queryClient = useQueryClient();

  const { mutate: patchPost, isPending } = useMutation({
    mutationFn: ({
      companyId,
      post,
      postId,
    }: {
      companyId: string;
      post: CreatePostRequest;
      postId: string;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.patchPost({
        token,
        companyId,
        postContents: post,
        postId: postId,
      });
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
        '공고 수정에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    patchPost,
    isPending,
  };
};
