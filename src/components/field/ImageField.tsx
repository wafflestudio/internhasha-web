import { useRef } from 'react';

import { CancelButton } from '@/components/button/CancelButton';
import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { ICON_SRC } from '@/entities/asset';
import type { Input as InputType } from '@/entities/input';

type ImageFieldProps = {
  label: string;
  input: InputType<{ file: File; url: string } | null>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
};

export const ImageField = ({
  label,
  input,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
}: ImageFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addImage = (file: File | undefined) => {
    if (file !== undefined) {
      input.onChange({ file, url: URL.createObjectURL(file) });
    }
  };

  const removeImage = () => {
    input.onChange(null);
    if (fileInputRef.current !== null) {
      fileInputRef.current.value = '';
    }
  };

  const showError = (!isSubmit && input.isError) || (isSubmit && isSubmitError);

  return (
    <LabelContainer label={label} required={required}>
      {input.value !== null && !input.isError ? (
        <div className="relative h-[100px] w-[100px] rounded-md border border-grey-200">
          <img
            src={input.value.url}
            alt="썸네일"
            className="h-full w-full rounded-md object-cover"
          />
          <CancelButton
            onClick={() => {
              if (isPending) {
                return;
              }
              removeImage();
            }}
            className="absolute right-[-10px] top-[-10px]"
          />
        </div>
      ) : (
        <label
          htmlFor="fileInput"
          className="flex h-[100px] w-[100px] flex-col items-center justify-center gap-1 rounded-md bg-grey-100"
        >
          <img src={ICON_SRC.CAMERA} />
          <span className="text-xs text-grey-400">이미지 등록</span>
        </label>
      )}
      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        disabled={isPending}
        onChange={(e) => {
          if (e.target.files !== null) {
            addImage(e.target.files[0]);
          }
        }}
      />
      <div className="flex flex-col gap-1">
        {infoMessage !== undefined && (
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
        )}
        {showError && <FormErrorResponse>{errorMessage}</FormErrorResponse>}
      </div>
    </LabelContainer>
  );
};
