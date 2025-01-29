import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import type { SelectInput } from '@/entities/input';

type StringSelectFormProps<T extends string> = {
  label: string;
  input: SelectInput<'NONE' | T>;
  inputList: string[];
  isPending: boolean;
  isSubmit: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
};

export const StringSelectForm = <T extends string>({
  label,
  input,
  inputList,
  isPending,
  isSubmit,
  errorMessage,
  infoMessage,
  required,
}: StringSelectFormProps<T>) => {
  const isValidType = (value: string, valueList: string[]): value is T => {
    return valueList.includes(value);
  };

  return (
    <LabelContainer label={label} required={required}>
      <select
        disabled={isPending}
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (isValidType(selectedValue, inputList)) {
            input.onChange(selectedValue);
          }
        }}
      >
        <option value="NONE" disabled hidden></option>
        {inputList.map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="flex flex-col gap-1">
        {infoMessage !== undefined && (
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
        )}
        {isSubmit && input.isError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
