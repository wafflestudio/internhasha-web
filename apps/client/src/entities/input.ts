export type Input<TInput> = {
  isError: boolean;
  value: TInput;
  onChange: (input: TInput) => void;
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
        mode: 'ADD' | 'REMOVE';
      }
    | {
        input: TElement;
        index: number;
        mode: 'PATCH';
      }) => void;
};

export type InputForForm<TInput> = {
  isError: boolean;
  value: TInput;
};
