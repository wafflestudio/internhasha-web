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
  return (
    <div className="modal">
      <h2>필터링 설정</h2>

      {/* (1) Roles */}
      <label>
        직무 종류 (roles):
        <input
          type="text"
          value={roles?.join(',') ?? ''}
          onChange={(e) => {
            // 쉼표로 분리된 문자열을 배열로 변환
            const rawValue = e.target.value.trim();
            setRoles(rawValue !== '' ? rawValue.split(',') : undefined);
          }}
        />
      </label>

      {/* (2) Investment */}
      <label>
        투자 금액 (investment):
        <input
          type="number"
          value={investment ?? ''}
          onChange={(e) => {
            const numValue = parseInt(e.target.value, 10);
            setInvestment(isNaN(numValue) ? undefined : numValue);
          }}
        />
      </label>

      {/* (3) Investor */}
      <label>
        투자사 (investor):
        <input
          type="text"
          value={investor ?? ''}
          onChange={(e) => {
            const value = e.target.value.trim();
            setInvestor(value !== '' ? value : undefined);
          }}
        />
      </label>

      {/* (4) Path Status */}
      <label>
        진행 상태 (pathStatus):
        <select
          value={pathStatus ?? ''}
          onChange={(e) => {
            const selected = parseInt(e.target.value, 10);
            // 0|1|2 중 하나면 세팅, 아니면 undefined로
            setPathStatus(
              selected === 0 || selected === 1 || selected === 2
                ? selected
                : undefined,
            );
          }}
        >
          {/* 선택 안 된 상태를 표시하려면 아래처럼 공백 옵션을 추가할 수도 있음 */}
          <option value="">선택 안 함</option>
          <option value="0">진행중</option>
          <option value="1">진행 완료</option>
          <option value="2">전부</option>
        </select>
      </label>

      {/* (5) 버튼들 */}
      <div className="modal-buttons">
        <Button onClick={onClose}>취소</Button>
        <Button onClick={onApply}>적용</Button>
      </div>
    </div>
  );
};
