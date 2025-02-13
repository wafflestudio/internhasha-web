import { CancelButton } from '@/components/button/CancelButton';
import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Input } from '@/components/ui/input';
import type { Input as InputType, ListInput } from '@/entities/input';

type HashtagFieldProps = {
  label: string;
  input: ListInput<string>;
  rawInput: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  inputErrorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
};

export const HashtagField = ({
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
}: HashtagFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      {/* TODO: Input 안에 해시태그 넣기*/}
      {input.value.length !== 0 && (
        <div className="w-full p-2 rounded-lg flex flex-wrap gap-2 bg-white">
          {input.value.map((tag, index) => (
            <div
              key={`tag-${tag}`}
              className="inline-flex items-center gap-1 bg-grey-light-active px-2 py-1 rounded-md"
            >
              <span className="text-sm">{tag}</span>
              <CancelButton
                onClick={() => {
                  input.onChange({ input: tag, index, mode: 'REMOVE' });
                }}
                className="w-4 h-4"
              />
            </div>
          ))}
        </div>
      )}
      <Input
        value={rawInput.value}
        placeholder={placeholder}
        disabled={isPending}
        onChange={(e) => {
          rawInput.onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (!rawInput.isError) {
              input.onChange({ input: rawInput.value.trim(), mode: 'ADD' });
              rawInput.onChange('');
            }
          }
        }}
      />
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
