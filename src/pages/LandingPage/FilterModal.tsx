import { useState } from 'react';

import { Button } from '@/components/button';

interface FilterModalProps {
  roles: string[] | undefined;
  setRoles: React.Dispatch<React.SetStateAction<string[] | undefined>>;
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
  const [tempRoles, setTempRoles] = useState(roles);
  const [tempInvestment, setTempInvestment] = useState(investment);
  const [tempInvestor, setTempInvestor] = useState(investor);
  const [tempPathStatus, setTempPathStatus] = useState(pathStatus);

  const handleApply = () => {
    setRoles(tempRoles);
    setInvestment(tempInvestment);
    setInvestor(tempInvestor);
    setPathStatus(tempPathStatus);

    onApply();
  };

  return (
    <div className="modal">
      <h2>필터링 설정</h2>

      {/* Roles */}
      <label>
        직무 종류 (roles):
        <input
          type="text"
          value={tempRoles?.join(',') ?? ''}
          onChange={(e) => {
            const rawValue = e.target.value.trim();
            setTempRoles(rawValue !== '' ? rawValue.split(',') : undefined);
          }}
        />
      </label>

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
          <option value="">선택 안 함</option>
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
