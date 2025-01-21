import { useState } from 'react';

import type { Input, ListInput, SelectInput } from '@/entities/input';

export type Series = 'NONE' | 'SEED' | 'PRE_A' | 'A' | 'B' | 'C' | 'D';
export const seriesList = ['SEED', 'PRE_A', 'A', 'B', 'C', 'D'];

type ExternalLink = {
  link: string;
  description: string;
};

type InitialState = {
  companyName?: string;
  companyEmail?: string;
  slogan?: string;
  imageLink?: string;
  series?: Series;
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
    companyEmail: Input<string>;
    slogan: Input<string>;
    imageLink: Input<string>;
    series: SelectInput<Series>;
    investAmount: Input<string>;
    investCompany: ListInput<string>;
    tags: ListInput<string>;
    IRDeckLink: Input<string>;
    landingPageLink: Input<string>;
    externalDescriptionLink: ListInput<ExternalLink>;
  };
  useUtilState(): {
    thumbnail: {
      value: { file: File; url: string } | null;
      onChange(input: { file: File; url: string } | null): void;
    };
    IRDeckPreview: {
      value: { file: File; url: string } | null;
      onChange(input: { file: File; url: string } | null): void;
    };
  };
};

const MAX_TAGS = 10;
const CONTENT_REGEX = /^(?!\s*$).{1,500}$/;
const TAG_REGEX = /^(?!\s*$).{1,8}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const companyPresentation: CompanyPresentation = {
  useValidator: ({ initialState = {} }) => {
    const [companyName, setCompanyName] = useState(
      initialState.companyName !== undefined ? initialState.companyName : '',
    );
    const [companyEmail, setCompanyEmail] = useState(
      initialState.companyEmail !== undefined ? initialState.companyEmail : '',
    );
    const [slogan, setSlogan] = useState(
      initialState.slogan !== undefined ? initialState.slogan : '',
    );
    const [imageLink, setImageLink] = useState(
      initialState.imageLink !== undefined ? initialState.imageLink : '',
    );
    const [series, setSeries] = useState<Series>(
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
    const isTagExist = (input: string) => {
      return input in tags;
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
          item.link.trim().length === 0 && item.description.trim().length,
      );
      return filteredExternalLink.every(
        (externalLink) =>
          URL_REGEX.test(externalLink.link) &&
          CONTENT_REGEX.test(externalLink.description),
      );
    };
    const isInvestCompanyValid = (input: string[]) => {
      const filteredInvestCompany = input.filter(
        (item) => item.trim().length === 0,
      );
      const hasDuplicates =
        new Set(filteredInvestCompany).size !== filteredInvestCompany.length;
      return (
        filteredInvestCompany.every((company) => CONTENT_REGEX.test(company)) &&
        !hasDuplicates &&
        input.length < MAX_TAGS
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
    const handleCompanyEmailChange = (input: string) => {
      setCompanyEmail(input);
    };
    const handleSloganChange = (input: string) => {
      setSlogan(input);
    };
    const handleImageLinkChange = (input: string) => {
      setImageLink(input);
    };
    const handleSeriesChange = (input: Series) => {
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
            return isTagExist(input) ? prevState : [...prevState, input];
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
      companyEmail: {
        isError: !EMAIL_REGEX.test(companyEmail),
        value: companyEmail,
        onChange: handleCompanyEmailChange,
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
        isError: series !== 'NONE',
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
    const [thumbnail, setThumbnail] = useState<{
      file: File;
      url: string;
    } | null>(null);
    const [IRDeckPreview, setIRDeckPreview] = useState<{
      file: File;
      url: string;
    } | null>(null);

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

    return {
      thumbnail: {
        value: thumbnail,
        onChange: handleThumbnailChange,
      },
      IRDeckPreview: {
        value: IRDeckPreview,
        onChange: handleIRDeckPreview,
      },
    };
  },
};
