import type { Domain } from '@/entities/company';
import type {
  Input,
  InputForForm,
  ListInput,
  SelectInput,
} from '@/entities/input';
import type { Link } from '@/entities/link';
import type { CompanyInputPresentation } from '@/feature/company/presentation/companyInputPresentation';
import { convertEmptyStringToUndefined } from '@/lib/responseConverter';

type InitialState = {
  companyEstablishedYear?: number;
  domain?: Domain | 'NONE';
  headcount?: number;
  location?: string;
  slogan?: string;
  detail?: string;
  profileImagePreview?: { file: File; url: string } | null;
  companyInfoPDFPreview?: { file: File; url: string } | null;
  landingPageLink?: string;
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
      companyEstablishedYear: Input<string>;
      domain: SelectInput<Domain | 'NONE'>;
      headcount: Input<string>;
      mainLocation: Input<string>;
      detailedLocation: Input<string>;
      slogan: Input<string>;
      detail: Input<string>;
      profileImagePreview: Input<{ file: File; url: string } | null>;
      companyInfoPDFPreview: Input<{ file: File; url: string } | null>;
      landingPageLink: Input<string>;
      rawLink: Input<Link>;
      links: ListInput<Link>;
      rawTag: Input<string>;
      tags: ListInput<string>;
    };
    formStates: {
      companyEstablishedYear: InputForForm<number>;
      domain: InputForForm<Domain | 'NONE'>;
      headcount: InputForForm<number>;
      location: InputForForm<string>;
      slogan: InputForForm<string>;
      detail: InputForForm<string>;
      landingPageLink: InputForForm<string | undefined>;
      links: InputForForm<Link[] | undefined>;
      tags: InputForForm<{ tag: string }[] | undefined>;
    };
  };
};

export const companyFormPresentation: CompanyFormPresentation = {
  useValidator: ({ initialState, companyInputPresentation }) => {
    const initialStateForInput = {
      companyEstablishedYear:
        initialState?.companyEstablishedYear !== undefined
          ? String(initialState.companyEstablishedYear)
          : undefined,
      domain: initialState?.domain,
      headcount:
        initialState?.headcount !== undefined
          ? String(initialState.headcount)
          : undefined,
      mainLocation: initialState?.location?.split('|')[0],
      detailedLocation: initialState?.location?.split('|')[1],
      slogan: initialState?.slogan,
      detail: initialState?.detail,
      profileImagePreview: initialState?.profileImagePreview,
      companyInfoPDFPreview: initialState?.companyInfoPDFPreview,
      landingPageLink: initialState?.landingPageLink,
      links: initialState?.links,
      tags: initialState?.tags,
    };

    const {
      companyEstablishedYear,
      domain,
      headcount,
      mainLocation,
      detailedLocation,
      slogan,
      detail,
      profileImagePreview,
      companyInfoPDFPreview,
      landingPageLink,
      rawLink,
      links,
      rawTag,
      tags,
    } = companyInputPresentation.useValidator({
      initialState: initialStateForInput,
    });

    const filteredLinks = links.value.filter(
      (item) =>
        item.link.trim().length !== 0 && item.description.trim().length !== 0,
    );

    return {
      inputStates: {
        companyEstablishedYear,
        domain,
        headcount,
        mainLocation,
        detailedLocation,
        slogan,
        detail,
        profileImagePreview,
        companyInfoPDFPreview,
        landingPageLink,
        rawLink,
        links,
        rawTag,
        tags,
      },
      formStates: {
        companyEstablishedYear: {
          isError:
            companyEstablishedYear.value.trim().length === 0 ||
            isNaN(Number(companyEstablishedYear.value)) ||
            Number(companyEstablishedYear.value) < 0,
          value: Number(companyEstablishedYear.value),
        },
        domain: {
          isError: domain.isError || domain.value === 'NONE',
          value: domain.value,
        },
        headcount: {
          isError:
            headcount.value.trim().length === 0 ||
            isNaN(Number(headcount.value)) ||
            Number(headcount.value) < 1,
          value: Number(headcount.value),
        },
        location: {
          isError:
            mainLocation.isError ||
            detailedLocation.isError ||
            mainLocation.value.trim().length === 0 ||
            detailedLocation.value.trim().length === 0,
          value: `${mainLocation.value}|${detailedLocation.value}`,
        },
        slogan: {
          isError: slogan.isError || slogan.value.trim().length === 0,
          value: slogan.value,
        },
        detail: {
          isError: detail.isError || detail.value.trim().length === 0,
          value: detail.value,
        },
        landingPageLink: {
          isError: landingPageLink.isError,
          value: convertEmptyStringToUndefined(landingPageLink.value),
        },
        links: {
          isError: links.isError,
          value: filteredLinks.length !== 0 ? filteredLinks : undefined,
        },
        tags: {
          isError: tags.isError,
          value:
            tags.value.length !== 0
              ? tags.value.map((item) => ({ tag: item }))
              : undefined,
        },
      },
    };
  },
};
