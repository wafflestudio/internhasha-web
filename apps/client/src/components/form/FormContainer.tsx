interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  handleSubmit(): void;
  response: string;
  className: string;
}

export const FormContainer = ({
  id,
  handleSubmit,
  children,
  className,
}: FormContainerProps) => {
  return (
    <form
      id={id}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className={`flex flex-col gap-[30px] ${className}`}
    >
      {children}
    </form>
  );
};
