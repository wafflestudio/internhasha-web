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
import { type Domain } from '@/entities/company';
import { type PostFilter } from '@/entities/post';

type FilterSectionProps = {
  postFilter: PostFilter;
  onChangeFilters: (postFilter: PostFilter) => void;
};

const RECRUITING_FILTER_VALUE = [
  { value: true, label: '모집 중' },
  { value: false, label: '모집 완료' },
];

const VALID_RECRUITING_OPTION_VALUE = RECRUITING_FILTER_VALUE.map(
  (item) => item.label,
);

type VALID_RECRUITING_FILTER_TYPE = boolean | undefined;

const DOMAIN_FILTER_VALUE = [
  { value: 'FINTECH', label: '핀테크' },
  { value: 'HEALTHTECH', label: '헬스테크' },
  { value: 'EDUCATION', label: '교육' },
  { value: 'ECOMMERCE', label: '이커머스' },
  { value: 'FOODTECH', label: '푸드테크' },
  { value: 'MOBILITY', label: '모빌리티' },
  { value: 'CONTENTS', label: '컨텐츠' },
  { value: 'B2B', label: 'B2B' },
  { value: 'OTHERS', label: '기타' },
];

const VALID_DOMAIN_FILTER_VALUE = DOMAIN_FILTER_VALUE.map((item) => item.value);

type VALID_DOMAIN_FILTER_TYPE = Domain[] | undefined;

const ORDER_FILTER_VALUE = [
  { value: 0, label: '최신순' },
  { value: 1, label: '마감임박순' },
];

const VALID_ORDER_FILTER_VALUE = ORDER_FILTER_VALUE.map((item) => item.value);

const VALID_ORDER_OPTION_VALUE = ORDER_FILTER_VALUE.map((item) => item.label);

