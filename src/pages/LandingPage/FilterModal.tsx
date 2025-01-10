import { useState } from 'react';

import { Button } from '@/components/button';
import type { Filters } from '@/entities/post';

interface FilterModalProps {
  filters: Filters;
  onClose: () => void;
  onApply: (newFilters: Filters) => void;
}

export const FilterModal = ({
  filters,
  onClose,
  onApply,
}: FilterModalProps) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleInputChange = (
    key: keyof Filters,
    value: string | number | string[],
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="modal">
      <h2>필터링 설정</h2>

      {/* Roles */}
      <label>
        직무 종류 (roles):
        <input
          type="text"
          value={localFilters.roles ?? ''}
          onChange={(e) => {
            handleInputChange('roles', e.target.value.split(','));
          }}
        />
      </label>

      {/* Investment */}
      <label>
        투자 금액 (investment):
        <input
          type="number"
          value={localFilters.investment ?? ''}
          onChange={(e) => {
            handleInputChange('investment', parseInt(e.target.value, 10));
          }}
        />
      </label>

      {/* Investor */}
      <label>
        투자사 (investor):
        <input
          type="text"
          value={localFilters.investor ?? ''}
          onChange={(e) => {
            handleInputChange('investor', e.target.value);
          }}
        />
      </label>

      {/* Path Status */}
      <label>
        진행 상태 (pathStatus):
        <select
          value={localFilters.pathStatus ?? 0}
          onChange={(e) => {
            handleInputChange('pathStatus', parseInt(e.target.value, 10));
          }}
        >
          <option value="0">진행중</option>
          <option value="1">진행 완료</option>
          <option value="2">전부</option>
        </select>
      </label>

      <div className="modal-buttons">
        <Button onClick={onClose}>취소</Button>
        <Button
          onClick={() => {
            onApply(localFilters);
          }}
        >
          적용
        </Button>
      </div>
    </div>
  );
};
