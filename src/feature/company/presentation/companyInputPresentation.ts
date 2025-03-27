import { useState } from 'react';

import type { Input, ListInput, SelectInput } from '@/entities/input';
import { createStringListInputHandler } from '@/entities/input';
import type { Link, Series } from '@/entities/post';

type InitialInputState = {
  companyName?: string;
  explanation?: string;
  email?: string;
  slogan?: string;
  investAmount?: string;
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
    rawLink: Input<Link>;
    links: ListInput<Link>;
    rawTag: Input<string>;
    tags: ListInput<string>;
  };
};

const MAX_COMPANY_NAME_LENGTH = 30;
export const MAX_EXPLANATION_LENGTH = 5000;
export const MAX_SLOGAN_LENGTH = 100;
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
const URL_REGEX = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

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
    const [rawInvestCompany, setRawInvestCompany] = useState('');
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
    const [rawLink, setRawLink] = useState<Link>({
      link: '',
      description: '',
    });
    const [links, setLinks] = useState<Link[]>(
      initialState?.links !== undefined
        ? initialState.links
        : [{ link: '', description: '' }],
    );
    const [rawTag, setRawTag] = useState('');
    const [tags, setTags] = useState<string[]>(
      initialState?.tags !== undefined ? initialState.tags : [],
    );

    const {
      rawInputValidator: isRawInvestCompanyValid,
      inputListValidator: isInvestCompanyValid,
      onChange: handleInvestCompanyChange,
    } = createStringListInputHandler({
      rawInput: rawInvestCompany,
      inputList: investCompany,
      setInputList: setInvestCompany,
      maxRawInputLength: MAX_RAW_INVEST_COMPANY_LENGTH,
      maxListSize: MAX_INVEST_COMPANY_SIZE,
    });

    const {
      rawInputValidator: isRawTagValid,
      inputListValidator: isTagsValid,
      onChange: handleTagsChange,
    } = createStringListInputHandler({
      rawInput: rawTag,
      inputList: tags,
      setInputList: setTags,
      maxRawInputLength: MAX_TAG_LENGTH,
      maxListSize: MAX_TAGS_SIZE,
      isTag: true,
    });

    const isRawlinksValid = (input: Link) => {
      const trimmedDescription = input.description.trim();
      const trimmedLink = input.link.trim();

      if (trimmedDescription.length > MAX_DESCRIPTION_LENGTH) {
        return false;
      }
      if (trimmedLink.length !== 0 && !URL_REGEX.test(trimmedLink)) {
        return false;
      }

      const filteredlinks = links.filter(
        (item) =>
          item.link.trim() !== trimmedLink &&
          item.description.trim() !== trimmedDescription,
      );
      if (
        trimmedDescription.length !== 0 &&
        trimmedLink.length !== 0 &&
        filteredlinks.length !== links.length - 1
      ) {
        return false;
      }
      return true;
    };
    const isExternalLinkValid = (input: Link[]) => {
      const filteredExternalLink = input.filter(
        (item) =>
          item.link.trim().length !== 0 && item.description.trim().length !== 0,
      );
      if (filteredExternalLink.length > MAX_EXTERNAL_DESCRIPTION_LINK_SIZE) {
        return false;
      }
      if (
        filteredExternalLink.some(
          (item) =>
            item.description.trim().length > MAX_DESCRIPTION_LENGTH ||
            !URL_REGEX.test(item.link.trim()),
        )
      ) {
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
        return true;
      }
      if (!input.file.type.startsWith('application/pdf')) {
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
        return true;
      }
      if (!input.file.type.startsWith('image/')) {
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

    const handlelinksChange = ({
      input,
      index,
      mode,
    }:
      | {
          input: Link;
          index?: never;
          mode: 'ADD';
        }
      | {
          input: Link;
          index: number;
          mode: 'PATCH' | 'REMOVE';
        }
      | {
          input?: never;
          index: number;
          mode: 'REMOVE';
        }) => {
      setLinks((prevState) => {
        switch (mode) {
          case 'ADD':
            return isRawlinksValid(input) ? [...prevState, input] : prevState;
          case 'REMOVE':
            return [
              ...prevState.slice(0, index),
              ...prevState.slice(index + 1),
            ];
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
        isError: email.trim().length !== 0 && !EMAIL_REGEX.test(email),
        value: email,
        onChange: setEmail,
      },
      slogan: {
        isError: slogan.length > MAX_SLOGAN_LENGTH,
        value: slogan,
        onChange: setSlogan,
      },
      investAmount: {
        isError:
          investAmount.trim().length !== 0 &&
          !INVEST_AMOUNT_REGEX.test(investAmount),
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
        isError: false,
        value: series,
        onChange: setSeries,
      },
      irDeckPreview: {
        isError: !isIrDeckPreviewValid(irDeckPreview),
        value: irDeckPreview,
        onChange: setIrDeckPreview,
      },
      landingPageLink: {
        isError:
          landingPageLink.trim().length !== 0 &&
          !URL_REGEX.test(landingPageLink),
        value: landingPageLink,
        onChange: setLandingPageLink,
      },
      imagePreview: {
        isError: !isImagePreviewValid(imagePreview),
        value: imagePreview,
        onChange: setImagePreview,
      },
      rawLink: {
        isError: !isRawlinksValid(rawLink),
        value: rawLink,
        onChange: setRawLink,
      },
      links: {
        isError: !isExternalLinkValid(links),
        value: links,
        onChange: handlelinksChange,
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
