import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Input } from '@/components/ui/input';
import type { Input as InputType } from '@/entities/input';

type HeadcountFieldProps = {
  label: string;
  input: InputType<string>;
  unit: string;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  infoMessage?: string;
  placeholder?: string;
  required?: boolean;
};

export const HeadcountField = ({
  label,
  input,
  unit,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  placeholder,
  required,
}: HeadcountFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <div className="flex items-center gap-2">
        <Input
          id="investAmount"
          value={input.value}
          disabled={isPending}
          placeholder={placeholder}
          onChange={(e) => {
            input.onChange(e.target.value);
          }}
        />
        <span className="text-grey-dark-hover">{unit}</span>
      </div>
      <div className="flex flex-col gap-1">
        {infoMessage !== undefined && (
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
        )}
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
