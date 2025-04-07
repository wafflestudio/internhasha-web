export type Input<TInput> = {
  isError: boolean;
  value: TInput;
  onChange: (input: TInput) => void;
};

export type InputWithDetailedError<
  TInput,
  TError extends Record<string, boolean>,
> = Input<TInput> & {
  detailedError: TError;
};

export type SelectInput<TSelect> = {
  isError: boolean;
  value: TSelect;
  onChange: (input: TSelect) => void;
};

export type ListInput<TElement> = {
  isError: boolean;
  value: TElement[];
  onChange: ({
    input,
    index,
    mode,
  }:
    | {
        input: TElement;
        index?: never;
        mode: 'ADD';
      }
    | {
        input: TElement;
        index: number;
        mode: 'PATCH' | 'REMOVE';
      }
    | {
        input?: never;
        index: number;
        mode: 'REMOVE';
      }) => void;
};

export type InputForForm<TInput> = {
  isError: boolean;
  value: TInput;
};

export const createStringListInputHandler = ({
  rawInput,
  inputList,
  setInputList,
  maxRawInputLength,
  rawInputRegex,
  maxListSize,
  isTag = false,
}: {
  rawInput: string;
  inputList: string[];
  setInputList: (updater: (prevState: string[]) => string[]) => void;
  maxRawInputLength: number;
  rawInputRegex?: RegExp;
  maxListSize: number;
  isTag?: boolean;
}) => {
  const isRawInputValid = (input: string) => {
    if (rawInputRegex !== undefined && !rawInputRegex.test(rawInput)) {
      return false;
    }
    if (input.length > maxRawInputLength) {
      return false;
    }

    // 특정 동작 이후에 rawInput이 inputList에 반영되는 경우
    if (isTag && inputList.some((item) => item === input)) {
      return false;
    }

    // rawInput이 즉시 inputList에 반영되는 경우
    if (!isTag && inputList.indexOf(input) !== inputList.lastIndexOf(input)) {
      return false;
    }
    return true;
  };

  const isInputListValid = (input: string[]) => {
    if (input.length > maxListSize) {
      return false;
    }
    return true;
  };

  const handleInputList = ({
    input,
    index,
    mode,
  }:
    | {
        input: string;
        index?: never;
        mode: 'ADD';
      }
    | {
        input: string;
        index: number;
        mode: 'PATCH' | 'REMOVE';
      }
    | {
        input?: never;
        index: number;
        mode: 'REMOVE';
      }) => {
    setInputList((prevState) => {
      if (mode === 'ADD') {
        if (!isRawInputValid(input)) {
          return prevState;
        }
        return [...prevState, input];
      }

      if (index < 0 || index >= prevState.length) {
        return prevState;
      }

      if (mode === 'PATCH') {
        if (!isRawInputValid(input)) {
          return prevState;
        }
        return prevState.map((item, idx) => (idx === index ? input : item));
      }

      // REMOVE 상태
      return prevState.filter((_, idx) => idx !== index);
    });
  };

  return {
    rawInputValidator: isRawInputValid,
    inputListValidator: isInputListValid,
    onChange: handleInputList,
  };
};
