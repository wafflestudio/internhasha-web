type ProgressBarProps = {
  totalProgress: number;
  present: number;
};

export const ProgressBar = ({ totalProgress, present }: ProgressBarProps) => {
  const segmentStyle = (isActive: boolean): string =>
    isActive ? 'flex-1 bg-grey-darker' : 'flex-1 bg-grey-light-active';

  return (
    <div className="flex w-full h-1 gap-1">
      {Array.from({ length: totalProgress }).map((_, index) => (
        <div key={index} className={segmentStyle(index < present)}></div>
      ))}
    </div>
  );
};
