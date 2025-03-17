import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import type { SelectInput } from '@/entities/input';

type StringSelectFieldProps<T extends string> = {
  label: string;
  input: SelectInput<'NONE' | T>;
  inputList: T[];
  formatter: (input: T) => string;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
};

export const StringSelectField = <T extends string>({
  label,
  input,
  inputList,
  formatter,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
}: StringSelectFieldProps<T>) => {
  return (
    <LabelContainer label={label} required={required}>
      <Select
        disabled={isPending}
        onValueChange={input.onChange}
        defaultValue="NONE"
      >
        <div>
          <SelectTrigger
            className={`${input.value !== 'NONE' ? 'text-grey-900' : 'text-grey-300'} w-[190px]`}
          >
            {input.value !== 'NONE'
              ? formatter(input.value)
              : '시리즈를 선택해주세요.'}
          </SelectTrigger>
          <SelectContent>
            {inputList.map((item, idx) => (
              <SelectItem key={idx} value={item} className="text-grey-900">
                {item !== 'NONE' && formatter(item)}
              </SelectItem>
            ))}
          </SelectContent>
        </div>
      </Select>
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
