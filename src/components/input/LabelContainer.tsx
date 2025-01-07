interface LabelContainertProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const LabelContainer = ({
  children,
  label,
  id,
}: LabelContainertProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
};
