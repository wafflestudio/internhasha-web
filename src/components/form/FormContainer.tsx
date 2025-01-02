interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  handleSubmit(): void;
  disabled: boolean;
  response: string;
  buttonDescription: string;
}

import { SubmitButton } from '@/components/button';

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
        <SubmitButton form={id} disabled={disabled}>
          {buttonDescription}
        </SubmitButton>
      </form>
      {response !== '' && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
          <strong>{response}</strong>
        </div>
      )}
    </>
  );
};
