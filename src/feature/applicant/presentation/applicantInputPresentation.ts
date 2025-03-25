import { useState } from 'react';

import type { Input, ListInput, SelectInput } from '@/entities/input';
import type { JobMinorCategory, Link } from '@/entities/post';

type InitialInputState = {
  enrollYear?: string;
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

export type ApplicantInputPresentation = {
  useValidator({ initialState }: { initialState?: InitialInputState }): {
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
};

export const MAX_EXPLANATION_LENGTH = 5000;
export const MAX_SLOGAN_LENGTH = 100;
const MAX_STACK_LENTH = 20;
const MAX_DESCRIPTION_LENGTH = 30;
const MAX_CONTENT_LENGTH = 100;

const MAX_EXTERNAL_DESCRIPTION_LINK_SIZE = 5;
const MAX_STACK_SIZE = 10;

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

const URL_REGEX = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
const ENROLL_YEAR_REGEX = /^\d{2}$/;

export const applicantInputPresentation: ApplicantInputPresentation = {
  useValidator: ({ initialState }) => {
    const [enrollYear, setEnrollYear] = useState(
      initialState?.enrollYear !== undefined ? initialState.enrollYear : '',
    );
    const [department, setDepartment] = useState(
      initialState?.department !== undefined ? initialState.department : '',
    );
    const [rawPosition, setRawPosition] = useState<JobMinorCategory | 'NONE'>(
      'NONE',
    );
    const [positions, setPositions] = useState(
      initialState?.positions !== undefined ? initialState.positions : [],
    );
    const [slogan, setSlogan] = useState(
      initialState?.slogan !== undefined ? initialState.slogan : '',
    );
    const [explanation, setExplanation] = useState(
      initialState?.explanation !== undefined ? initialState.explanation : '',
    );
    const [rawStack, setRawStack] = useState('');
    const [stacks, setStacks] = useState<string[]>(
      initialState?.stacks !== undefined ? initialState.stacks : [],
    );
    const [imagePreview, setImagePreview] = useState<{
      file: File;
      url: string;
    } | null>(
      initialState?.imagePreview !== undefined
        ? initialState.imagePreview
        : null,
    );
    const [cvPreview, setCvPreview] = useState<{
      file: File;
      url: string;
    } | null>(
      initialState?.cvPreview !== undefined ? initialState.cvPreview : null,
    );
    const [portfolioPreview, setPortfolioPreview] = useState<{
      file: File;
      url: string;
    } | null>(
      initialState?.portfolioPreview !== undefined
        ? initialState.portfolioPreview
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

    const isRawPositionValid = (
      input: JobMinorCategory | 'NONE',
    ): input is JobMinorCategory => {
      if (input === 'NONE') {
        return false;
      }
      if (positions.some((item) => item === input)) {
        return false;
      }

      return true;
    };
    const isRawStackValid = (input: string) => {
      const trimmedInput = input.trim();
      if (trimmedInput.length > MAX_STACK_LENTH) {
        return false;
      }
      if (stacks.some((item) => item.trim() === trimmedInput)) {
        return false;
      }
      return true;
    };
    const isStackValid = (input: string[]) => {
      if (input.length > MAX_STACK_SIZE) {
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

    const handlePositionsChange = ({
      input,
      index,
      mode,
    }:
      | {
          input: JobMinorCategory | 'NONE';
          mode: 'ADD';
          index?: never;
        }
      | {
          input: JobMinorCategory | 'NONE';
          mode: 'PATCH' | 'REMOVE';
          index: number;
        }) => {
      if (!isRawPositionValid(input)) {
        return;
      }

      setPositions((prevState) => {
        switch (mode) {
          case 'ADD':
            return isRawPositionValid(input)
              ? [...prevState, input]
              : prevState;
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
    const handleStackChange = ({
      input,
      index,
      mode,
    }:
      | {
          input: string;
          mode: 'ADD';
          index?: never;
        }
      | {
          input: string;
          mode: 'PATCH' | 'REMOVE';
          index: number;
        }) => {
      setStacks((prevState) => {
        switch (mode) {
          case 'ADD':
            return isRawStackValid(input) ? [...prevState, input] : prevState;
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
      enrollYear: {
        isError: !ENROLL_YEAR_REGEX.test(enrollYear),
        value: enrollYear,
        onChange: setEnrollYear,
      },
      department: {
        isError: department.length > MAX_CONTENT_LENGTH,
        value: department,
        onChange: setDepartment,
      },
      rawPosition: {
        isError: false,
        value: rawPosition,
        onChange: setRawPosition,
      },
      positions: {
        isError: false,
        value: positions,
        onChange: handlePositionsChange,
      },
      slogan: {
        isError: slogan.length > MAX_SLOGAN_LENGTH,
        value: slogan,
        onChange: setSlogan,
      },
      explanation: {
        isError: explanation.length > MAX_EXPLANATION_LENGTH,
        value: explanation,
        onChange: setExplanation,
      },
      rawStack: {
        isError: !isRawStackValid(rawStack),
        value: rawStack,
        onChange: setRawStack,
      },
      stacks: {
        isError: !isStackValid(stacks),
        value: stacks,
        onChange: handleStackChange,
      },
      imagePreview: {
        isError: !isImagePreviewValid(imagePreview),
        value: imagePreview,
        onChange: setImagePreview,
      },
      cvPreview: {
        isError: !isPdfValid(cvPreview),
        value: cvPreview,
        onChange: setCvPreview,
      },
      portfolioPreview: {
        isError: !isPdfValid(portfolioPreview),
        value: portfolioPreview,
        onChange: setPortfolioPreview,
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
    };
  },
};