export const FilterSection = ({
  postFilter,
  onChangeFilters,
}: FilterSectionProps) => {
  const [recruitingSelect, setRecruitingSelect] =
    useState<VALID_RECRUITING_FILTER_TYPE>(postFilter.isActive);
  const [domainSelect, setDomainSelect] = useState<VALID_DOMAIN_FILTER_TYPE>(
    postFilter.domains,
  );
  const [selectedFilter, setSelectedFilter] = useState<
    'RECRUITING' | 'DOMAIN' | 'ORDER' | 'NONE'
  >('NONE');

  const handleChangeRecruitingFilter = (input: string) => {
    if (input === 'ALL') {
      setRecruitingSelect(undefined);
      return;
    }

    const inputToBoolean = input === 'true' ? true : false;

    const isValidRecruitingValue = (value: string) => {
      return !(value !== 'true' && value !== 'false');
    };

    if (isValidRecruitingValue(input)) {
      setRecruitingSelect(inputToBoolean);
    }
  };

  const isAllDomainSelected =
    domainSelect?.length === DOMAIN_FILTER_VALUE.length;

  const handleChangeDomainFilter = (input: string) => {
    const isValidDomainValue = (value: string): value is Domain => {
      return VALID_DOMAIN_FILTER_VALUE.includes(value);
    };

    if (input === 'ALL') {
      if (isAllDomainSelected) {
        setDomainSelect(undefined);
      } else {
        setDomainSelect(VALID_DOMAIN_FILTER_VALUE as Domain[]);
      }
      return;
    }

    if (isValidDomainValue(input)) {
      if (domainSelect === undefined) {
        setDomainSelect([input]);
        return;
      }

      if (domainSelect.includes(input)) {
        setDomainSelect(domainSelect.filter((item) => item !== input));
        return;
      }

      setDomainSelect([...domainSelect, input]);
    }
  };

  const handleChangeOrderFilter = (input: string) => {
    const inputToNumber = Number(input);

    const isValidOrderValue = (value: number): value is 0 | 1 => {
      return !isNaN(inputToNumber) && VALID_ORDER_FILTER_VALUE.includes(value);
    };

    if (isValidOrderValue(inputToNumber)) {
      onChangeFilters({
        ...postFilter,
        order: inputToNumber,
      });
    }
  };

  const handleClickApplyRecruitingFilter = () => {
    onChangeFilters({
      ...postFilter,
      isActive: recruitingSelect,
    });
  };

  const handleClickApplyDomainFilter = () => {
    onChangeFilters({
      ...postFilter,
      domains: domainSelect,
    });
  };

  const handleClickResetRecruitButton = () => {
    setRecruitingSelect(undefined);
    onChangeFilters({
      ...postFilter,
      isActive: undefined,
    });
  };

  const handleClickResetDomainButton = () => {
    setDomainSelect(undefined);
    onChangeFilters({
      ...postFilter,
      domains: undefined,
    });
  };

  const handleClickAllResetButton = () => {
    setRecruitingSelect(undefined);
    setDomainSelect(undefined);
    onChangeFilters({});
  };

  return (
    <div className="flex w-full flex-col justify-between gap-3 sm:flex-row">
      <div className="flex flex-row items-center gap-1 md:gap-3">
        <div className="flex items-center gap-[6px]">
          <Popover
            onOpenChange={(open) => {
              if (open) {
                setSelectedFilter('RECRUITING');
                return;
              }
              setSelectedFilter('NONE');
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant={
                  postFilter.isActive !== undefined ? 'selected' : 'secondary'
                }
                className="bg-white px-3 py-2"
              >
                {postFilter.isActive !== undefined
                  ? VALID_RECRUITING_OPTION_VALUE[Number(!postFilter.isActive)]
                  : '모집 상태'}{' '}
                <img
                  src={ICON_SRC.ARROW}
                  className={`${selectedFilter === 'RECRUITING' ? 'rotate-0' : 'rotate-180'} h-4 w-4 duration-300`}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-[30px] p-5">
                <RadioGroup
                  onValueChange={handleChangeRecruitingFilter}
                  value={
                    recruitingSelect === undefined
                      ? 'ALL'
                      : String(recruitingSelect)
                  }
                  className="flex flex-col gap-[10px]"
                >
                  <div className="flex gap-[10px] text-grey-900">
                    <RadioGroupItem value="ALL" id="recruiting-all" />
                    <Label htmlFor="recruiting-all">전체</Label>
                  </div>
                  {RECRUITING_FILTER_VALUE.map((option, idx) => (
                    <div
                      key={`recruiting-filter-${idx}`}
                      className="flex gap-[10px] text-grey-900"
                    >
                      <RadioGroupItem
                        value={String(option.value)}
                        id={`recruiting-${idx}`}
                      />
                      <Label htmlFor={`recruiting-${idx}`}>
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

          <Popover
            onOpenChange={(open) => {
              if (open) {
                setSelectedFilter('DOMAIN');
                return;
              }
              setSelectedFilter('NONE');
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant={
                  postFilter.domains !== undefined &&
                  postFilter.domains.length !== 0
                    ? 'selected'
                    : 'secondary'
                }
                className="bg-white px-3 py-2"
              >
                업종
                <img
                  src={ICON_SRC.ARROW}
                  className={`${selectedFilter === 'DOMAIN' ? 'rotate-0' : 'rotate-180'} h-4 w-4 duration-300`}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-[30px] p-5">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex gap-[10px] text-grey-900">
                    <Checkbox
                      value="ALL"
                      id="domain-all"
                      checked={isAllDomainSelected}
                      onCheckedChange={() => {
                        handleChangeDomainFilter('ALL');
                      }}
                    />
                    <Label htmlFor="domain-all">전체</Label>
                  </div>
                  {DOMAIN_FILTER_VALUE.map((option, idx) => (
                    <div
                      key={`domain-filter-${idx}`}
                      className="flex gap-[10px] text-grey-900"
                    >
                      <Checkbox
                        value={option.value}
                        id={`domain-${option.value}`}
                        checked={
                          domainSelect !== undefined &&
                          domainSelect.includes(option.value as Domain)
                        }
                        onCheckedChange={() => {
                          handleChangeDomainFilter(option.value);
                        }}
                      />
                      <Label htmlFor={`domain-${option.value}`}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-[6px]">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClickResetDomainButton}
                  >
                    초기화
                  </Button>
                  <Button size="sm" onClick={handleClickApplyDomainFilter}>
                    적용
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          variant="ghost"
          className="px-2"
          onClick={handleClickAllResetButton}
        >
          <img src={ICON_SRC.REFRESH} />
          초기화
        </Button>
      </div>
      <Popover
        onOpenChange={(open) => {
          if (open) {
            setSelectedFilter('ORDER');
            return;
          }
          setSelectedFilter('NONE');
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant={postFilter.order !== undefined ? 'selected' : 'secondary'}
            className="w-fit bg-white px-3 py-2"
          >
            {postFilter.order !== undefined
              ? VALID_ORDER_OPTION_VALUE[postFilter.order]
              : '최신순'}{' '}
            <img
              src={ICON_SRC.ARROW}
              className={`${selectedFilter === 'ORDER' ? 'rotate-0' : 'rotate-180'} h-4 w-4 duration-300`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-[30px] p-5">
            <RadioGroup
              onValueChange={handleChangeOrderFilter}
              value={
                postFilter.order === undefined ? '0' : String(postFilter.order)
              }
              className="flex flex-col gap-[10px]"
            >
              {ORDER_FILTER_VALUE.map((option, idx) => (
                <div
                  key={`order-filter-${idx}`}
                  className="flex gap-[10px] text-grey-900"
                >
                  <RadioGroupItem
                    value={String(option.value)}
                    id={`order-${option.value}`}
                  />
                  <Label htmlFor={`order-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
