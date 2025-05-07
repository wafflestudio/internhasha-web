import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Input } from '@/components/ui/input';
import type { Input as InputType } from '@/entities/input';

type StringFieldProps = {
  label: string;
  input: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  maxLength?: number;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
};

export const StringField = ({
  label,
  input,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  maxLength,
  infoMessage,
  required,
  placeholder,
}: StringFieldProps) => {
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
        {maxLength !== undefined ? (
          <div className="flex w-full flex-col justify-between sm:flex-row">
            <FormInfoResponse>{infoMessage}</FormInfoResponse>
            <span
              className={`text-sm ${input.value.length > maxLength ? 'text-red-300' : 'text-grey-500'}`}
            >
              {input.value.length}/{maxLength}
            </span>
          </div>
        ) : (
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
        )}
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
