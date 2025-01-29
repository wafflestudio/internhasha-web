import MDEditor from '@uiw/react-md-editor';

import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import type { Input as InputType } from '@/entities/input';

type MarkdownEditorFieldProps = {
  label: string;
  input: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  errorMessage: string;
  maxLength: number;
  infoMessage?: string;
  required?: boolean;
};

export const MarkdownEditorField = ({
  label,
  input,
  isPending,
  isSubmit,
  errorMessage,
  infoMessage,
  required,
  maxLength,
}: MarkdownEditorFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <div data-color-mode="light">
        <MDEditor
          textareaProps={{
            disabled: isPending,
          }}
          value={input.value}
          onChange={(value) => {
            input.onChange(value ?? '');
          }}
        />
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex w-full justify-between">
            <FormInfoResponse>{infoMessage}</FormInfoResponse>
            <span
              className={`text-sm ${input.value.length > maxLength ? 'text-red' : 'text-grey-normal'}`}
            >
              {input.value.length}/{maxLength}
            </span>
          </div>
          {isSubmit && input.isError && (
            <FormErrorResponse>{errorMessage}</FormErrorResponse>
          )}
        </div>
      </div>
    </LabelContainer>
  );
};
