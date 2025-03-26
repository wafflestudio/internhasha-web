import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Input as InputType, ListInput } from '@/entities/input';

type MultiStringFieldProps = {
  label: string;
  keyPrefix: string;
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

export const MultiStringField = ({
  label,
  keyPrefix,
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
}: MultiStringFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <div className="flex flex-col gap-3">
        {input.value.map((company, index) => (
          <div key={`${keyPrefix}-${index}`} className="flex gap-2">
            <Input
              value={company}
              placeholder={placeholder}
              disabled={isPending}
              onChange={(e) => {
                input.onChange({
                  input: e.target.value.trim(),
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
          className="w-[100px]"
        >
          추가
        </Button>
      </div>
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
