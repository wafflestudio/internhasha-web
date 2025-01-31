import { ICON_SRC } from '@/entities/asset';

export const CancelButton = ({ onClick }: { onClick(): void }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-[-10px] right-[-10px] flex justify-center items-center w-[20px] h-[20px] bg-grey-normal text-white rounded-full p-1 text-xs hover:bg-grey-normal-hover transition"
    >
      <img src={ICON_SRC.CLOSE.WHITE} />
    </div>
  );
};
