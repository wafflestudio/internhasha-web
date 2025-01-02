type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SubmitButton = ({
  form,
  children,
  disabled,
  onClick,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      form={form}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        marginLeft: '10px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};
