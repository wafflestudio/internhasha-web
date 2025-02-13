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
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        variant="outline"
        className="w-full justify-between"
      >
        {input.minor.value !== 'NONE'
          ? formatMinorJobToLabel(input.minor.value)
          : '직무를 선택해주세요.'}
        <img
          src={ICON_SRC.ARROW}
          className={`${showFilter === 'CATEGORY' ? 'rotate-0' : 'rotate-180'} transition-rotate ease-in-out duration-300`}
        />
      </Button>
      <section className="relative">
        <div
          className={`absolute left-0 top-0 flex gap-2 w-[364px] z-50 rounded-lg bg-white shadow-lg overflow-hidden transition-all duration-300 ${
            showFilter === 'CATEGORY' && !isPending
              ? 'opacity-100 scale-100'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-2 w-[162px] px-2 border-r">
            {JOB_MAJOR_CATEGORIES.map((category) => {
              const formattedLabel = formatMajorJobToLabel(category);

              if (formattedLabel === null) return null;

              return (
                <Button
                  variant="ghost"
                  key={`major-category-${category}`}
                  onClick={(e) => {
                    e.preventDefault();
                    input.major.onChange(category as JobMajorCategory);
                  }}
                  className={`text-grey-darker justify-start ${input.major.value === category ? 'bg-grey-light font-bold' : ''}`}
                >
                  {formatMajorJobToLabel(category)}
                </Button>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 w-[202px]">
            {JOB_CATEGORY_MAP[input.major.value].map((subCategory) => (
              <Button
                variant="ghost"
                key={`sub-category-${subCategory}`}
                value={subCategory}
                onClick={(e) => {
                  e.preventDefault();
                  input.minor.onChange(subCategory);
                  onClick();
                }}
                className={`text-grey-darker justify-start ${input.minor.value === subCategory ? 'bg-grey-light font-bold' : ''}`}
              >
                {formatMinorJobToLabel(subCategory)}
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
