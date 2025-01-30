import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Input as InputType, ListInput } from '@/entities/input';

type HashtagFieldProps = {
  label: string;
  input: ListInput<string>;
  rawInput: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
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
  errorMessage,
  inputErrorMessage,
  infoMessage,
  required,
  placeholder,
}: HashtagFieldProps) => {
  const MAX_TAG_LENGTH = 8;

  // TODO: input과 form valdation을 모두 동일한 presentation 계층에서 처리
  const tagValidator = ({ tag, tags }: { tag: string; tags: string[] }) => {
    if (tags.includes(tag)) {
      return false;
    }
    if (tag.length > MAX_TAG_LENGTH || tag.length === 0) {
      return false;
    }
    return true;
  };

  const tagInputValidator = ({
    tag,
    tags,
  }: {
    tag: string;
    tags: string[];
  }) => {
    return !(tags.includes(tag) || tag.length > MAX_TAG_LENGTH);
  };

  return (
    <LabelContainer label={label} required={required}>
      {input.value.map((tag, index) => (
        <div key={`tag-${tag}`}>
          <span>{tag}</span>
          <Button
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              input.onChange({ input: tag, index, mode: 'REMOVE' });
            }}
          >
            삭제
          </Button>
        </div>
      ))}
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
            if (
              tagValidator({ tag: rawInput.value.trim(), tags: input.value })
            ) {
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
        {inputErrorMessage !== undefined &&
          !tagInputValidator({
            tag: rawInput.value.trim(),
            tags: input.value,
          }) && <FormErrorResponse>{inputErrorMessage}</FormErrorResponse>}
        {isSubmit && input.isError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
