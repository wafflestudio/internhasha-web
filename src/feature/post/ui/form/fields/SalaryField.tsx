import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      <div className="flex items-center gap-2 md:w-[249px]">
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
        <div className="flex gap-[10px] text-grey-900">
          <Checkbox
            id="salary-later"
            checked={isDisabled}
            onCheckedChange={onCheckboxClick}
          />
          <Label htmlFor="salary-later">추후 협의</Label>
        </div>
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
