import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { MarkdownEditorField } from '@/components/field/MarkdownEditorField';
import { StringField } from '@/components/field/StringField';
import { FormContainer } from '@/components/form';
import { TextInput } from '@/components/input';
import { LabelContainer } from '@/components/input/LabelContainer';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { RewritePostModal } from '@/components/modal/RewritePostModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { createErrorMessage } from '@/entities/errors';
import type { CreatePostRequest } from '@/entities/post';
import type { JobMajorCategory, JobMinorCategory } from '@/entities/post';
import { JOB_CATEGORY_MAP, JOB_MAJOR_CATEGORIES } from '@/entities/post';
import { postFormPresentation } from '@/feature/post/presentation/postFormPresentation';
import {
  CONTENT_MAX_LENGTH,
  postInputPresentation,
} from '@/feature/post/presentation/postInputPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { formatMajorJobToLabel, formatMinorJobToLabel } from '@/util/format';

export const CreatePostForm = ({ companyId }: { companyId: string }) => {
  const [showCalendar, setShowCalendar] = useState(false);
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
          isSubmitError={title.isError}
          placeholder="모집 직무 이름을 구체적으로 작성해주세요. (e.g. React 프론트엔드 개발자)"
          errorMessage="공고명은 500자 이내로 작성해주세요."
          required={true}
        />
        <div>
          <LabelContainer label="직무 유형" id="job">
            <div>
              <div>
                <select
                  value={jobMajorCategory.value}
                  disabled={isPending}
                  onChange={(e) => {
                    jobMajorCategory.onChange(
                      e.target.value as JobMajorCategory,
                    );
                  }}
                >
                  {JOB_MAJOR_CATEGORIES.map((category) => {
                    const label = formatMajorJobToLabel(category);

                    if (label === null) return null;

                    return (
                      <option
                        key={`major-category-${category}`}
                        value={category}
                      >
                        {formatMajorJobToLabel(category)}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <select
                  value={jobMinorCategory.value}
                  disabled={isPending}
                  onChange={(e) => {
                    jobMinorCategory.onChange(
                      e.target.value as JobMinorCategory,
                    );
                  }}
                >
                  <option value="NONE" selected disabled hidden></option>
                  {JOB_CATEGORY_MAP[jobMajorCategory.value].map(
                    (subCategory) => (
                      <option
                        key={`sub-category-${subCategory}`}
                        value={subCategory}
                      >
                        {formatMinorJobToLabel(subCategory)}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
            {isSubmit && jobMinorCategory.isError && (
              <p>직무를 선택해주세요.</p>
            )}
          </LabelContainer>
          <LabelContainer label="모집 인원" id="headcount">
            <TextInput
              value={headcount.value}
              disabled={isPending}
              onChange={(e) => {
                headcount.onChange(e.target.value);
              }}
              placeholder="모집 인원 수"
            />
            {isSubmit && formStates.headcount.isError && (
              <p>모집 인원은 0 또는 양의 정수여야 합니다.</p>
            )}
          </LabelContainer>
        </div>
        <MarkdownEditorField
          label="상세 공고 글"
          input={detail}
          maxLength={CONTENT_MAX_LENGTH}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={detail.isError}
          errorMessage={`공고 글은 ${CONTENT_MAX_LENGTH}자 이내로 작성해주세요.`}
          required={true}
        />
        <LabelContainer label="채용 마감일" id="employmentEndDate">
          <div className="relative">
            <div
              className={`absolute left-0 bottom-0 mt-2 w-[340px] rounded-lg bg-white shadow-lg overflow-hidden transition-all duration-300 ${
                showCalendar
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <Calendar
                mode="single"
                selected={new Date(employmentEndDate.value)}
                onSelect={(input: Date | undefined) => {
                  employmentEndDate.onChange(
                    input !== undefined
                      ? new Date(input)
                          .toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                          .replace(/\. /g, '-')
                          .replace('.', '')
                      : '',
                  );
                }}
              />
            </div>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setShowCalendar(!showCalendar);
            }}
            variant="outline"
            className="w-full justify-start"
          >
            {employmentEndDate.value !== ''
              ? new Date(employmentEndDate.value)
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\. /g, '-')
                  .replace('.', '')
              : '모집 마감일을 선택해주세요.'}
          </Button>

          <input
            id="employmentEndDate"
            type="date"
            value={employmentEndDate.value}
            disabled={isPending}
            onChange={(e) => {
              employmentEndDate.onChange(e.target.value);
            }}
          />
          {isSubmit && formStates.employmentEndDateTime.isError && (
            <p>올바른 채용 마감일을 선택해주세요.</p>
          )}
          {responseMessage !== '' && (
            <FormErrorResponse>{responseMessage}</FormErrorResponse>
          )}
        </LabelContainer>
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
            onClick={handleSubmit}
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
