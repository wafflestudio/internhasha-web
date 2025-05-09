import { CoffeeChatButton } from '@/components/button/CoffeeChatButton';
type CompanyCoffeeChatBtnGroupProps = {
  isPending: boolean;
  handleOpenModal: (status: 'ACCEPTED' | 'REJECTED') => void;
  handleCancelSelect: () => void;
  handleSelectAll: () => void;
  disabled: boolean;
};
export const CompanyCoffeeChatButtonGroup = ({
  isPending,
  handleOpenModal,
  handleCancelSelect,
  handleSelectAll,
  disabled,
}: CompanyCoffeeChatBtnGroupProps) => {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <CoffeeChatButton
        variant="accept"
        onClick={() => {
          handleOpenModal('ACCEPTED');
        }}
        disabled={disabled}
      >
        성사
      </CoffeeChatButton>
      <CoffeeChatButton
        variant="reject"
        onClick={() => {
          handleOpenModal('REJECTED');
        }}
        disabled={disabled}
      >
        거절
      </CoffeeChatButton>
      <CoffeeChatButton
        variant="all"
        onClick={handleSelectAll}
        disabled={isPending}
      >
        전체 선택
      </CoffeeChatButton>
      <CoffeeChatButton
        variant="cancel"
        onClick={handleCancelSelect}
        disabled={isPending}
      >
        선택 취소
      </CoffeeChatButton>
    </div>
  );
};
