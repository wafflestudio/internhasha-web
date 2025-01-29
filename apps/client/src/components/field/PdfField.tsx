import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import type { Input as InputType } from '@/entities/input';

type PdfFieldProps = {
  label: string;
  input: InputType<{ file: File; url: string } | null>;
  isPending: boolean;
  isSubmit: boolean;
  errorMessage: string;
  responseErrorMessage?: string;
  infoMessage?: string;
  required?: boolean;
};

export const PdfField = ({
  label,
  input,
  isPending,
  isSubmit,
  errorMessage,
  responseErrorMessage,
  infoMessage,
  required,
}: PdfFieldProps) => {
  const addPdfPreview = (file: File | undefined) => {
    if (file !== undefined && file.type === 'application/pdf') {
      input.onChange({ file, url: URL.createObjectURL(file) });
    }
  };

  const removePdf = () => {
    input.onChange(null);
  };
  return (
    <LabelContainer label={label} required={required}>
      {input.value !== null ? (
        <div>
          <p>{input.value.file.name}</p>
          <Button disabled={isPending} onClick={removePdf}>
            삭제
          </Button>
        </div>
      ) : (
        <label htmlFor="pdfInput">
          <span>PDF 파일만 업로드 가능해요.</span>
        </label>
      )}
      <input
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
        {isSubmit && input.isError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
        {responseErrorMessage !== '' && <p>{responseErrorMessage}</p>}
      </div>
    </LabelContainer>
  );
};
