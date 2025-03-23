import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type CheckboxWithLabelProps = {
  label: string;
  checkboxId: string;
  checked: boolean;
  onCheckboxClick: () => void;
};

export const CheckboxWithLabel = ({
  label,
  checkboxId,
  checked,
  onCheckboxClick,
}: CheckboxWithLabelProps) => {
  return (
    <div className="flex gap-[10px] text-grey-900">
      <Checkbox
        id={checkboxId}
        checked={checked}
        onCheckedChange={onCheckboxClick}
      />
      <Label htmlFor={checkboxId}>{label}</Label>
    </div>
  );
};
