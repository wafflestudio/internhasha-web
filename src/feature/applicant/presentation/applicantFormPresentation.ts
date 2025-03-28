import type { Input, InputForForm, ListInput } from '@/entities/input';
import type { Link } from '@/entities/post';
import type { ApplicantInputPresentation } from '@/feature/applicant/presentation/applicantInputPresentation';
import { convertEmptyStringToUndefined } from '@/lib/responseConverter';

type InitialFormState = {
  enrollYear?: number;
  departments?: string;
  positions?: string[];
  slogan?: string;
  explanation?: string;
  stacks?: string[];
  imagePreview?: { file: File; url: string } | null;
  cvPreview?: { file: File; url: string } | null;
  portfolioPreview?: { file: File; url: string } | null;
  links?: Link[];
};

type ApplicantFormPresentation = {
  useValidator({
    initialState,
    applicantInputPresentation,
  }: {
    initialState?: InitialFormState;
    applicantInputPresentation: ApplicantInputPresentation;
  }): {
    inputStates: {
      enrollYear: Input<string>;
      majorDepartment: Input<string>;
      rawMinorDepartment: Input<string>;
      minorDepartments: ListInput<string>;
      rawPosition: Input<string>;
      positions: ListInput<string>;
      slogan: Input<string>;
      explanation: Input<string>;
      rawStack: Input<string>;
      stacks: ListInput<string>;
      imagePreview: Input<{ file: File; url: string } | null>;
      cvPreview: Input<{ file: File; url: string } | null>;
      portfolioPreview: Input<{ file: File; url: string } | null>;
      rawLink: Input<Link>;
      links: ListInput<Link>;
    };
    formStates: {
      enrollYear: InputForForm<number>;
      departments: InputForForm<string>;
      positions: InputForForm<string[] | undefined>;
      slogan: InputForForm<string | undefined>;
      explanation: InputForForm<string | undefined>;
      stacks: InputForForm<string[] | undefined>;
      imagePreview: InputForForm<{ file: File; url: string } | null>;
      cvPreview: InputForForm<{ file: File; url: string } | null>;
      portfolioPreview: Input<{ file: File; url: string } | null>;
      links: InputForForm<Link[] | undefined>;
    };
  };
};

export const applicantFormPresentation: ApplicantFormPresentation = {
  useValidator: ({ initialState, applicantInputPresentation }) => {
    const departmentList = initialState?.departments?.split(',');

    const initialStateForInput = {
      enrollYear:
        initialState !== undefined
          ? String(initialState.enrollYear)
          : undefined,
      majorDepartment:
        departmentList !== undefined ? departmentList[0] : undefined,
      minorDepartment:
        departmentList !== undefined ? departmentList.slice(1) : undefined,
      positions: initialState?.positions,
      slogan: initialState?.slogan,
      explanation: initialState?.explanation,
      stacks: initialState?.stacks,
      imagePreview: initialState?.imagePreview,
      cvPreview: initialState?.cvPreview,
      portfolioPreview: initialState?.portfolioPreview,
      links: initialState?.links,
    };

    const {
      enrollYear,
      majorDepartment,
      rawMinorDepartment,
      minorDepartments,
      rawPosition,
      positions,
      slogan,
      explanation,
      rawStack,
      stacks,
      imagePreview,
      cvPreview,
      portfolioPreview,
      rawLink,
      links,
    } = applicantInputPresentation.useValidator({
      initialState: initialStateForInput,
    });

    const filteredLinks = links.value.filter(
      (item) =>
        item.link.trim().length !== 0 && item.description.trim().length !== 0,
    );

    const formatEnrollYear = (year: number) => {
      if (year < 50) {
        return 2000 + year;
      } else {
        return 1900 + year;
      }
    };

    return {
      inputStates: {
        enrollYear,
        majorDepartment,
        rawMinorDepartment,
        minorDepartments,
        rawPosition,
        positions,
        slogan,
        explanation,
        rawStack,
        stacks,
        imagePreview,
        cvPreview,
        portfolioPreview,
        rawLink,
        links,
      },
      formStates: {
        enrollYear: {
          isError:
            enrollYear.value.trim().length === 0 ||
            isNaN(Number(enrollYear.value)) ||
            Number(enrollYear.value) < 0,
          value: formatEnrollYear(Number(enrollYear.value)),
        },
        departments: {
          isError:
            majorDepartment.isError ||
            majorDepartment.value.trim().length === 0 ||
            minorDepartments.isError,
          value: [majorDepartment.value, ...minorDepartments.value].join(','),
        },
        positions: {
          isError: positions.isError,
          value: positions.value.length !== 0 ? positions.value : undefined,
        },
        slogan: {
          isError: slogan.isError,
          value: convertEmptyStringToUndefined(slogan.value),
        },
        explanation: {
          isError: explanation.isError,
          value: convertEmptyStringToUndefined(explanation.value),
        },
        stacks: {
          isError: stacks.isError,
          value: stacks.value.length !== 0 ? stacks.value : undefined,
        },
        links: {
          isError: links.isError,
          value: filteredLinks.length !== 0 ? filteredLinks : undefined,
        },
        imagePreview,
        cvPreview,
        portfolioPreview,
      },
    };
  },
};
