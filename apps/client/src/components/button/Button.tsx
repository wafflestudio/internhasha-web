type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
