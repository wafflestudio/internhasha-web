import { useState } from 'react';

import type { Input, ListInput, SelectInput } from '@/entities/input';
import type { Series } from '@/entities/post';

export const seriesList = ['SEED', 'PRE_A', 'A', 'B', 'C', 'D'];

type ExternalLink = {
  link: string;
  description: string;
};

type InitialState = {
  companyName?: string;
  email?: string;
  slogan?: string;
  imageLink?: string;
  series?: Series | 'NONE';
  investAmount?: string;
  investCompany?: string[];
  tags?: string[];
  IRDeckLink?: string;
  landingPageLink?: string;
  externalDescriptionLink?: ExternalLink[];
};

type CompanyPresentation = {
  useValidator({ initialState }: { initialState?: InitialState }): {
    companyName: Input<string>;
    email: Input<string>;
    slogan: Input<string>;
    imageLink: Input<string>;
    series: SelectInput<Series | 'NONE'>;
    investAmount: Input<string>;
    investCompany: ListInput<string>;
    tag: Input<string>;
    tags: ListInput<string>;
    IRDeckLink: Input<string>;
    landingPageLink: Input<string>;
    externalDescriptionLink: ListInput<ExternalLink>;
  };
  useUtilState(): {
    rawTags: Input<string>;
    thumbnail: Input<{ file: File; url: string } | null>;
    IRDeckPreview: Input<{ file: File; url: string } | null>;
  };
  validator: {
    tagValidator({ tag, tags }: { tag: string; tags: string[] }): boolean;
    tagInputValidator({ tag, tags }: { tag: string; tags: string[] }): boolean;
  };
  filter: {
    tagsFilter: (input: string[]) => string[];
    investCompanyFilter: (input: string[]) => string[];
    externalDescriptionLinkFilter: (input: ExternalLink[]) => ExternalLink[];
  };
};

const MAX_TAGS = 10;
const MAX_TAG_LENGTH = 8;
const MAX_COMPANY_LENGTH = 30;
const MAX_IMAGE_SIZE = 1 * 1024 * 1024;
const MAX_FILE_SIZE = 5 * 1024 * 2024;
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
const FILE_EXTENSIONS = ['pdf'];

