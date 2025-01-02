type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SubmitButton = ({
  form,
  children,
  disabled,
  onClick,
}: SubmitButtonProps) => {
  return (
    <button type="submit" form={form} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
