import { CheckboxWithLabel } from '@/components/checkbox/CheckboxWithLabel';
import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Input } from '@/components/ui/input';
import type { Input as InputType } from '@/entities/input';

type SalaryFieldProps = {
  label: string;
  input: InputType<string>;
  unit: string;
  isDisabled: boolean;
  onCheckboxClick(): void;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  infoMessage?: string;
  placeholder?: string;
  required?: boolean;
};

export const SalaryField = ({
  label,
  input,
  unit,
  isDisabled,
  onCheckboxClick,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  placeholder,
  required,
}: SalaryFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <div className="flex w-full items-center gap-2 md:w-[249px]">
        <Input
          id="salary"
          value={
            input.value !== ''
              ? Number(input.value).toLocaleString('ko-KR')
              : ''
          }
          disabled={isPending || isDisabled}
          placeholder={placeholder}
          onChange={(e) => {
            input.onChange(e.target.value);
          }}
        />
        <span className="text-grey-500">{unit}</span>
      </div>
      <div className="flex flex-col gap-1">
        <CheckboxWithLabel
          label="추후 협의"
          checkboxId="salary-later"
          checked={isDisabled}
          onCheckboxClick={onCheckboxClick}
        />
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
