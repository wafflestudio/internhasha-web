import { cn } from '@/lib/utils';
import { normalTextToEscape } from '@/util/escapeEncoder';
export const TextareaPreview = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  console.log(normalTextToEscape(content));
  return (
    <p className={cn('whitespace-pre-wrap', className)}>
      {normalTextToEscape(content)}
    </p>
  );
};
