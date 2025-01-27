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
import { Slider } from '@/components/ui/slider';
import { ICON_SRC } from '@/entities/asset';
import { type FilterElements, type Series } from '@/entities/post';

// const INVESTMENT_RANGES = [
//   { label: '전체', min: undefined, max: undefined },
//   { label: '1억 미만', min: 0, max: 10000 },
//   { label: '1억 ~ 5억', min: 10000, max: 50000 },
//   { label: '5억~ 10억', min: 50000, max: 100000 },
//   { label: '10억~ 50억', min: 100000, max: 500000 },
//   { label: '50억~ 100억', min: 500000, max: 1000000 },
//   { label: '100억~ 500억', min: 1000000, max: 5000000 },
// ] as const;

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

export const FilterSection = ({
  filterElements,
  onChangeFilters,
}: FilterSectionProps) => {
  const [recruitingSelect, setRecruitingSelect] =
    useState<VALID_RECRUITING_FILTER_TYPE>(filterElements.pathStatus);
  const [seriesSelect, setSeriesSelect] = useState<VALID_SERIES_FILTER_TYPE>(
    filterElements.series,
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

  const handleClickApplyRecruitingFilter = () => {
    onChangeFilters({
      ...filterElements,
      pathStatus: recruitingSelect,
    });
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

  const handleClickApplySeriesFilter = () => {
    onChangeFilters({
      ...filterElements,
      series: seriesSelect,
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

  // const getCurrentInvestmentRange = () => {
  //   if (
  //     filterElements.investmentMin == null &&
  //     filterElements.investmentMax == null
  //   )
  //     return '전체';

  //   const currentRange = INVESTMENT_RANGES.find(
  //     (range) =>
  //       range.min === filterElements.investmentMin &&
  //       range.max === filterElements.investmentMax,
  //   );

  //   return currentRange?.label ?? '전체';
  // };

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
                recruitingSelect === undefined
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
          <div>
            <Slider
              defaultValue={[20, 80]} // 두 개의 핸들 (하한, 상한)
              max={100}
              step={1}
            />
            <p>전체</p>
            <p>시드</p>
            <p>프리 시리즈 A</p>
            <p>시리즈 A</p>
            <p>시리즈 B</p>
            <p>시리즈 C</p>
            <p>시리즈 D</p>
            <div>
              <Button>초기화</Button>
              <Button>적용</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* <SelectContainerWithOptions
        id="series"
        value={filterElements.series}
        options={[
          { value: 'SEED', label: 'Seed' },
          { value: 'PRE_A', label: 'Pre-Series A' },
          { value: 'B', label: 'Series B' },
          { value: 'C', label: 'Series C' },
          { value: 'D', label: 'Series D' },
        ]}
        onChange={(value) => {
          onChangeFilters({
            ...filterElements,
            series: typeof value === 'string' ? value : undefined,
          });
        }}
        label="시리즈"
      /> */}
    </div>
  );
};
