import type { Input, InputForForm, ListInput } from '@/entities/input';
import type { Link } from '@/entities/link';
import type { ApplicantInputPresentation } from '@/feature/applicant/presentation/applicantInputPresentation';
import { convertEmptyStringToUndefined } from '@/lib/responseConverter';

type InitialFormState = {
  enrollYear?: number;
  department?: string;
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
      minorDepartment: ListInput<string>;
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
      department: InputForForm<string>;
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
    const shortenedToCompleteYear = (year: number) => {
      if (year < 50) {
        return 2000 + year;
      } else {
        return 1900 + year;
      }
    };

    const completeToShortenedYear = (year: number) => {
      if (year > 2000) {
        return year - 2000;
      } else {
        return year - 1900;
      }
    };

    const departmentList = initialState?.department?.split(',');

    const initialStateForInput = {
      enrollYear:
        initialState?.enrollYear !== undefined
          ? String(completeToShortenedYear(initialState.enrollYear))
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
      minorDepartment,
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

    const filteredMinors = minorDepartment.value.filter(
      (item) => item.trim().length !== 0,
    );
    const filteredPositions = positions.value.filter(
      (item) => item.trim().length !== 0,
    );
    const filteredLinks = links.value.filter(
      (item) =>
        item.link.trim().length !== 0 && item.description.trim().length !== 0,
    );

    return {
      inputStates: {
        enrollYear,
        majorDepartment,
        rawMinorDepartment,
        minorDepartment,
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
          value: shortenedToCompleteYear(Number(enrollYear.value)),
        },
        department: {
          isError:
            majorDepartment.isError ||
            majorDepartment.value.trim().length === 0 ||
            minorDepartment.isError,
          value: [majorDepartment.value, ...filteredMinors].join(','),
        },
        positions: {
          isError: positions.isError,
          value: filteredPositions.length !== 0 ? filteredPositions : undefined,
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
