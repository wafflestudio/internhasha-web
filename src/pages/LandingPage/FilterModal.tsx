import { useState } from 'react';

import { Button } from '@/components/button';
import { ROLE_CATEGORY_LIST, type RoleCategory } from '@/entities/Post.ts';

interface FilterModalProps {
  roles: RoleCategory[] | undefined;
  setRoles: React.Dispatch<React.SetStateAction<RoleCategory[] | undefined>>;
  investment: number | undefined;
  setInvestment: React.Dispatch<React.SetStateAction<number | undefined>>;
  investor: string | undefined;
  setInvestor: React.Dispatch<React.SetStateAction<string | undefined>>;
  pathStatus: 0 | 1 | 2 | undefined;
  setPathStatus: React.Dispatch<React.SetStateAction<0 | 1 | 2 | undefined>>;
  onClose: () => void;
  onApply: () => void;
}

export const FilterModal = ({
  roles,
  setRoles,
  investment,
  setInvestment,
  investor,
  setInvestor,
  pathStatus,
  setPathStatus,
  onClose,
  onApply,
}: FilterModalProps) => {
  const [tempRoles, setTempRoles] = useState<RoleCategory[]>(roles ?? []);
  const [tempInvestment, setTempInvestment] = useState(investment);
  const [tempInvestor, setTempInvestor] = useState(investor);
  const [tempPathStatus, setTempPathStatus] = useState(pathStatus);

  const handleRoleToggle = (role: RoleCategory) => {
    setTempRoles((prev) => {
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role);
      }
      return [...prev, role];
    });
  };

  const handleApply = () => {
    // 빈 배열일 경우 undefined 처리
    setRoles(tempRoles.length > 0 ? tempRoles : undefined);
    setInvestment(tempInvestment);
    setInvestor(tempInvestor);
    setPathStatus(tempPathStatus);
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
                checked={tempRoles.includes(role)}
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
          value={tempInvestment ?? ''}
          onChange={(e) => {
            const numValue = parseInt(e.target.value, 10);
            setTempInvestment(isNaN(numValue) ? undefined : numValue);
          }}
        />
      </label>

      {/* Investor */}
      <label>
        투자사 (investor):
        <input
          type="text"
          value={tempInvestor ?? ''}
          onChange={(e) => {
            const value = e.target.value.trim();
            setTempInvestor(value !== '' ? value : undefined);
          }}
        />
      </label>

      {/* Path Status */}
      <label>
        진행 상태 (pathStatus):
        <select
          value={tempPathStatus ?? ''}
          onChange={(e) => {
            const selected = parseInt(e.target.value, 10);
            setTempPathStatus(
              selected === 0 || selected === 1 || selected === 2
                ? selected
                : undefined,
            );
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
