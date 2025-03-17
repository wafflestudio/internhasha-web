import { useRef } from 'react';

import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import type { Input as InputType } from '@/entities/input';

type PdfFieldProps = {
  label: string;
  input: InputType<{ file: File; url: string } | null>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
};

export const PdfField = ({
  label,
  input,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
}: PdfFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addPdfPreview = (file: File | undefined) => {
    if (file !== undefined) {
      input.onChange({ file, url: URL.createObjectURL(file) });
    }
  };

  const removePdf = () => {
    input.onChange(null);
    if (fileInputRef.current !== null) {
      fileInputRef.current.value = '';
    }
  };

  const showError = (!isSubmit && input.isError) || (isSubmit && isSubmitError);

  return (
    <LabelContainer label={label} required={required}>
      {input.value !== null && !input.isError ? (
        <div className="flex gap-2">
          <div className="jusify-between flex w-full items-center gap-2 rounded-md border border-grey-200 px-[12px] py-[11px]">
            <p className="text-sm text-grey-300">{input.value.file.name}</p>
          </div>
          <Button disabled={isPending} onClick={removePdf}>
            삭제
          </Button>
        </div>
      ) : (
        <label
          htmlFor="pdfInput"
          className="flex w-full items-center gap-2 rounded-md border border-grey-200 px-[12px] py-[11px]"
        >
          <img src={ICON_SRC.UPLOAD} />
          <span className="text-sm text-grey-300">
            PDF 파일만 업로드 가능해요.
          </span>
        </label>
      )}
      <input
        ref={fileInputRef}
        id="pdfInput"
        type="file"
        accept="application/pdf"
        className="hidden"
        disabled={isPending}
        onChange={(e) => {
          if (e.target.files !== null) {
            addPdfPreview(e.target.files[0]);
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
