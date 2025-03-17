interface LabelContainertProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  required?: boolean;
  className?: string;
}

export const LabelContainer = ({
  children,
  label,
  id,
  required,
  className,
}: LabelContainertProps) => {
  return (
    <div
      className={`flex flex-col gap-2 ${className !== undefined ? className : ''}`}
    >
      <label htmlFor={id} className="font-semibold text-grey-900">
        {label} {required === true && <span className="text-red-300">*</span>}
      </label>
      {children}
    </div>
  );
};
