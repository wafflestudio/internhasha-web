import { CancelButton } from '@/components/button/CancelButton';
import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Input as InputType, ListInput } from '@/entities/input';

type ExternalLinkFieldProps = {
  label: string;
  input: ListInput<{
    link: string;
    description: string;
  }>;
  rawInput: InputType<{
    link: string;
    description: string;
  }>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  inputErrorMessage: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: {
    link?: string;
    description?: string;
  };
};

export const ExternalLinkField = ({
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
}: ExternalLinkFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <div className="flex flex-col gap-3">
        {input.value.map((item, index) => (
          <div
            key={`external-link-${index}`}
            className="relative flex flex-col gap-2 rounded-md border border-grey-200 p-3"
          >
            <Input
              value={item.description}
              placeholder={placeholder?.description}
              disabled={isPending}
              onChange={(e) => {
                input.onChange({
                  input: {
                    link: item.link,
                    description: e.target.value,
                  },
                  index,
                  mode: 'PATCH',
                });
                rawInput.onChange({
                  link: item.link,
                  description: e.target.value,
                });
              }}
            />
            <Input
              value={item.link}
              placeholder={placeholder?.link}
              disabled={isPending}
              onChange={(e) => {
                input.onChange({
                  input: {
                    link: e.target.value,
                    description: item.description,
                  },
                  index,
                  mode: 'PATCH',
                });
                rawInput.onChange({
                  link: e.target.value,
                  description: item.description,
                });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  input.onChange({
                    input: { link: '', description: '' },
                    mode: 'ADD',
                  });
                }
              }}
            />
            <CancelButton
              onClick={() => {
                if (isPending) {
                  return;
                }
                input.onChange({ input: item, index, mode: 'REMOVE' });
              }}
              className="absolute right-[-10px] top-[-10px]"
            />
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          input.onChange({
            input: { link: '', description: '' },
            mode: 'ADD',
          });
        }}
        className="w-[100px]"
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
