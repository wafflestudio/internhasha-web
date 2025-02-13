import { useEffect, useRef } from 'react';

import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import type { Input as InputType } from '@/entities/input';

type SloganFieldProps = {
  label: string;
  input: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  maxLength: number;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
};

export const SloganField = ({
  label,
  input,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
  placeholder,
  maxLength,
}: SloganFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞춰 자동 조절
    }
  }, [input.value]);

  return (
    <LabelContainer label={label} required={required}>
      {/* TODO: 타이핑이 버벅임. */}
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        className="w-full text-sm min-h-[auto] max-h-[240px] resize-none overflow-hidden border rounded-sm px-[10px] py-[11px] placeholder:text-grey-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        value={input.value}
        rows={1}
        disabled={isPending}
        onChange={(e) => {
          input.onChange(e.target.value);
        }}
      />
      <div className="flex flex-col gap-1">
        <div className="flex w-full justify-between">
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
          <span
            className={`text-sm ${input.value.length > maxLength ? 'text-red' : 'text-grey-normal'}`}
          >
            {input.value.length}/{maxLength}
          </span>
        </div>
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
