import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ICON_SRC } from '@/entities/asset';
import type { Input } from '@/entities/input';

type EmploymentEndDateField = {
  label: string;
  showFilter: string;
  onClick(): void;
  onCheckboxClick(): void;
  input: Input<string>;
  isPending: boolean;
  isDisabled: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
};

export const EmploymentEndDateField = ({
  label,
  showFilter,
  onClick,
  onCheckboxClick,
  input,
  isPending,
  isDisabled,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
}: EmploymentEndDateField) => {
  return (
    <LabelContainer label={label} required={required}>
      <div className="relative">
        <div
          className={`absolute bottom-0 left-0 mt-2 w-[340px] overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ${
            showFilter === 'CALENDAR'
              ? 'scale-100 opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <Calendar
            mode="single"
            disabled={isPending}
            selected={new Date(input.value)}
            onSelect={(value: Date | undefined) => {
              input.onChange(
                value !== undefined
                  ? new Date(value)
                      .toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                      .replace(/\. /g, '-')
                      .replace('.', '')
                  : '',
              );
              onClick();
            }}
          />
        </div>
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        disabled={isDisabled}
        variant="outline"
        className="w-full justify-start"
      >
        {input.value !== ''
          ? new Date(input.value)
              .toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              .replace(/\. /g, '-')
              .replace('.', '')
          : '모집 마감일을 선택해주세요.'}
        <img src={ICON_SRC.CALENDAR} />
      </Button>
      <div className="flex flex-col gap-1">
        <div className="flex gap-[10px] text-grey-900">
          <Checkbox
            id="always-hire"
            checked={isDisabled}
            onCheckedChange={onCheckboxClick}
          />
          <Label htmlFor="always-hire">상시 채용</Label>
        </div>
        <FormInfoResponse>{infoMessage}</FormInfoResponse>
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
