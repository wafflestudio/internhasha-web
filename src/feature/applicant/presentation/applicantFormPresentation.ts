import type {
  Input,
  InputForForm,
  ListInput,
  SelectInput,
} from '@/entities/input';
import type { JobMinorCategory, Link } from '@/entities/post';
import type { ApplicantInputPresentation } from '@/feature/applicant/presentation/applicantInputPresentation';
import { convertEmptyStringToUndefined } from '@/lib/responseConverter';

type InitialFormState = {
  enrollYear?: number;
  department?: string;
  positions?: JobMinorCategory[];
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
      department: Input<string>;
      rawPosition: SelectInput<JobMinorCategory | 'NONE'>;
      positions: ListInput<JobMinorCategory>;
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
      positions: InputForForm<JobMinorCategory[] | undefined>;
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
    const initialStateForInput = {
      enrollYear:
        initialState !== undefined
          ? String(initialState.enrollYear)
          : undefined,
      department: initialState?.department,
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
      department,
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

    return {
      inputStates: {
        enrollYear,
        department,
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
          value: Number(enrollYear.value),
        },
        department: {
          isError: department.isError || department.value.trim().length === 0,
          value: department.value,
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
