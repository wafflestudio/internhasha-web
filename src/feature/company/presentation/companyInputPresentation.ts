import { useState } from 'react';

import type { Domain } from '@/entities/company';
import type { Input, ListInput, SelectInput } from '@/entities/input';
import { createStringListInputHandler } from '@/entities/input';
import type { Link } from '@/entities/link';

type InitialInputState = {
  companyEstablishedYear?: string;
  domain?: Domain | 'NONE';
  headcount?: string;
  mainLocation?: string;
  detailedLocation?: string;
  slogan?: string;
  detail?: string;
  profileImagePreview?: { file: File; url: string } | null;
  companyInfoPDFPreview?: { file: File; url: string } | null;
  landingPageLink?: string;
  links?: Link[];
  tags?: string[];
};

export type CompanyInputPresentation = {
  useValidator({ initialState }: { initialState?: InitialInputState }): {
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
};

export const MAX_DETAIL_LENGTH = 5000;
export const MAX_SLOGAN_LENGTH = 100;
const MAX_LOCATION_LENGTH = 500;
const MAX_DESCRIPTION_LENGTH = 30;
const MAX_TAG_LENGTH = 8;
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

const NUMBER_REGEX = /^\s*$|^[0-9]+$/;
const URL_REGEX = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const companyInputPresentation: CompanyInputPresentation = {
  useValidator: ({ initialState }) => {
    const [companyEstablishedYear, setCompanyEstablishedYear] = useState(
      initialState?.companyEstablishedYear !== undefined
        ? initialState.companyEstablishedYear
        : '',
    );
    const [domain, setDomain] = useState<Domain | 'NONE'>(
      initialState?.domain !== undefined ? initialState.domain : 'NONE',
    );
    const [headcount, setHeadcount] = useState(
      initialState?.headcount !== undefined ? initialState.headcount : '',
    );
    const [mainLocation, setMainLocation] = useState(
      initialState?.mainLocation !== undefined ? initialState.mainLocation : '',
    );
    const [detailedLocation, setDetailedLocation] = useState(
      initialState?.detailedLocation !== undefined
        ? initialState.detailedLocation
        : '',
    );
    const [slogan, setSlogan] = useState(
      initialState?.slogan !== undefined ? initialState.slogan : '',
    );
    const [detail, setDetail] = useState(
      initialState?.detail !== undefined ? initialState.detail : '',
    );
    const [profileImagePreview, setProfileImagePreview] = useState<{
      file: File;
      url: string;
    } | null>(
      initialState?.profileImagePreview !== undefined
        ? initialState.profileImagePreview
        : null,
    );
    const [companyInfoPDFPreview, setCompanyInfoPDFPreview] = useState<{
      file: File;
      url: string;
    } | null>(
      initialState?.companyInfoPDFPreview !== undefined
        ? initialState.companyInfoPDFPreview
        : null,
    );
    const [landingPageLink, setLandingPageLink] = useState(
      initialState?.landingPageLink !== undefined
        ? initialState.landingPageLink
        : '',
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

    const isPdfValid = (
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
      companyEstablishedYear: {
        isError: !NUMBER_REGEX.test(companyEstablishedYear),
        value: companyEstablishedYear,
        onChange: setCompanyEstablishedYear,
      },
      domain: {
        isError: false,
        value: domain,
        onChange: setDomain,
      },
      headcount: {
        isError: !NUMBER_REGEX.test(headcount),
        value: headcount,
        onChange: setHeadcount,
      },
      mainLocation: {
        isError: mainLocation.length > MAX_LOCATION_LENGTH,
        value: mainLocation,
        onChange: setMainLocation,
      },
      detailedLocation: {
        isError: detailedLocation.length > MAX_LOCATION_LENGTH,
        value: detailedLocation,
        onChange: setDetailedLocation,
      },
      slogan: {
        isError: slogan.length > MAX_SLOGAN_LENGTH,
        value: slogan,
        onChange: setSlogan,
      },
      detail: {
        isError: detail.length > MAX_DETAIL_LENGTH,
        value: detail,
        onChange: setDetail,
      },
      profileImagePreview: {
        isError: !isImagePreviewValid(profileImagePreview),
        value: profileImagePreview,
        onChange: setProfileImagePreview,
      },
      companyInfoPDFPreview: {
        isError: !isPdfValid(companyInfoPDFPreview),
        value: companyInfoPDFPreview,
        onChange: setCompanyInfoPDFPreview,
      },
      landingPageLink: {
        isError:
          landingPageLink.trim().length !== 0 &&
          !URL_REGEX.test(landingPageLink),
        value: landingPageLink,
        onChange: setLandingPageLink,
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
