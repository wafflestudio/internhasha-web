interface LabelContainertProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  isError?: boolean;
  description?: string;
}

export const LabelContainer = ({
  children,
  label,
  id,
  isError,
  description,
}: LabelContainertProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
      {description !== undefined && isError === true && (
        <div style={{ marginTop: '20px', fontSize: '12px', color: 'black' }}>
          <strong>{description}</strong>
        </div>
      )}
    </div>
  );
};
