import { useState } from 'react';

import { Button } from '@/components/button';
import {
  type FilterElements,
  ROLE_CATEGORY_LIST,
  type RoleCategory,
} from '@/entities/post.ts';

type FilterModalProps = {
  filterElements: FilterElements;
  onChangeFilters: (filterElements: FilterElements) => void;
  onClose: () => void;
  onApply: () => void;
};

export const FilterModal = ({
  filterElements,
  onChangeFilters,
  onClose,
  onApply,
}: FilterModalProps) => {
  const [tempFilters, setTempFilters] =
    useState<FilterElements>(filterElements);

  const handleRoleToggle = (role: RoleCategory) => {
    setTempFilters((prev) => ({
      ...prev,
      roles:
        prev.roles?.includes(role) === true
          ? prev.roles.filter((r) => r !== role)
          : [...(prev.roles ?? []), role],
    }));
  };

  const handleApply = () => {
    onChangeFilters({
      ...tempFilters,
      roles: tempFilters.roles?.length != null ? tempFilters.roles : undefined,
    });
    onApply();
  };
  return (
    <div className="modal">
      <h2>필터링 설정</h2>

      {/* Roles as Checkboxes */}
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
          <span>직무 종류 (roles): </span>
          {ROLE_CATEGORY_LIST.map((role) => (
            <label
              key={role}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <input
                type="checkbox"
                checked={tempFilters.roles?.includes(role) ?? false}
                onChange={() => {
                  handleRoleToggle(role);
                }}
                style={{ width: '16px', height: '16px' }}
              />
              {role}
            </label>
          ))}
        </div>
      </div>

      {/* Investment */}
      <label>
        투자 금액 (investment):
        <input
          type="number"
          value={tempFilters.investor ?? ''}
          onChange={(e) => {
            const value = e.target.value.trim();
            setTempFilters((prev) => ({
              ...prev,
              investor: value !== '' ? value : undefined,
            }));
          }}
        />
      </label>

      {/* Investor */}
      <label>
        투자사 (investor):
        <input
          type="text"
          value={tempFilters.investor ?? ''}
          onChange={(e) => {
            const value = e.target.value.trim();
            setTempFilters((prev) => ({
              ...prev,
              investor: value !== '' ? value : undefined,
            }));
          }}
        />
      </label>

      {/* Path Status */}
      <label>
        진행 상태 (pathStatus):
        <select
          value={tempFilters.pathStatus ?? ''}
          onChange={(e) => {
            const selected = parseInt(e.target.value, 10);
            setTempFilters((prev) => ({
              ...prev,
              pathStatus:
                selected === 0 || selected === 1 || selected === 2
                  ? selected
                  : undefined,
            }));
          }}
        >
          <option value="0">진행중</option>
          <option value="1">진행 완료</option>
          <option value="2">전부</option>
        </select>
      </label>

      <div className="modal-buttons">
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleApply}>적용</Button>
      </div>
    </div>
  );
};
