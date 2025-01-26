import { SelectContainerWithOptions } from '@waffle/design-system';

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

const INVESTMENT_RANGES = [
  { label: '전체', min: undefined, max: undefined },
  { label: '1억 미만', min: 0, max: 10000 },
  { label: '1억 ~ 5억', min: 10000, max: 50000 },
  { label: '5억~ 10억', min: 50000, max: 100000 },
  { label: '10억~ 50억', min: 100000, max: 500000 },
  { label: '50억~ 100억', min: 500000, max: 1000000 },
  { label: '100억~ 500억', min: 1000000, max: 5000000 },
] as const;

type FilterSectionProps = {
  filterElements: FilterElements;
  onChangeFilters: (filterElements: FilterElements) => void;
};

const RECRUITING_FILTER_VALUE = [
  { value: 2, label: '전체' },
  { value: 0, label: '모집 중' },
  { value: 1, label: '모집 완료' },
];

const VALID_RECRUITING_FILTER_VALUE = RECRUITING_FILTER_VALUE.map(
  (item) => item.value,
);

const SERIES_FILTER_VALUE = [
  { value: 'SEED', label: 'Seed' },
  { value: 'PRE_A', label: 'Pre-Series A' },
  { value: 'B', label: 'Series B' },
  { value: 'C', label: 'Series C' },
  { value: 'D', label: 'Series D' },
];

const VALID_SERIES_FILTER_VALUE = SERIES_FILTER_VALUE.map((item) => item.value);

export const FilterSection = ({
  filterElements,
  onChangeFilters,
}: FilterSectionProps) => {
  console.log(filterElements);
  const handleRecruitingFilter = (input: string) => {
    const inputToNumber = Number(input);

    const isValidRecruitingValue = (value: number): value is 0 | 1 | 2 => {
      return (
        !isNaN(inputToNumber) && VALID_RECRUITING_FILTER_VALUE.includes(value)
      );
    };

    if (isValidRecruitingValue(inputToNumber)) {
      onChangeFilters({
        ...filterElements,
        pathStatus: inputToNumber,
      });
    }
  };

  const isAllSeriesSelected =
    filterElements.series?.length === SERIES_FILTER_VALUE.length;

  const handleSeriesFilter = (input: string) => {
    console.log('here');
    const isValidSeriesValue = (value: string): value is Series | 'ALL' => {
      return value === 'ALL' || VALID_SERIES_FILTER_VALUE.includes(value);
    };

    if (isValidSeriesValue(input)) {
      if (input === 'ALL') {
        if (isAllSeriesSelected) {
          onChangeFilters({
            ...filterElements,
            series: undefined,
          });
          console.log('here2');
        } else {
          onChangeFilters({
            ...filterElements,
            series: VALID_SERIES_FILTER_VALUE as Series[],
          });
        }
        return;
      }

      if (filterElements.series === undefined) {
        onChangeFilters({
          ...filterElements,
          series: [input],
        });
        return;
      }

      if (filterElements.series.includes(input)) {
        onChangeFilters({
          ...filterElements,
          series: filterElements.series.filter((item) => item !== input),
        });
        return;
      }

      onChangeFilters({
        ...filterElements,
        series: [...filterElements.series, input],
      });
    }
  };

  const getCurrentInvestmentRange = () => {
    if (
      filterElements.investmentMin == null &&
      filterElements.investmentMax == null
    )
      return '전체';

    const currentRange = INVESTMENT_RANGES.find(
      (range) =>
        range.min === filterElements.investmentMin &&
        range.max === filterElements.investmentMax,
    );

    return currentRange?.label ?? '전체';
  };

  return (
    <div className="flex gap-5 items-center">
      <Popover>
        <PopoverTrigger>
          <Button
          // variant={
          //   selectedFilter.includes('RECRUITING') ? 'selected' : 'secondary'
          // }
          >
            모집 중 <img src={ICON_SRC.ARROW} className="w-4 h-4 rotate-180" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <RadioGroup
              onValueChange={handleRecruitingFilter}
              defaultValue={String(RECRUITING_FILTER_VALUE[0]?.value)}
            >
              {RECRUITING_FILTER_VALUE.map((option, idx) => (
                <div key={`recruiting-filter-${idx}`}>
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
            <div>
              <Button>초기화</Button>
              <Button>적용</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <Button
          // variant={
          //   selectedFilter.includes('SERIES') ? 'selected' : 'secondary'
          // }
          >
            시리즈 <img src={ICON_SRC.ARROW} className="w-4 h-4 rotate-180" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <div>
              <div key="series-filter-all">
                <Checkbox
                  value="ALL"
                  id="series-all"
                  checked={isAllSeriesSelected}
                  onCheckedChange={() => {
                    handleSeriesFilter('ALL');
                  }}
                />
                <Label htmlFor="seires-all">전체</Label>
              </div>
              {SERIES_FILTER_VALUE.map((option, idx) => (
                <div key={`series-filter-${idx}`}>
                  <Checkbox
                    value={option.value}
                    id={`series-${option.value}`}
                    checked={filterElements.series?.includes(
                      option.value as Series,
                    )}
                    onCheckedChange={() => {
                      handleSeriesFilter(option.value);
                    }}
                  />
                  <Label htmlFor={`series-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            <div>
              <Button>초기화</Button>
              <Button>적용</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <Button
          // variant={
          //   selectedFilter.includes('INVEST_AMOUNT')
          //     ? 'selected'
          //     : 'secondary'
          // }
          >
            투자 금액{' '}
            <img src={ICON_SRC.ARROW} className="w-4 h-4 rotate-180" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
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
