import { useMutation } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import {
  Button,
  FormContainer,
  LabelContainer,
  SubmitButton,
  TextInput,
} from '@waffle/design-system';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { createErrorMessage } from '@/entities/errors';
import type { PostRequest, Series } from '@/entities/post';
import type { JobMajorCategory, JobMinorCategory } from '@/entities/post';
import { JOB_CATEGORY_MAP, JOB_MAJOR_CATEGORIES } from '@/entities/post';
import { postPresentation } from '@/feature/post/presentation/postPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { formatMajorJobToLabel, formatMinorJobToLabel } from '@/util/format';

type CompanyBody = {
  companyName: string;
  email: string;
  slogan: string;
  series: Series;
  imageLink: string;
  investAmount: number;
  investCompany: string;
  tags?: string[];
  IRDeckLink?: string;
  landingPageLink?: string;
  externalDescriptionLink?: { link: string; description: string }[];
  explanation: string;
};

export const CreatePostForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const location = useLocation();
  const state = location.state as CompanyBody | undefined;

  const { createPost, isPending } = useCreatePost({ setResponseMessage });

  const {
    title,
    jobMajorCategory,
    jobMinorCategory,
    headcount,
    detail,
    employmentEndDateTime,
  } = postPresentation.useValidator({});

  const { rawHeadcount, employmentEndDate, employmentEndTime } =
    postPresentation.useUtilState();

  const { toMain } = useRouteNavigation();

  const handleSubmit = () => {
    setIsSubmit(true);
    if (jobMinorCategory.value === 'NONE' || state === undefined) {
      return;
    }
    createPost({
      post: {
        // TODO: athor 정보 불러오기
        author: {
          id: '...',
          name: '...',
        },
        ...state,
        title: title.value,
        category: jobMinorCategory.value,
        headcount: headcount.value,
        detail: detail.value,
        employmentEndDate: employmentEndDateTime.value,
      },
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
      <FormContainer
        id="CreatePostForm"
        handleSubmit={handleSubmit}
        response={responseMessage}
      >
        <LabelContainer label="공고명" id="title">
          <TextInput
            id="title"
            value={title.value}
            disabled={isPending}
            onChange={(e) => {
              title.onChange(e.target.value);
            }}
            placeholder="공고명을 입력해주세요."
          />
          {isSubmit && title.isError && (
            <p>공고명은 500자 이내로 작성해주세요.</p>
          )}
        </LabelContainer>
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
              value={rawHeadcount.value}
              disabled={isPending}
              onChange={(e) => {
                rawHeadcount.onChange(e.target.value);
                headcount.onChange(Number(e.target.value));
              }}
              placeholder="모집 인원 수"
            />
            {isSubmit && headcount.isError && (
              <p>모집 인원은 0 또는 양의 정수여야 합니다.</p>
            )}
          </LabelContainer>
        </div>
        <LabelContainer label="상세 공고 글" id="detail">
          <div data-color-mode="light">
            <MDEditor
              id="detail"
              value={detail.value}
              onChange={(value) => {
                detail.onChange(value ?? '');
              }}
            />
          </div>
          {isSubmit && detail.isError && (
            <p>상세 공고 글은 10,000자 이상 작성하실 수 없습니다.</p>
          )}
        </LabelContainer>
        <LabelContainer label="채용 마감일" id="employmentEndDate">
          <input
            id="employmentEndDate"
            type="date"
            value={employmentEndDate.value}
            disabled={isPending}
            onChange={(e) => {
              employmentEndDate.onChange(e.target.value);
              employmentEndDateTime.onChange(
                `${e.target.value}T${employmentEndTime.value}`,
              );
            }}
          />
          <input
            id="employmentEndTime"
            type="time"
            value={employmentEndTime.value}
            disabled={isPending}
            onChange={(e) => {
              employmentEndTime.onChange(e.target.value);
              employmentEndDateTime.onChange(
                `${employmentEndDate.value}T${e.target.value}`,
              );
            }}
          />
          {isSubmit && employmentEndDate.isError && (
            <p>올바른 채용 마감일을 선택해주세요.</p>
          )}
        </LabelContainer>
        <div>
          <Button onClick={handleClickCancelButton} disabled={isPending}>
            이전으로
          </Button>
          <SubmitButton
            form="CreatePostForm"
            onClick={handleSubmit}
            disabled={isPending}
          >
            제출하기
          </SubmitButton>
        </div>
      </FormContainer>
      {isCancel && (
        <CancelCheckModal onClose={toMain} onCancel={closeCancelModal} />
      )}
    </>
  );
};

const useCreatePost = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { toMain } = useRouteNavigation();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: ({ post }: { post: PostRequest }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.createPost({ token, postContents: post });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toMain();
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
