import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ICON_SRC } from '@/entities/asset';
import { type FilterElements, type Series } from '@/entities/post';

type FilterSectionProps = {
  filterElements: FilterElements;
  onChangeFilters: (filterElements: FilterElements) => void;
};

const RECRUITING_FILTER_VALUE = [
  { value: 0, label: '모집 중' },
  { value: 1, label: '모집 완료' },
];

const VALID_RECRUITING_FILTER_VALUE = RECRUITING_FILTER_VALUE.map(
  (item) => item.value,
);

const VALID_RECRUITING_OPTION_VALUE = RECRUITING_FILTER_VALUE.map(
  (item) => item.label,
);

type VALID_RECRUITING_FILTER_TYPE = 0 | 1 | undefined;

const SERIES_FILTER_VALUE = [
  { value: 'SEED', label: 'Seed' },
  { value: 'PRE_A', label: 'Pre-Series A' },
  { value: 'B', label: 'Series B' },
  { value: 'C', label: 'Series C' },
  { value: 'D', label: 'Series D' },
];

const VALID_SERIES_FILTER_VALUE = SERIES_FILTER_VALUE.map((item) => item.value);

type VALID_SERIES_FILTER_TYPE = Series[] | undefined;

const INVEST_AMOUNT_VALUE = [
  { label: '1억 미만', value: 'UNDER_1', min: 0, max: 10 },
  { label: '1억 ~ 10억', value: '1_TO_10', min: 10, max: 100 },
  { label: '10억~ 100억', value: '10_TO_100', min: 100, max: 1000 },
  { label: '100억 이상', value: 'OVER_100', min: 1000, max: undefined },
];

const VALID_INVEST_AMOUNT_VALUE = INVEST_AMOUNT_VALUE.map((item) => item.value);

type VALID_INVEST_AMOUNT_TYPE =
  | 'UNDER_1'
  | '1_TO_10'
  | '10_TO_100'
  | 'OVER_100'
  | 'ALL';

const formatLowerAndUpperToInvestAmount = ({
  lower,
  upper,
}: {
  lower: number | undefined;
  upper: number | undefined;
}) => {
  if ((lower === 0 || lower === undefined) && upper === 10) {
    return 'UNDER_1';
  }
  if (lower === 10 && upper === 100) {
    return '1_TO_10';
  }
  if (lower === 100 && upper === 1000) {
    return '10_TO_100';
  }
  if (lower === 1000 && upper === undefined) {
    return 'OVER_100';
  }
  return 'ALL';
};

const formatInvestAmountToLowerAndUpper = ({
  investAmount,
}: {
  investAmount: VALID_INVEST_AMOUNT_TYPE;
}) => {
  if (investAmount === 'UNDER_1') {
    return { lower: 0, upper: 10 };
  }
  if (investAmount === '1_TO_10') {
    return { lower: 10, upper: 100 };
  }
  if (investAmount === '10_TO_100') {
    return { lower: 100, upper: 1000 };
  }
  if (investAmount === 'OVER_100') {
    return { lower: 1000, upper: undefined };
  }
  return { lower: undefined, upper: undefined };
};

