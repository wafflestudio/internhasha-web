import { useDaumPostcodePopup } from 'react-daum-postcode';

import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Input as InputType } from '@/entities/input';

type LocationFieldProps = {
  label: string;
  mainLocationInput: InputType<string>;
  detailedLocationInput: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
  mainLocationPlaceholder?: string;
  detailedLocationPlaceholder?: string;
};

export const LocationField = ({
  label,
  mainLocationInput,
  detailedLocationInput,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
  mainLocationPlaceholder,
  detailedLocationPlaceholder,
}: LocationFieldProps) => {
  const handleGetAddress = (data: { roadAddress: string }) => {
    mainLocationInput.onChange(data.roadAddress);
  };
  const openModal = useDaumPostcodePopup();
  const handleClickButton = () => {
    openModal({ onComplete: handleGetAddress })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <LabelContainer label={label} required={required}>
      <div className="flex gap-2">
        <Input
          value={mainLocationInput.value}
          placeholder={mainLocationPlaceholder}
          disabled={isPending}
          onChange={(e) => {
            mainLocationInput.onChange(e.target.value);
          }}
        />
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleClickButton();
          }}
        >
          주소 찾기
        </Button>
      </div>
      <Input
        value={detailedLocationInput.value}
        placeholder={detailedLocationPlaceholder}
        disabled={isPending}
        onChange={(e) => {
          detailedLocationInput.onChange(e.target.value);
        }}
      />
      <div className="flex flex-col gap-1">
        <FormInfoResponse>{infoMessage}</FormInfoResponse>
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
