interface LabelContainertProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const LabelContainer = ({
  children,
  label,
  id,
}: LabelContainertProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
};
