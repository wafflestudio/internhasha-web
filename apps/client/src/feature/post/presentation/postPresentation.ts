import { useState } from 'react';

import type { Input, SelectInput } from '@/entities/input';

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
  headcount?: number;
  content?: string;
  employmentEndDate?: string;
};

type PostPresentation = {
  useValidator({ initialState }: { initialState?: InitialState }): {
    title: Input<string>;
    jobMajorCategory: SelectInput<JobMajorCategory>;
    jobMinorCategory: SelectInput<JobMinorCategory>;
    headcount: Input<number>;
    content: Input<string>;
    employmentEndDateTime: Input<string>;
  };
  useUtilState(): {
    rawHeadcount: Input<string>;
    employmentEndDate: Input<string>;
    employmentEndTime: Input<string>;
  };
};

const TITLE_MAX_LENGTH = 500;
const CONTENT_MAX_LENGTH = 10000;
const HEADCOUNT_REGEX = /^\d+$/;
const DATE_TIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^\d{2}:\d{2}:\d{2}$/;

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
      initialState.headcount !== undefined ? initialState.headcount : 0,
    );
    const [content, setContent] = useState(
      initialState.content !== undefined ? initialState.content : '',
    );
    const [employmentEndDateTime, setEmploymentEndDateTime] = useState(
      initialState.employmentEndDate !== undefined
        ? initialState.employmentEndDate
        : '',
    );

    const isJobMinorCategoryValid = (
      major: JobMajorCategory,
      minor: JobMinorCategory,
    ) => {
      if (minor === 'NONE') {
        return false;
      }
      return JOB_CATEGORY_MAP[major].includes(minor);
    };

    const handleTitleChange = (input: string) => {
      setTitle(input);
    };

    const handleJobMajorCategoryChange = (input: JobMajorCategory) => {
      setJobMajorCategory(input);
      setJobMinorCategory('NONE');
    };

    const handleJobMinorCategoryChange = (input: JobMinorCategory) => {
      setJobMinorCategory(input);
    };

    const handleHeadcountChange = (input: number) => {
      setHeadcount(input);
    };

    const handleContentChange = (input: string) => {
      setContent(input);
    };

    const handleEmploymentEndDateTimeChange = (input: string) => {
      setEmploymentEndDateTime(input);
    };

    return {
      title: {
        isError: title.length > TITLE_MAX_LENGTH || title.length === 0,
        value: title,
        onChange: handleTitleChange,
      },
      jobMajorCategory: {
        isError: false,
        value: jobMajorCategory,
        onChange: handleJobMajorCategoryChange,
      },
      jobMinorCategory: {
        isError: !isJobMinorCategoryValid(jobMajorCategory, jobMinorCategory),
        value: jobMinorCategory,
        onChange: handleJobMinorCategoryChange,
      },
      headcount: {
        isError: isNaN(headcount) || headcount <= 0,
        value: headcount,
        onChange: handleHeadcountChange,
      },
      content: {
        isError: content.length > CONTENT_MAX_LENGTH || content.length === 0,
        value: content,
        onChange: handleContentChange,
      },
      employmentEndDateTime: {
        isError: DATE_TIME_REGEX.test(employmentEndDateTime),
        value: `${employmentEndDateTime}:00`,
        onChange: handleEmploymentEndDateTimeChange,
      },
    };
  },
  useUtilState: () => {
    const [rawHeadcount, setRawHeadcount] = useState('');
    const [employmentEndDate, setEmploymentEndDate] = useState('');
    const [employmentEndTime, setEmploymentEndTime] = useState('');

    const isEmploymentEndDateValid = (input: string) => {
      if (!DATE_REGEX.test(input)) {
        return false;
      }
      const inputDate = new Date(input);
      const today = new Date();
      return inputDate > today;
    };
    const isEmploymentEndTimeValid = (input: string) => {
      return TIME_REGEX.test(input);
    };

    const handleRawHeadcount = (input: string) => {
      setRawHeadcount(input);
    };
    const handleEmploymentEndDateChange = (input: string) => {
      setEmploymentEndDate(input);
    };
    const handleEmploymentEndTimeChange = (input: string) => {
      setEmploymentEndTime(input);
    };

    return {
      rawHeadcount: {
        isError: HEADCOUNT_REGEX.test(rawHeadcount),
        value: rawHeadcount,
        onChange: handleRawHeadcount,
      },
      employmentEndDate: {
        isError: !isEmploymentEndDateValid(employmentEndDate),
        value: employmentEndDate,
        onChange: handleEmploymentEndDateChange,
      },
      employmentEndTime: {
        isError: !isEmploymentEndTimeValid(employmentEndTime),
        value: employmentEndTime,
        onChange: handleEmploymentEndTimeChange,
      },
    };
  },
};
