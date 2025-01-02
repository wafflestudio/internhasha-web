interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  handleSubmit(): void;
  disabled: boolean;
  response: string;
  buttonDescription: string;
}

export const FormContainer = ({
  id,
  handleSubmit,
  children,
  disabled,
  response,
  buttonDescription,
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
        <button
          type="submit"
          form={id}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          disabled={disabled}
        >
          {buttonDescription}
        </button>
      </form>
      {response !== '' && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
          <strong>{response}</strong>
        </div>
      )}
    </>
  );
};
