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
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // 엔터키 기본 동작 방지
        }
      }}
      className={cn('flex flex-col gap-[30px]', className)}
    >
      {children}
    </form>
  );
};