export const FilterSection = ({
  filterElements,
  onChangeFilters,
}: FilterSectionProps) => {
  const [recruitingSelect, setRecruitingSelect] =
    useState<VALID_RECRUITING_FILTER_TYPE>(filterElements.pathStatus);
  const [seriesSelect, setSeriesSelect] = useState<VALID_SERIES_FILTER_TYPE>(
    filterElements.series,
  );
  const [investAmountSelect, setInvestAmountSelect] =
    useState<VALID_INVEST_AMOUNT_TYPE>(
      formatLowerAndUpperToInvestAmount({
        lower: filterElements.investmentMin,
        upper: filterElements.investmentMax,
      }),
    );

  const handleChangeRecruitingFilter = (input: string) => {
    if (input === 'ALL') {
      setRecruitingSelect(undefined);
      return;
    }

    const inputToNumber = Number(input);

    const isValidRecruitingValue = (value: number): value is 0 | 1 => {
      return (
        !isNaN(inputToNumber) && VALID_RECRUITING_FILTER_VALUE.includes(value)
      );
    };

    if (isValidRecruitingValue(inputToNumber)) {
      setRecruitingSelect(inputToNumber);
    }
  };

  const isAllSeriesSelected =
    seriesSelect?.length === SERIES_FILTER_VALUE.length;

  const handleChangeSeriesFilter = (input: string) => {
    const isValidSeriesValue = (value: string): value is Series => {
      return VALID_SERIES_FILTER_VALUE.includes(value);
    };

    if (input === 'ALL') {
      if (isAllSeriesSelected) {
        setSeriesSelect(undefined);
      } else {
        setSeriesSelect(VALID_SERIES_FILTER_VALUE as Series[]);
      }
      return;
    }

    if (isValidSeriesValue(input)) {
      if (seriesSelect === undefined) {
        setSeriesSelect([input]);
        return;
      }

      if (seriesSelect.includes(input)) {
        setSeriesSelect(seriesSelect.filter((item) => item !== input));
        return;
      }

      setSeriesSelect([...seriesSelect, input]);
    }
  };

  const handleChangeInvestAmountFilter = (input: string) => {
    const isValidInvestAmountValue = (
      value: string,
    ): value is VALID_INVEST_AMOUNT_TYPE => {
      return VALID_INVEST_AMOUNT_VALUE.includes(value);
    };

    if (input === 'ALL') {
      setInvestAmountSelect('ALL');
      return;
    }

    if (isValidInvestAmountValue(input)) {
      setInvestAmountSelect(input);
    }
  };

  const handleClickApplyRecruitingFilter = () => {
    onChangeFilters({
      ...filterElements,
      pathStatus: recruitingSelect,
    });
  };

  const handleClickApplySeriesFilter = () => {
    onChangeFilters({
      ...filterElements,
      series: seriesSelect,
    });
  };

  const handleClickApplyInvestAmountingFilter = () => {
    const { lower, upper } = formatInvestAmountToLowerAndUpper({
      investAmount: investAmountSelect,
    });
    onChangeFilters({
      ...filterElements,
      investmentMin: lower,
      investmentMax: upper,
    });
  };

  const handleClickResetRecruitButton = () => {
    setRecruitingSelect(undefined);
    onChangeFilters({
      ...filterElements,
      pathStatus: undefined,
    });
  };

  const handleClickResetSeriesButton = () => {
    setSeriesSelect(undefined);
    onChangeFilters({
      ...filterElements,
      series: undefined,
    });
  };

  const handleClickResetInvestAmountButton = () => {
    onChangeFilters({
      ...filterElements,
      investmentMin: undefined,
      investmentMax: undefined,
    });
    setInvestAmountSelect('ALL');
  };

  return (
    <div className="flex gap-5 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={
              filterElements.pathStatus !== undefined ? 'selected' : 'secondary'
            }
            className="bg-white"
          >
            {filterElements.pathStatus !== undefined
              ? VALID_RECRUITING_OPTION_VALUE[filterElements.pathStatus]
              : '모집 상태'}{' '}
            <img src={ICON_SRC.ARROW} className="w-4 h-4 rotate-180" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col p-5 gap-[30px]">
            <RadioGroup
              onValueChange={handleChangeRecruitingFilter}
              defaultValue={
                filterElements.pathStatus === undefined
                  ? 'ALL'
                  : String(filterElements.pathStatus)
              }
              className="flex flex-col gap-[10px]"
            >
              <div className="flex gap-[10px] text-sm text-grey-darker">
                <RadioGroupItem value="ALL" id="recruiting-all" />
                <Label htmlFor="recruiting-all">전체</Label>
              </div>
              {RECRUITING_FILTER_VALUE.map((option, idx) => (
                <div
                  key={`recruiting-filter-${idx}`}
                  className="flex gap-[10px] text-sm text-grey-darker"
                >
                  <RadioGroupItem
                    value={String(option.value)}
                    id={`recruiting-${option.value}`}
                  />
                  <Label htmlFor={`recruiting-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-end gap-[6px]">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClickResetRecruitButton}
              >
                초기화
              </Button>
              <Button size="sm" onClick={handleClickApplyRecruitingFilter}>
                적용
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={
              filterElements.series !== undefined &&
              filterElements.series.length !== 0
                ? 'selected'
                : 'secondary'
            }
            className="bg-white"
          >
            시리즈
            <img src={ICON_SRC.ARROW} className="w-4 h-4 rotate-180" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col p-5 gap-[30px]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex gap-[10px] text-sm text-grey-darker">
                <Checkbox
                  value="ALL"
                  id="series-all"
                  checked={isAllSeriesSelected}
                  onCheckedChange={() => {
                    handleChangeSeriesFilter('ALL');
                  }}
                />
                <Label htmlFor="seires-all">전체</Label>
              </div>
              {SERIES_FILTER_VALUE.map((option, idx) => (
                <div
                  key={`series-filter-${idx}`}
                  className="flex gap-[10px] text-sm text-grey-darker"
                >
                  <Checkbox
                    value={option.value}
                    id={`series-${option.value}`}
                    checked={seriesSelect?.includes(option.value as Series)}
                    onCheckedChange={() => {
                      handleChangeSeriesFilter(option.value);
                    }}
                  />
                  <Label htmlFor={`series-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-[6px]">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClickResetSeriesButton}
              >
                초기화
              </Button>
              <Button size="sm" onClick={handleClickApplySeriesFilter}>
                적용
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={
              filterElements.investmentMax !== undefined ||
              filterElements.investmentMin !== undefined
                ? 'selected'
                : 'secondary'
            }
            className="bg-white"
          >
            투자 금액{' '}
            <img src={ICON_SRC.ARROW} className="w-4 h-4 rotate-180" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col p-5 gap-[30px]">
            <RadioGroup
              onValueChange={handleChangeInvestAmountFilter}
              defaultValue={formatLowerAndUpperToInvestAmount({
                lower: filterElements.investmentMin,
                upper: filterElements.investmentMax,
              })}
              className="flex flex-col gap-[10px]"
            >
              <div className="flex gap-[10px] text-sm text-grey-darker">
                <RadioGroupItem value="ALL" id="invest-amount-all" />
                <Label htmlFor="invest-amount-all">전체</Label>
              </div>
              {INVEST_AMOUNT_VALUE.map((option, idx) => (
                <div
                  key={`invest-amount-filter-${idx}`}
                  className="flex gap-[10px] text-sm text-grey-darker"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`invest-amount-${option.value}`}
                  />
                  <Label htmlFor={`invest-amount-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-end gap-[6px]">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClickResetInvestAmountButton}
              >
                초기화
              </Button>
              <Button size="sm" onClick={handleClickApplyInvestAmountingFilter}>
                적용
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
