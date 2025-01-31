import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Input as InputType, ListInput } from '@/entities/input';

type InvestCompanyFieldProps = {
  label: string;
  input: ListInput<string>;
  rawInput: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  inputErrorMessage: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
};

export const InvestCompanyField = ({
  label,
  input,
  rawInput,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  inputErrorMessage,
  infoMessage,
  required,
  placeholder,
}: InvestCompanyFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      {input.value.map((company, index) => (
        <div key={`invest-company-${index}`} className="flex gap-2">
          <Input
            value={company}
            placeholder={placeholder}
            disabled={isPending}
            onChange={(e) => {
              input.onChange({
                input: e.target.value,
                index,
                mode: 'PATCH',
              });
              rawInput.onChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                input.onChange({ input: '', mode: 'ADD' });
              }
            }}
          />
          <Button
            variant="outline"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              input.onChange({ input: company, index, mode: 'REMOVE' });
            }}
          >
            삭제
          </Button>
        </div>
      ))}
      <Button
        variant="secondary"
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          input.onChange({ input: '', mode: 'ADD' });
        }}
      >
        추가
      </Button>
      <div className="flex flex-col gap-1">
        {infoMessage !== undefined && (
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
        )}
        {rawInput.isError && (
          <FormErrorResponse>{inputErrorMessage}</FormErrorResponse>
        )}
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
