type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  disabled,
  onClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
