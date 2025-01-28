interface LabelContainertProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  className?: string;
}

export const LabelContainer = ({
  children,
  label,
  id,
  className,
}: LabelContainertProps) => {
  return (
    <div
      className={`flex flex-col gap-2 ${className !== undefined ? className : ''}`}
    >
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
};
