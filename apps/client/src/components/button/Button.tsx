type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  disabled,
  onClick,
  type = 'button',
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};
