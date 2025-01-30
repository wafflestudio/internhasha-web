import { useState } from 'react';

import type { Input, ListInput, SelectInput } from '@/entities/input';
import type { Series } from '@/entities/post';

type ExternalLink = {
  link: string;
  description: string;
};

type InitialInputState = {
  companyName: string;
  explanation: string;
  email: string;
  slogan: string;
  investAmount: string;
  rawInvestCompany: string;
  investCompany: string[];
  series: Series | 'NONE';
  irDeckPreview: { file: File; url: string } | null;
  landingPageLink: string;
  imagePreview: { file: File; url: string } | null;
  rawExternalDescriptionLink: ExternalLink;
  externalDescriptionLink: ExternalLink[];
  rawTag: string;
  tags: string[];
};

export type CompanyInputPresentation = {
  useValidator({ initialState }: { initialState?: InitialInputState }): {
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
    rawExternalDescriptionLink: Input<ExternalLink>;
    externalDescriptionLink: ListInput<ExternalLink>;
    rawTag: Input<string>;
    tags: ListInput<string>;
  };
};

const MAX_COMPANY_NAME_LENGTH = 30;
const MAX_EXPLANATION_LENGTH = 5000;
const MAX_SLOGAN_LENGTH = 100;
const MAX_RAW_INVEST_COMPANY_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 30;
const MAX_TAG_LENGTH = 8;
const MAX_INVEST_COMPANY_SIZE = 10;
const MAX_EXTERNAL_DESCRIPTION_LINK_SIZE = 5;
const MAX_TAGS_SIZE = 10;

const MAX_FILE_SIZE = 5 * 1024 * 2024;
const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

