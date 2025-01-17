export type StringInput = {
  isError: boolean;
  value: string;
  onChange: (input: string) => void;
};

export type SelectInput<TSelect> = {
  isError: boolean;
  value: TSelect;
  onChange: (input: TSelect) => void;
};
