import { useState } from 'react';

import type { Input, SelectInput } from '@/entities/input';
import type { JobMajorCategory, JobMinorCategory } from '@/entities/post';
import { JOB_CATEGORY_MAP } from '@/entities/post';

type InitialState = {
  title?: string;
  jobMajorCategory?: JobMajorCategory;
  jobMinorCategory?: JobMinorCategory | 'NONE';
  headcount?: string;
  detail?: string;
  employmentEndDate?: string;
  employmentEndTime?: string;
};

export type PostInputPresentation = {
  useValidator({ initialState }: { initialState?: InitialState }): {
    title: Input<string>;
    jobMajorCategory: SelectInput<JobMajorCategory>;
    jobMinorCategory: SelectInput<JobMinorCategory | 'NONE'>;
    headcount: Input<string>;
    detail: Input<string>;
    employmentEndDate: Input<string>;
    employmentEndTime: Input<string>;
  };
};

const TITLE_MAX_LENGTH = 500;
export const CONTENT_MAX_LENGTH = 10000;
const HEADCOUNT_REGEX = /^\s*$|^[0-9]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^\d{2}:\d{2}$/;

export const postInputPresentation: PostInputPresentation = {
  useValidator: ({ initialState }) => {
    const [title, setTitle] = useState(
      initialState?.title !== undefined ? initialState.title : '',
    );
    const [jobMajorCategory, setJobMajorCategory] = useState<JobMajorCategory>(
      initialState?.jobMajorCategory !== undefined
        ? initialState.jobMajorCategory
        : 'DEVELOPMENT',
    );
    const [jobMinorCategory, setJobMinorCategory] = useState<
      JobMinorCategory | 'NONE'
    >(
      initialState?.jobMinorCategory !== undefined
        ? initialState.jobMinorCategory
        : 'NONE',
    );
    const [headcount, setHeadcount] = useState(
      initialState?.headcount !== undefined ? initialState.headcount : '',
    );
    const [detail, setDetail] = useState(
      initialState?.detail !== undefined
        ? initialState.detail
        : '직무 설명, 근무 조건, 지원 조건, 지원 절차 등에 대해 구체적으로 작성해주세요.',
    );
    const [employmentEndDate, setEmploymentEndDate] = useState(
      initialState?.employmentEndDate !== undefined
        ? initialState.employmentEndDate
        : '',
    );
    const [employmentEndTime, setEmploymentEndTime] = useState(
      initialState?.employmentEndTime !== undefined
        ? initialState.employmentEndTime
        : '',
    );

    const isJobMinorCategoryValid = (
      major: JobMajorCategory,
      minor: JobMinorCategory | 'NONE',
    ) => {
      if (minor === 'NONE') {
        return false;
      }
      return JOB_CATEGORY_MAP[major].includes(minor);
    };

    const handleJobMajorCategoryChange = (input: JobMajorCategory) => {
      setJobMajorCategory(input);
      setJobMinorCategory('NONE');
    };

    return {
      title: {
        isError: title.length > TITLE_MAX_LENGTH || title.length === 0,
        value: title,
        onChange: setTitle,
      },
      jobMajorCategory: {
        isError: false,
        value: jobMajorCategory,
        onChange: handleJobMajorCategoryChange,
      },
      jobMinorCategory: {
        isError: !isJobMinorCategoryValid(jobMajorCategory, jobMinorCategory),
        value: jobMinorCategory,
        onChange: setJobMinorCategory,
      },
      headcount: {
        isError: !HEADCOUNT_REGEX.test(headcount),
        value: headcount,
        onChange: setHeadcount,
      },
      detail: {
        isError: detail.length > CONTENT_MAX_LENGTH || detail.length === 0,
        value: detail,
        onChange: setDetail,
      },
      employmentEndDate: {
        isError:
          employmentEndDate.trim().length !== 0 &&
          !DATE_REGEX.test(employmentEndDate),
        value: employmentEndDate,
        onChange: setEmploymentEndDate,
      },
      employmentEndTime: {
        isError:
          employmentEndTime.trim().length !== 0 &&
          !TIME_REGEX.test(employmentEndTime),
        value: employmentEndTime,
        onChange: setEmploymentEndTime,
      },
    };
  },
};
