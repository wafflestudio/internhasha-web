import { useState } from 'react';

import type { SelectInput, StringInput } from '@/entities/input';

export type JobMajorCategory =
  | 'DEVELOPMENT'
  | 'DESIGNER'
  | 'PLANNER'
  | 'MARKETING';

type JobMinorCategoryMap = {
  DEVELOPMENT: 'FRONT' | 'APP' | 'BACKEND' | 'DATA' | 'OTHERS';
  DESIGNER: 'DESIGNER';
  PLANNER: 'PLANNER';
  MARKETING: 'MARKETING';
};

export type JobMinorCategory =
  | JobMinorCategoryMap[keyof JobMinorCategoryMap]
  | 'NONE';

export const JOB_CATEGORY_MAP: Record<JobMajorCategory, JobMinorCategory[]> = {
  DEVELOPMENT: ['FRONT', 'APP', 'BACKEND', 'DATA', 'OTHERS'],
  DESIGNER: ['DESIGNER'],
  PLANNER: ['PLANNER'],
  MARKETING: ['MARKETING'],
};

export const JOB_MAJOR_CATEGORIES = Object.keys(JOB_CATEGORY_MAP);

type InitialState = {
  title?: string;
  jobMajorCategory?: JobMajorCategory;
  jobMinorCategory?: JobMinorCategory;
  headcount?: string;
  content?: string;
  employmentEndDate?: string;
};

type PostPresentation = {
  useValidator({ initialState }: { initialState?: InitialState }): {
    title: StringInput;
    jobMajorCategory: SelectInput<JobMajorCategory>;
    jobMinorCategory: SelectInput<JobMinorCategory>;
    headcount: StringInput;
    content: StringInput;
    employmentEndDate: StringInput;
  };
};

const TITLE_MAX_LENGTH = 500;
const CONTENT_MAX_LENGTH = 10000;
const JOB_INVALID = 'NONE';
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

export const postPresentation: PostPresentation = {
  useValidator: ({ initialState = {} }) => {
    const [title, setTitle] = useState(
      initialState.title !== undefined ? initialState.title : '',
    );

    const [jobMajorCategory, setJobMajorCategory] = useState<JobMajorCategory>(
      initialState.jobMajorCategory !== undefined
        ? initialState.jobMajorCategory
        : 'DEVELOPMENT',
    );

    const [jobMinorCategory, setJobMinorCategory] = useState<JobMinorCategory>(
      initialState.jobMinorCategory !== undefined
        ? initialState.jobMinorCategory
        : 'NONE',
    );

    const [headcount, setHeadcount] = useState(
      initialState.headcount !== undefined ? initialState.headcount : '',
    );

    const [content, setContent] = useState(
      initialState.content !== undefined ? initialState.content : '',
    );

    const [employmentEndDate, setEmploymentEndDate] = useState(
      initialState.employmentEndDate !== undefined
        ? initialState.employmentEndDate
        : '',
    );

    const isJobMinorCategoryValid = (
      major: JobMajorCategory,
      minor: JobMinorCategory,
    ) => {
      if (jobMinorCategory === JOB_INVALID) {
        return false;
      }
      return minor in JOB_CATEGORY_MAP[major];
    };

    const isEmploymentEndDateValid = (input: string) => {
      if (!DATE_REGEX.test(input)) {
        return false;
      }
      const inputDate = new Date(input);
      const today = new Date();
      return inputDate > today;
    };

    const handleTitleChange = (input: string) => {
      setTitle(input);
    };

    const handleJobMajorCategoryChange = (input: JobMajorCategory) => {
      setJobMajorCategory(input);
      setJobMinorCategory('NONE');
    };

    const handleJobMinorCategoryChange = (input: JobMinorCategory) => {
      if (isJobMinorCategoryValid(jobMajorCategory, input)) {
        setJobMinorCategory(input);
      }
    };

    const handleHeadcountChange = (input: string) => {
      setHeadcount(input);
    };

    const handleContentChange = (input: string) => {
      setContent(input);
    };

    const handleEmploymentEndDateChange = (input: string) => {
      setEmploymentEndDate(input);
    };

    return {
      title: {
        isError: title.length > TITLE_MAX_LENGTH,
        value: title,
        onChange: handleTitleChange,
      },
      jobMajorCategory: {
        isError: false,
        value: jobMajorCategory,
        onChange: handleJobMajorCategoryChange,
      },
      jobMinorCategory: {
        isError: isJobMinorCategoryValid(jobMajorCategory, jobMinorCategory),
        value: jobMinorCategory,
        onChange: handleJobMinorCategoryChange,
      },
      headcount: {
        isError: isNaN(Number(headcount)),
        value: headcount,
        onChange: handleHeadcountChange,
      },
      content: {
        isError: content.length > CONTENT_MAX_LENGTH,
        value: content,
        onChange: handleContentChange,
      },
      employmentEndDate: {
        isError: isEmploymentEndDateValid(employmentEndDate),
        value: employmentEndDate,
        onChange: handleEmploymentEndDateChange,
      },
    };
  },
};
