import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import type { Input } from '@/entities/input';
import type { JobMajorCategory, JobMinorCategory } from '@/entities/post';
import { JOB_CATEGORY_MAP, JOB_MAJOR_CATEGORIES } from '@/entities/post';
import { cn } from '@/lib/utils';
import { formatMajorJobToLabel, formatMinorJobToLabel } from '@/util/format';

type JobCategoryFieldProps = {
  label: string;
  showFilter: string;
  onClick(): void;
  input: {
    major: Input<JobMajorCategory>;
    minor: Input<JobMinorCategory | 'NONE'>;
  };
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
};

export const JobCategoryField = ({
  label,
  showFilter,
  onClick,
  input,
  isPending,
  isSubmit,
  isSubmitError,
  errorMessage,
  infoMessage,
  required,
}: JobCategoryFieldProps) => {
  return (
    <LabelContainer label={label} required={required}>
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        variant="outline"
        className="w-full justify-between"
      >
        <span className={input.minor.value === 'NONE' ? 'text-grey-500' : ''}>
          {input.minor.value !== 'NONE'
            ? formatMinorJobToLabel(input.minor.value)
            : '직무를 선택해주세요.'}
        </span>
        <img
          src={ICON_SRC.ARROW}
          className={`${showFilter === 'CATEGORY' ? 'rotate-0' : 'rotate-180'} transition-rotate duration-300 ease-in-out`}
        />
      </Button>
      <section className="relative">
        <div
          className={`absolute left-0 top-0 z-50 flex w-full max-w-[364px] gap-2 overflow-hidden rounded-lg bg-white p-3 pl-1 shadow-lg transition-all duration-300 ${
            showFilter === 'CATEGORY' && !isPending
              ? 'scale-100 opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="flex w-[162px] flex-col gap-1 border-r px-2">
            {JOB_MAJOR_CATEGORIES.map((category) => {
              return (
                <Button
                  type="button"
                  variant="ghost"
                  key={`major-category-${category}`}
                  onClick={(e) => {
                    e.preventDefault();
                    input.major.onChange(category as JobMajorCategory);
                  }}
                  className={cn(
                    'justify-between font-medium text-grey-900 hover:bg-grey-50',
                    input.major.value === category
                      ? 'bg-grey-50 font-bold'
                      : '',
                  )}
                >
                  {formatMajorJobToLabel(category)}
                  {input.major.value === category && (
                    <img src={ICON_SRC.CHECK} />
                  )}
                </Button>
              );
            })}
          </div>
          <div className="flex w-[202px] flex-col gap-1">
            {JOB_CATEGORY_MAP[input.major.value].map((subCategory) => (
              <Button
                type="button"
                variant="ghost"
                key={`sub-category-${subCategory}`}
                value={subCategory}
                onClick={(e) => {
                  e.preventDefault();
                  input.minor.onChange(subCategory);
                  onClick();
                }}
                className={cn(
                  'justify-between font-medium text-grey-900 hover:bg-grey-50',
                  input.minor.value === subCategory
                    ? 'bg-grey-50 font-bold'
                    : '',
                )}
              >
                {formatMinorJobToLabel(subCategory)}
                {input.minor.value === subCategory && (
                  <img src={ICON_SRC.CHECK} />
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-1">
        {infoMessage !== undefined && (
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
        )}
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
