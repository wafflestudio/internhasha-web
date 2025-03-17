import { ICON_SRC } from '@/entities/asset';
import { cn } from '@/lib/utils';

export const CancelButton = ({
  onClick,
  className,
}: {
  onClick(): void;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex h-[20px] w-[20px] items-center justify-center rounded-full bg-grey-300 p-1 text-xs text-white transition hover:bg-grey-400',
        className,
      )}
    >
      <img src={ICON_SRC.CLOSE.WHITE} />
    </div>
  );
};
