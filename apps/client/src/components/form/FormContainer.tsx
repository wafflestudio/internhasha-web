interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  handleSubmit(): void;
  response: string;
}

export const FormContainer = ({
  id,
  handleSubmit,
  children,
  response,
}: FormContainerProps) => {
  return (
    <>
      <form
        id={id}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        {children}
      </form>
      {response !== '' && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
          <strong>{response}</strong>
        </div>
      )}
    </>
  );
};
