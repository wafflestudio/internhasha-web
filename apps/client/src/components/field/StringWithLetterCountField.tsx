import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Input } from '@/components/ui/input';
import type { Input as InputType } from '@/entities/input';

type StringWithLetterCountFieldProps = {
  label: string;
  input: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  maxLength: number;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
};

export const StringWithLetterCountField = ({
  label,
  input,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
  placeholder,
  maxLength,
}: StringWithLetterCountFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <Input
        value={input.value}
        placeholder={placeholder}
        disabled={isPending}
        onChange={(e) => {
          input.onChange(e.target.value);
        }}
      />
      <div className="flex flex-col gap-1">
        <div className="flex w-full justify-between">
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
          <span
            className={`text-sm ${input.value.length > maxLength ? 'text-red' : 'text-grey-normal'}`}
          >
            {input.value.length}/{maxLength}
          </span>
        </div>
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