const FILE_EXTENSIONS = ['pdf'];
const IMAGE_EXTENSIONS = [
  'png',
  'jpg',
  'jpeg',
  'gif',
  'bmp',
  'webp',
  'svg',
  'tiff',
  'ico',
  'heif',
  'heic',
];

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const INVEST_AMOUNT_REGEX = /^\s*$|^[0-9]+$/;
const URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const companyInputPresentation: CompanyInputPresentation = {
  useValidator: ({ initialState }) => {
    const [companyName, setCompanyName] = useState(
      initialState?.companyName !== undefined ? initialState.companyName : '',
    );
    const [explanation, setExplanation] = useState(
      initialState?.explanation !== undefined ? initialState.explanation : '',
    );
    const [email, setEmail] = useState(
      initialState?.email !== undefined ? initialState.email : '',
    );
    const [slogan, setSlogan] = useState(
      initialState?.slogan !== undefined ? initialState.slogan : '',
    );
    const [investAmount, setInvestAmount] = useState(
      initialState?.investAmount !== undefined ? initialState.investAmount : '',
    );
    const [rawInvestCompany, setRawInvestCompany] = useState(
      initialState?.rawInvestCompany !== undefined
        ? initialState.rawInvestCompany
        : '',
    );
    const [investCompany, setInvestCompany] = useState<string[]>(
      initialState?.investCompany !== undefined
        ? initialState.investCompany
        : [''],
    );
    const [series, setSeries] = useState<Series | 'NONE'>(
      initialState?.series !== undefined ? initialState.series : 'NONE',
    );
    const [irDeckPreview, setIrDeckPreview] = useState(
      initialState?.irDeckPreview !== undefined
        ? initialState.irDeckPreview
        : null,
    );
    const [landingPageLink, setLandingPageLink] = useState(
      initialState?.landingPageLink !== undefined
        ? initialState.landingPageLink
        : '',
    );
    const [imagePreview, setImagePreview] = useState<{
      file: File;
      url: string;
    } | null>(
      initialState?.imagePreview !== undefined
        ? initialState.imagePreview
        : null,
    );
    const [rawExternalDescriptionLink, setRawExternalDescriptionLink] =
      useState<ExternalLink>(
        initialState?.rawExternalDescriptionLink !== undefined
          ? initialState.rawExternalDescriptionLink
          : { link: '', description: '' },
      );
    const [externalDescriptionLink, setExternalDescriptionLink] = useState<
      ExternalLink[]
    >(
      initialState?.externalDescriptionLink !== undefined
        ? initialState.externalDescriptionLink
        : [{ link: '', description: '' }],
    );
    const [rawTag, setRawTag] = useState(
      initialState?.rawTag !== undefined ? initialState.rawTag : '',
    );
    const [tags, setTags] = useState<string[]>(
      initialState?.tags !== undefined ? initialState.tags : [],
    );

    const isRawInvestCompanyValid = (input: string) => {
      const trimmedInput = input.trim();
      if (
        trimmedInput.length === 0 ||
        trimmedInput.length > MAX_RAW_INVEST_COMPANY_LENGTH
      ) {
        return false;
      }
      if (investCompany.includes(trimmedInput)) {
        return false;
      }
      return true;
    };
    const isInvestCompanyValid = (input: string[]) => {
      if (input.length > MAX_INVEST_COMPANY_SIZE) {
        return false;
      }
      return true;
    };
    const isRawExternalDescriptionLinkValid = (input: ExternalLink) => {
      if (
        input.description.trim().length === 0 ||
        input.description.trim().length > MAX_DESCRIPTION_LENGTH
      ) {
        return false;
      }
      if (!URL_REGEX.test(input.link)) {
        return false;
      }
      if (
        externalDescriptionLink.some(
          (item) =>
            item.link === input.link && item.description === input.description,
        )
      ) {
        return false;
      }
      return true;
    };
    const isExternalLinkValid = (input: ExternalLink[]) => {
      if (input.length > MAX_EXTERNAL_DESCRIPTION_LINK_SIZE) {
        return false;
      }
      return true;
    };
    const isRawTagValid = (input: string) => {
      if (input.trim().length === 0 || input.trim().length > MAX_TAG_LENGTH) {
        return false;
      }
      if (tags.includes(input)) {
        return false;
      }
      return true;
    };
    const isTagsValid = (input: string[]) => {
      if (input.length > MAX_TAGS_SIZE) {
        return false;
      }
      return true;
    };
    const isIrDeckPreviewValid = (
      input: {
        file: File;
        url: string;
      } | null,
    ) => {
      if (input === null) {
        return false;
      }

      const fileExtenstion = input.file.name
        .split('.')
        .pop()
        ?.toLocaleLowerCase();
      if (fileExtenstion === undefined) {
        return false;
      }
      if (!FILE_EXTENSIONS.includes(fileExtenstion)) {
        return false;
      }
      if (input.file.size > MAX_FILE_SIZE) {
        return false;
      }
      return true;
    };
    const isImagePreviewValid = (
      input: {
        file: File;
        url: string;
      } | null,
    ) => {
      if (input === null) {
        return false;
      }

      const fileExtenstion = input.file.name
        .split('.')
        .pop()
        ?.toLocaleLowerCase();
      if (fileExtenstion === undefined) {
        return false;
      }
      if (!IMAGE_EXTENSIONS.includes(fileExtenstion)) {
        return false;
      }
      if (input.file.size > MAX_IMAGE_SIZE) {
        return false;
      }
      return true;
    };

    const handleInvestCompanyChange = ({
      input,
      index,
      mode,
    }:
      | {
          input: string;
          mode: 'ADD' | 'REMOVE';
          index?: never;
        }
      | {
          input: string;
          mode: 'PATCH';
          index: number;
        }) => {
      setInvestCompany((prevState) => {
        switch (mode) {
          case 'ADD':
            return isRawInvestCompanyValid(input)
              ? prevState
              : [...prevState, input];

          case 'REMOVE':
            return prevState.filter((item) => item !== input);

          case 'PATCH':
            if (index < 0 || index >= prevState.length) {
              return prevState;
            }
            return prevState.map((item, idx) => (idx === index ? input : item));

          default:
            return prevState;
        }
      });
    };
    const handleExternalDescriptionLinkChange = ({
      input,
      index,
      mode,
    }:
      | {
          input: ExternalLink;
          index?: never;
          mode: 'ADD' | 'REMOVE';
        }
      | {
          input: ExternalLink;
          index: number;
          mode: 'PATCH';
        }) => {
      setExternalDescriptionLink((prevState) => {
        switch (mode) {
          case 'ADD':
            return isRawExternalDescriptionLinkValid(input)
              ? prevState
              : [...prevState, input];

          case 'REMOVE':
            return prevState.filter(
              (item) =>
                !(
                  item.link === input.link &&
                  item.description === input.description
                ),
            );

          case 'PATCH':
            if (index < 0 || index >= prevState.length) {
              return prevState;
            }
            return prevState.map((item, idx) => (idx === index ? input : item));

          default:
            return prevState;
        }
      });
    };
    const handleTagsChange = ({
      input,
      index,
      mode,
    }:
      | {
          input: string;
          index?: never;
          mode: 'ADD' | 'REMOVE';
        }
      | {
          input: string;
          index: number;
          mode: 'PATCH';
        }) => {
      setTags((prevState) => {
        switch (mode) {
          case 'ADD':
            return [...prevState, input];
          case 'REMOVE':
            return prevState.filter((item) => item !== input);
          case 'PATCH':
            if (index < 0 || index >= prevState.length) {
              return prevState;
            }
            return prevState.map((item, idx) => (idx === index ? input : item));
          default:
            return prevState;
        }
      });
    };

    return {
      companyName: {
        isError: companyName.length > MAX_COMPANY_NAME_LENGTH,
        value: companyName,
        onChange: setCompanyName,
      },
      explanation: {
        isError: explanation.length > MAX_EXPLANATION_LENGTH,
        value: explanation,
        onChange: setExplanation,
      },
      email: {
        isError: !EMAIL_REGEX.test(email),
        value: email,
        onChange: setEmail,
      },
      slogan: {
        isError: slogan.length > MAX_SLOGAN_LENGTH,
        value: slogan,
        onChange: setSlogan,
      },
      investAmount: {
        isError: !INVEST_AMOUNT_REGEX.test(investAmount),
        value: investAmount,
        onChange: setInvestAmount,
      },
      rawInvestCompany: {
        isError: !isRawInvestCompanyValid(rawInvestCompany),
        value: rawInvestCompany,
        onChange: setRawInvestCompany,
      },
      investCompany: {
        isError: !isInvestCompanyValid(investCompany),
        value: investCompany,
        onChange: handleInvestCompanyChange,
      },
      series: {
        isError: series === 'NONE',
        value: series,
        onChange: setSeries,
      },
      irDeckPreview: {
        isError: !isIrDeckPreviewValid(irDeckPreview),
        value: irDeckPreview,
        onChange: setIrDeckPreview,
      },
      landingPageLink: {
        isError: !URL_REGEX.test(landingPageLink),
        value: landingPageLink,
        onChange: setLandingPageLink,
      },
      imagePreview: {
        isError: !isImagePreviewValid(imagePreview),
        value: imagePreview,
        onChange: setImagePreview,
      },
      rawExternalDescriptionLink: {
        isError: !isRawExternalDescriptionLinkValid(rawExternalDescriptionLink),
        value: rawExternalDescriptionLink,
        onChange: setRawExternalDescriptionLink,
      },
      externalDescriptionLink: {
        isError: !isExternalLinkValid(externalDescriptionLink),
        value: externalDescriptionLink,
        onChange: handleExternalDescriptionLinkChange,
      },
      rawTag: {
        isError: !isRawTagValid(rawTag),
        value: rawTag,
        onChange: setRawTag,
      },
      tags: {
        isError: !isTagsValid(tags),
        value: tags,
        onChange: handleTagsChange,
      },
    };
  },
};
