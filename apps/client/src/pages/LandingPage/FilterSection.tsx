import { SelectContainerWithOptions } from '@waffle/design-system';

import {
  type FilterElements,
  ROLE_CATEGORY_LIST,
  type RoleCategory,
} from '@/entities/post';

const INVESTMENT_RANGES = [
  { label: '전체', min: undefined, max: undefined },
  { label: '1억 원 미만', min: 0, max: 10000 },
  { label: '1억 원 이상 ~ 5억 원 미만', min: 10000, max: 50000 },
  { label: '5억 원 이상 ~ 10억 원 미만', min: 50000, max: 100000 },
  { label: '10억 원 이상 ~ 50억 원 미만', min: 100000, max: 500000 },
  { label: '50억 원 이상 ~ 100억 원 미만', min: 500000, max: 1000000 },
  { label: '100억 원 이상 ~ 500억 원 미만', min: 1000000, max: 5000000 },
] as const;

type FilterSectionProps = {
  filterElements: FilterElements;
  onChangeFilters: (filterElements: FilterElements) => void;
};

export const FilterSection = ({
  filterElements,
  onChangeFilters,
}: FilterSectionProps) => {
  const handleRoleToggle = (role: RoleCategory) => {
    const newRoles =
      filterElements.roles?.includes(role) === true
        ? filterElements.roles.filter((r) => r !== role)
        : [...(filterElements.roles ?? []), role];

    onChangeFilters({
      ...filterElements,
      roles: newRoles.length > 0 ? newRoles : undefined,
    });
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
    <div className="filter-section" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <SelectContainerWithOptions
          id="pathStatus"
          value={filterElements.pathStatus}
          options={[
            { value: 0, label: '전체' },
            { value: 1, label: '모집 중' },
            { value: 2, label: '모집 완료' },
          ]}
          onChange={(value) => {
            onChangeFilters({
              ...filterElements,
              pathStatus: typeof value === 'number' ? value : undefined,
            });
          }}
          label="모집 상태"
        />

        <SelectContainerWithOptions
          id="investmentRange"
          value={getCurrentInvestmentRange()}
          options={INVESTMENT_RANGES.map((range) => ({
            value: range.label,
            label: range.label,
          }))}
          onChange={(value) => {
            const range = INVESTMENT_RANGES.find((r) => r.label === value);
            onChangeFilters({
              ...filterElements,
              investmentMin: range?.min,
              investmentMax: range?.max,
            });
          }}
          label="투자금액"
        />
      </div>

      {/* 직무 체크박스 */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {ROLE_CATEGORY_LIST.map((role) => (
          <label
            key={role}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <input
              type="checkbox"
              checked={filterElements.roles?.includes(role) ?? false}
              onChange={() => {
                handleRoleToggle(role);
              }}
            />
            {role}
          </label>
        ))}
      </div>
    </div>
  );
};
