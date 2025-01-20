import {
  FormContainer,
  LabelContainer,
  SubmitButton,
  TextInput,
} from '@waffle/design-system';

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
    employmentEndDate,
  } = postPresentation.useValidator({});

  const handleSubmit = () => {
    console.log(
      title,
      jobMajorCategory,
      jobMinorCategory,
      headcount,
      content,
      employmentEndDate,
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
      </LabelContainer>
      <div>
        <LabelContainer label="직무 유형" id="job">
          <div>
            <select
              value={jobMajorCategory.value}
              onChange={(e) => {
                if (JOB_MAJOR_CATEGORIES.includes(e.target.value)) {
                  jobMajorCategory.onChange(e.target.value as JobMajorCategory);
                }
              }}
            >
              {JOB_MAJOR_CATEGORIES.map((category) => {
                const label = formatMajorValueToLabel(category);

                if (label === null) return null;

                return (
                  <option key={category} value={category}>
                    {formatMajorValueToLabel(category)}
                  </option>
                );
              })}
            </select>
            <select
              value={jobMinorCategory.value}
              onChange={(e) => {
                if (
                  JOB_CATEGORY_MAP[jobMajorCategory.value].includes(
                    e.target.value as JobMinorCategory,
                  )
                ) {
                  jobMinorCategory.onChange(e.target.value as JobMinorCategory);
                }
              }}
            >
              {JOB_CATEGORY_MAP[jobMajorCategory.value].map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {formatMinorValueToLabel(subCategory)}
                </option>
              ))}
            </select>
          </div>
        </LabelContainer>
        <LabelContainer label="모집 인원" id="headcount">
          <TextInput
            value={headcount.value}
            onChange={(e) => {
              headcount.onChange(e.target.value);
            }}
            placeholder="모집 인원 수"
          />
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
      </LabelContainer>
      <LabelContainer label="채용 마감일" id="employmentEndDate">
        <input
          id="employmentEndDate"
          type="date"
          value={employmentEndDate.value}
          onChange={(e) => {
            employmentEndDate.onChange(e.target.value);
          }}
        />
      </LabelContainer>
      <SubmitButton form="CreatePostForm" onClick={handleSubmit}>
        제출하기
      </SubmitButton>
    </FormContainer>
  );
};
