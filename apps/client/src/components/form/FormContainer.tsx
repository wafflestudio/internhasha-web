interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  handleSubmit(): void;
  response: string;
}

export const FormContainer = ({
  id,
  handleSubmit,
  children,
}: FormContainerProps) => {
  return (
    <>
      <form
        id={id}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-[30px]"
      >
        {children}
      </form>
    </>
  );
};