const CONTENT_REGEX = /^(?!\s*$).{1,500}$/;
const TAG_REGEX = /^(?!\s*$).{1,8}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const companyPresentation: CompanyPresentation = {
  useValidator: ({ initialState = {} }) => {
    const [companyName, setCompanyName] = useState(
      initialState.companyName !== undefined ? initialState.companyName : '',
    );
    const [email, setEmail] = useState(
      initialState.email !== undefined ? initialState.email : '',
    );
    const [slogan, setSlogan] = useState(
      initialState.slogan !== undefined ? initialState.slogan : '',
    );
    const [imageLink, setImageLink] = useState(
      initialState.imageLink !== undefined ? initialState.imageLink : '',
    );
    const [series, setSeries] = useState<Series | 'NONE'>(
      initialState.series !== undefined ? initialState.series : 'NONE',
    );
    const [investAmount, setInvestAmount] = useState(
      initialState.investAmount !== undefined ? initialState.investAmount : '',
    );
    const [investCompany, setInvestCompany] = useState<string[]>(
      initialState.investCompany !== undefined
        ? initialState.investCompany
        : [''],
    );
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<string[]>(
      initialState.tags !== undefined ? initialState.tags : [],
    );
    const [IRDeckLink, setIRDeckLink] = useState(
      initialState.IRDeckLink !== undefined ? initialState.IRDeckLink : '',
    );
    const [landingPageLink, setLandingPageLink] = useState(
      initialState.landingPageLink !== undefined
        ? initialState.landingPageLink
        : '',
    );
    const [externalDescriptionLink, setExternalDescriptionLink] = useState<
      ExternalLink[]
    >(
      initialState.externalDescriptionLink !== undefined
        ? initialState.externalDescriptionLink
        : [{ link: '', description: '' }],
    );

    const isInvestCompanyExist = (input: string) => {
      return input in investCompany;
    };
    const isExternalLinkExist = (input: ExternalLink) => {
      return externalDescriptionLink.some(
        (item) =>
          item.link === input.link && item.description === input.description,
      );
    };
    const isExternalLinkValid = (input: ExternalLink[]) => {
      const filteredExternalLink = input.filter(
        (item) =>
          item.link.trim().length !== 0 && item.description.trim().length !== 0,
      );
      return filteredExternalLink.every(
        (externalLink) =>
          URL_REGEX.test(externalLink.link) &&
          CONTENT_REGEX.test(externalLink.description),
      );
    };
    const isInvestCompanyValid = (input: string[]) => {
      const filteredInvestCompany = input.filter(
        (item) => item.trim().length !== 0,
      );
      const hasDuplicates =
        new Set(filteredInvestCompany).size !== filteredInvestCompany.length;
      return (
        filteredInvestCompany.every(
          (company) => company.length <= MAX_COMPANY_LENGTH,
        ) &&
        !hasDuplicates &&
        input.length <= MAX_TAGS
      );
    };

    const isTagsValid = (input: string[]) => {
      const hasDuplicates = new Set(input).size !== input.length;
      return (
        input.every((company) => TAG_REGEX.test(company)) || !hasDuplicates
      );
    };

    const handleCompanyNameChange = (input: string) => {
      setCompanyName(input);
    };
    const handleEmailChange = (input: string) => {
      setEmail(input);
    };
    const handleSloganChange = (input: string) => {
      setSlogan(input);
    };
    const handleImageLinkChange = (input: string) => {
      setImageLink(input);
    };
    const handleSeriesChange = (input: Series | 'NONE') => {
      setSeries(input);
    };
    const handleInvestAmountChange = (input: string) => {
      setInvestAmount(input);
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
            return isInvestCompanyExist(input)
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
    const handleTagChange = (input: string) => {
      setTag(input);
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
    const handleIRDeckLinkChange = (input: string) => {
      setIRDeckLink(input);
    };
    const handleLandingPageLinkChange = (input: string) => {
      setLandingPageLink(input);
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
            return isExternalLinkExist(input)
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

    return {
      companyName: {
        isError: !CONTENT_REGEX.test(companyName),
        value: companyName,
        onChange: handleCompanyNameChange,
      },
      email: {
        isError: !EMAIL_REGEX.test(email),
        value: email,
        onChange: handleEmailChange,
      },
      slogan: {
        isError: !CONTENT_REGEX.test(slogan),
        value: slogan,
        onChange: handleSloganChange,
      },
      imageLink: {
        isError: !URL_REGEX.test(imageLink),
        value: imageLink,
        onChange: handleImageLinkChange,
      },
      series: {
        isError: series === 'NONE',
        value: series,
        onChange: handleSeriesChange,
      },
      investAmount: {
        isError: isNaN(Number(investAmount)) || Number(investAmount) < 0,
        value: investAmount,
        onChange: handleInvestAmountChange,
      },
      investCompany: {
        isError: !isInvestCompanyValid(investCompany),
        value: investCompany,
        onChange: handleInvestCompanyChange,
      },
      tag: {
        isError: false,
        value: tag,
        onChange: handleTagChange,
      },
      tags: {
        isError: isTagsValid(tags),
        value: tags,
        onChange: handleTagsChange,
      },
      IRDeckLink: {
        isError: !URL_REGEX.test(IRDeckLink),
        value: IRDeckLink,
        onChange: handleIRDeckLinkChange,
      },
      landingPageLink: {
        isError: !URL_REGEX.test(landingPageLink),
        value: landingPageLink,
        onChange: handleLandingPageLinkChange,
      },
      externalDescriptionLink: {
        isError: !isExternalLinkValid(externalDescriptionLink),
        value: externalDescriptionLink,
        onChange: handleExternalDescriptionLinkChange,
      },
    };
  },
  useUtilState: () => {
    const [rawTags, setRawTags] = useState('');
    const [thumbnail, setThumbnail] = useState<{
      file: File;
      url: string;
    } | null>(null);
    const [IRDeckPreview, setIRDeckPreview] = useState<{
      file: File;
      url: string;
    } | null>(null);

    const isThumbnailImageValid = (
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
    const isIRDeckPreviewValid = (
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

    const handleThumbnailChange = (
      input: {
        file: File;
        url: string;
      } | null,
    ) => {
      setThumbnail(input);
    };
    const handleIRDeckPreview = (input: { file: File; url: string } | null) => {
      setIRDeckPreview(input);
    };
    const handleRawTags = (input: string) => {
      setRawTags(input);
    };

    return {
      rawTags: {
        isError: false,
        value: rawTags,
        onChange: handleRawTags,
      },
      thumbnail: {
        isError: !isThumbnailImageValid(thumbnail),
        value: thumbnail,
        onChange: handleThumbnailChange,
      },
      IRDeckPreview: {
        isError: !isIRDeckPreviewValid(IRDeckPreview),
        value: IRDeckPreview,
        onChange: handleIRDeckPreview,
      },
    };
  },
  validator: {
    tagValidator: ({ tag, tags }: { tag: string; tags: string[] }) => {
      if (tags.includes(tag)) {
        return false;
      }
      if (tag.length > MAX_TAG_LENGTH || tag.length === 0) {
        return false;
      }
      return true;
    },
    tagInputValidator: ({ tag, tags }: { tag: string; tags: string[] }) => {
      return !(tags.includes(tag) || tag.length > MAX_TAG_LENGTH);
    },
  },
  filter: {
    tagsFilter: (tags: string[]) => {
      const filteredTags = tags.filter((item) => item.trim().length !== 0);
      return Array.from(new Set(filteredTags));
    },
    investCompanyFilter: (tags: string[]) => {
      const filteredTags = tags.filter((item) => item.trim().length !== 0);
      return Array.from(new Set(filteredTags));
    },
    externalDescriptionLinkFilter: (tags: ExternalLink[]) => {
      const filteredTags = tags.filter(
        (item) =>
          item.link.trim().length !== 0 && item.description.trim().length !== 0,
      );
      return Array.from(new Set(filteredTags));
    },
  },
};
