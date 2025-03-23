import type {
  Input,
  InputForForm,
  ListInput,
  SelectInput,
} from '@/entities/input';
import type { Link, Series } from '@/entities/post';
import type { CompanyInputPresentation } from '@/feature/company/presentation/companyInputPresentation';

type InitialState = {
  companyName?: string;
  explanation?: string;
  email?: string;
  slogan?: string;
  investAmount?: number;
  investCompany?: string[];
  series?: Series | 'NONE';
  irDeckPreview?: { file: File; url: string } | null;
  irDeckLink?: string;
  landingPageLink?: string;
  imagePreview?: { file: File; url: string } | null;
  imageLink?: string;
  links?: Link[];
  tags?: string[];
};

type CompanyFormPresentation = {
  useValidator({
    initialState,
    companyInputPresentation,
  }: {
    initialState?: InitialState;
    companyInputPresentation: CompanyInputPresentation;
  }): {
    inputStates: {
      companyName: Input<string>;
      explanation: Input<string>;
      email: Input<string>;
      slogan: Input<string>;
      investAmount: Input<string>;
      rawInvestCompany: Input<string>;
      investCompany: ListInput<string>;
      series: SelectInput<Series | 'NONE'>;
      irDeckPreview: Input<{ file: File; url: string } | null>;
      landingPageLink: Input<string>;
      imagePreview: Input<{ file: File; url: string } | null>;
      rawLink: Input<Link>;
      links: ListInput<Link>;
      rawTag: Input<string>;
      tags: ListInput<string>;
    };
    formStates: {
      companyName: InputForForm<string>;
      explanation: InputForForm<string>;
      email: InputForForm<string>;
      slogan: InputForForm<string>;
      investAmount: InputForForm<number>;
      investCompany: InputForForm<string>;
      series: InputForForm<Series | 'NONE'>;
      landingPageLink: InputForForm<string | undefined>;
      links: InputForForm<Link[] | undefined>;
      tags: InputForForm<{ tag: string }[] | undefined>;
    };
  };
};

const MAX_INVEST_AMOUNT = 100000;

export const companyFormPresentation: CompanyFormPresentation = {
  useValidator: ({ initialState, companyInputPresentation }) => {
    const initialStateForInput = {
      companyName: initialState?.companyName,
      explanation: initialState?.explanation,
      email: initialState?.email,
      slogan: initialState?.slogan,
      investAmount:
        initialState !== undefined
          ? String(initialState.investAmount)
          : undefined,
      investCompany: initialState?.investCompany,
      series: initialState?.series,
      irDeckPreview: initialState?.irDeckPreview,
      landingPageLink: initialState?.landingPageLink,
      imagePreview: initialState?.imagePreview,
      links: initialState?.links,
      tags: initialState?.tags,
    };

    const {
      companyName,
      explanation,
      email,
      slogan,
      investAmount,
      rawInvestCompany,
      investCompany,
      series,
      irDeckPreview,
      landingPageLink,
      imagePreview,
      rawLink,
      links,
      rawTag,
      tags,
    } = companyInputPresentation.useValidator({
      initialState: initialStateForInput,
    });

    const isEmptyElementsInFilteredStringList = (input: string[]) => {
      const filteredInput = input.filter((item) => item.trim().length !== 0);
      return filteredInput.length === 0;
    };

    const filteredLinks = links.value.filter(
      (item) =>
        item.link.trim().length !== 0 && item.description.trim().length !== 0,
    );

    return {
      inputStates: {
        companyName,
        explanation,
        email,
        slogan,
        investAmount,
        rawInvestCompany,
        investCompany,
        series,
        irDeckPreview,
        landingPageLink,
        imagePreview,
        rawLink,
        links,
        rawTag,
        tags,
      },
      formStates: {
        companyName: {
          isError: companyName.isError || companyName.value.trim().length === 0,
          value: companyName.value,
        },
        explanation: {
          isError: explanation.isError || explanation.value.trim().length === 0,
          value: explanation.value,
        },
        email: {
          isError: email.isError || email.value.trim().length === 0,
          value: email.value,
        },
        slogan: {
          isError: slogan.isError || slogan.value.trim().length === 0,
          value: slogan.value,
        },
        series: {
          isError: series.isError || series.value === 'NONE',
          value: series.value,
        },
        investAmount: {
          isError:
            investAmount.value.trim().length === 0 ||
            isNaN(Number(investAmount.value)) ||
            Number(investAmount.value) < 0 ||
            Number(investAmount.value) > MAX_INVEST_AMOUNT,
          value: Number(investAmount.value),
        },
        investCompany: {
          isError:
            investCompany.isError ||
            isEmptyElementsInFilteredStringList(investCompany.value),
          value: investCompany.value
            .filter((item) => item.trim().length !== 0)
            .join(','),
        },
        tags: {
          isError: tags.isError,
          value:
            tags.value.length !== 0
              ? tags.value.map((item) => ({ tag: item }))
              : undefined,
        },
        landingPageLink: {
          isError: landingPageLink.isError,
          value:
            landingPageLink.value.trim().length !== 0
              ? landingPageLink.value
              : undefined,
        },
        links: {
          isError: links.isError,
          value: filteredLinks.length !== 0 ? filteredLinks : undefined,
        },
      },
    };
  },
};
