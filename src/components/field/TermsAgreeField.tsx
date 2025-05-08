import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Agreement } from '@/entities/agreements';
import type { Input } from '@/entities/input';

export const TermsAgreementField = ({
  agreements,
  setShowModal,
}: {
  agreements: Input<Agreement[]>;
  setShowModal: (input: 'SERVICE_TERM' | 'INFO_TERM' | 'NONE') => void;
}) => {
  const isAllChecked = agreements.value.every((item) => item.checked);

  const handleCheckboxChange = (agreementId: string, checked: boolean) => {
    const changedAgreements = agreements.value.map((item) => {
      if (item.id === agreementId) {
        return { ...item, checked };
      }
      return item;
    });

    agreements.onChange(changedAgreements);
  };

  const handleAllCheck = (checked: boolean) => {
    agreements.onChange(agreements.value.map((item) => ({ ...item, checked })));
  };

  const navigateTerms = (input: string) => {
    switch (input) {
      case 'terms-service':
        setShowModal('SERVICE_TERM');
        return;
      case 'terms-info':
        setShowModal('INFO_TERM');
        return;
      default:
        setShowModal('NONE');
    }
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center gap-2 border-b border-grey-200 pb-2">
        <Checkbox
          id="terms-all"
          checked={isAllChecked}
          onCheckedChange={(checked) => {
            handleAllCheck(checked === true);
          }}
        />
        <Label
          htmlFor="terms-all"
          className="cursor-pointer text-sm font-medium"
        >
          모든 약관에 동의합니다
        </Label>
      </div>

      <div className="flex flex-col gap-3 pl-1">
        {agreements.value.map((agreement) => (
          <div key={agreement.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={agreement.id}
                checked={agreement.checked}
                onCheckedChange={(checked) => {
                  handleCheckboxChange(agreement.id, checked === true);
                }}
              />
              <Label htmlFor={agreement.id} className="cursor-pointer text-sm">
                {agreement.required && (
                  <span className="mr-1 text-red-500">[필수]</span>
                )}
                {agreement.label}
              </Label>
            </div>
            {/* 약관 보기 페이지 이동 */}
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
              onClick={() => {
                navigateTerms(agreement.id);
              }}
            >
              약관 보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
