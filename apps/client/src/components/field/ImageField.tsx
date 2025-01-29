import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import type { Input as InputType } from '@/entities/input';

type ImageFieldProps = {
  label: string;
  input: InputType<{ file: File; url: string } | null>;
  isPending: boolean;
  isSubmit: boolean;
  errorMessage: string;
  responseErrorMessage?: string;
  infoMessage?: string;
  required?: boolean;
};

export const ImageField = ({
  label,
  input,
  isPending,
  isSubmit,
  errorMessage,
  responseErrorMessage,
  infoMessage,
  required,
}: ImageFieldProps) => {
  const addImage = (file: File | undefined) => {
    if (file !== undefined && file.type.startsWith('image/')) {
      input.onChange({ file, url: URL.createObjectURL(file) });
    }
  };

  const removeImage = () => {
    input.onChange(null);
  };

  return (
    <LabelContainer label={label} required={required}>
      {input.value !== null ? (
        <div>
          <img src={input.value.url} alt="썸네일" />
          <Button onClick={removeImage} disabled={isPending}>
            삭제
          </Button>
        </div>
      ) : (
        <label htmlFor="fileInput">
          <span>이미지 등록</span>
        </label>
      )}
      <input
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
        {isSubmit && input.isError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
        {responseErrorMessage !== '' && (
          <FormErrorResponse>{responseErrorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
