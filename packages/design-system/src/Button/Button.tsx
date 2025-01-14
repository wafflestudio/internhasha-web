type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-red-400"
    >
      {children}
    </button>
  );
};
