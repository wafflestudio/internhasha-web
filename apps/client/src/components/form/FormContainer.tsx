import { createErrorMessage } from '@/entities/errors';

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
        className="flex flex-col gap-[30px]"
      >
        {children}
      </form>
      {response !== '' && (
        <div>
          <span className="text-red-500 text-sm mt-2">
            {createErrorMessage(response)}
          </span>
        </div>
      )}
    </>
  );
};
