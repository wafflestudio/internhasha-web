import { cn } from '@/lib/utils';

interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  handleSubmit(): void;
  className?: string;
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
      className={cn('flex flex-col gap-[30px]', className)}
    >
      {children}
    </form>
  );
};
