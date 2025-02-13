import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Input } from '@/components/ui/input';
import type { Input as InputType } from '@/entities/input';

type InvestAmountFieldProps = {
  label: string;
  input: InputType<string>;
  unit: string;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
};

export const InvestAmountField = ({
  label,
  input,
  unit,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
}: InvestAmountFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <div className="flex items-center gap-2">
        <Input
          id="investAmount"
          value={input.value}
          placeholder="100"
          disabled={isPending}
          onChange={(e) => {
            input.onChange(e.target.value);
          }}
          className="w-[190px]"
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
