import {
  FormContainer,
  LabelContainer,
  SubmitButton,
  TextInput,
} from '@waffle/design-system';
import { useState } from 'react';

import type {
  JobMajorCategory,
  JobMinorCategory,
} from '@/feature/post/presentation/postPresentation';
import {
  JOB_CATEGORY_MAP,
  JOB_MAJOR_CATEGORIES,
  postPresentation,
} from '@/feature/post/presentation/postPresentation';
export const CreatePostForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const formatMajorValueToLabel = (input: string) => {
    switch (input) {
      case 'DEVELOPMENT':
        return '개발';
      case 'PLANNER':
        return '기획';
      case 'DESIGNER':
        return '디자인';
      case 'MARKETING':
        return '마케팅';
      default:
        return null;
    }
  };
  const formatMinorValueToLabel = (input: string) => {
    switch (input) {
      case 'FRONT':
        return '프론트엔드 개발';
      case 'BACKEND':
        return '백엔드 개발';
      case 'APP':
        return '앱 개발';
      case 'DATA':
        return '데이터 분석';
      case 'OTHERS':
        return '기타';
      case 'PLANNER':
        return '기획';
      case 'DESIGNER':
        return '디자인';
      case 'MARKETING':
        return '마케팅';
      default:
        return null;
    }
  };

  const {
    title,
    jobMajorCategory,
    jobMinorCategory,
    headcount,
    content,
    employmentEndDateTime,
  } = postPresentation.useValidator({});

  const { rawHeadcount, employmentEndDate, employmentEndTime } =
    postPresentation.useUtilState();

  const handleSubmit = () => {
    setIsSubmit(true);
    console.log(
      title,
      jobMajorCategory,
      jobMinorCategory,
      headcount,
      content,
      employmentEndDateTime,
    );
  };

  return (
    <FormContainer
      id="CreatePostForm"
      handleSubmit={handleSubmit}
      response={''}
    >
      <LabelContainer label="공고명" id="title">
        <TextInput
          id="title"
          value={title.value}
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
                onChange={(e) => {
                  jobMajorCategory.onChange(e.target.value as JobMajorCategory);
                }}
              >
                {JOB_MAJOR_CATEGORIES.map((category) => {
                  const label = formatMajorValueToLabel(category);

                  if (label === null) return null;

                  return (
                    <option key={`major-category-${category}`} value={category}>
                      {formatMajorValueToLabel(category)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <select
                value={jobMinorCategory.value}
                onChange={(e) => {
                  jobMinorCategory.onChange(e.target.value as JobMinorCategory);
                }}
              >
                <option value="NONE" selected disabled hidden></option>
                {JOB_CATEGORY_MAP[jobMajorCategory.value].map((subCategory) => (
                  <option
                    key={`sub-category-${subCategory}`}
                    value={subCategory}
                  >
                    {formatMinorValueToLabel(subCategory)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {isSubmit && jobMinorCategory.isError && <p>직무를 선택해주세요.</p>}
        </LabelContainer>
        <LabelContainer label="모집 인원" id="headcount">
          <TextInput
            value={rawHeadcount.value}
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
      <LabelContainer label="상세 공고 글" id="content">
        <TextInput
          id="content"
          value={content.value}
          onChange={(e) => {
            content.onChange(e.target.value);
          }}
          placeholder="직무 설명, 근무 조건, 지원 조건, 지원 절차 등에 대해 구체적으로 작성해주세요."
        />
        {isSubmit && content.isError && (
          <p>상세 공고 글은 10,000자 이상 작성하실 수 없습니다.</p>
        )}
      </LabelContainer>
      <LabelContainer label="채용 마감일" id="employmentEndDate">
        <input
          id="employmentEndDate"
          type="date"
          value={employmentEndDate.value}
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
      <SubmitButton form="CreatePostForm" onClick={handleSubmit}>
        제출하기
      </SubmitButton>
    </FormContainer>
  );
};
