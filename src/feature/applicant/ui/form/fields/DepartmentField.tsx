import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Input as InputType, ListInput } from '@/entities/input';

type DepartmentsFieldProps = {
  label: string;
  majorInput: InputType<string>;
  minorListInput: ListInput<string>;
  minorRawInput: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  inputErrorMessage: string;
  infoMessage?: string;
  required?: boolean;
  majorPlaceholder?: string;
  minorPlaceholder?: string;
};

export const DepartmentsField = ({
  label,
  majorInput,
  minorListInput,
  minorRawInput,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  inputErrorMessage,
  infoMessage,
  required,
  majorPlaceholder,
  minorPlaceholder,
}: DepartmentsFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <div className="flex flex-col gap-3">
        <Input
          value={majorInput.value}
          placeholder={majorPlaceholder}
          disabled={isPending}
          onChange={(e) => {
            majorInput.onChange(e.target.value);
          }}
        />
        {minorListInput.value.map((item, index) => (
          <div key={`department-${index}`} className="flex gap-2">
            <Input
              value={item}
              placeholder={minorPlaceholder}
              disabled={isPending}
              onChange={(e) => {
                minorListInput.onChange({
                  input: e.target.value,
                  index,
                  mode: 'PATCH',
                });
                minorRawInput.onChange(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  minorListInput.onChange({ input: '', mode: 'ADD' });
                }
              }}
            />
            <Button
              variant="outline"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                minorListInput.onChange({
                  input: item,
                  index,
                  mode: 'REMOVE',
                });
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
            minorListInput.onChange({ input: '', mode: 'ADD' });
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
        {(majorInput.isError || minorRawInput.isError) && (
          <FormErrorResponse>{inputErrorMessage}</FormErrorResponse>
        )}
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
