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
        'flex justify-center items-center w-[20px] h-[20px] bg-grey-300 text-white rounded-full p-1 text-xs hover:bg-grey-400 transition',
        className,
      )}
    >
      <img src={ICON_SRC.CLOSE.WHITE} />
    </div>
  );
};
