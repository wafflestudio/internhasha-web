type ProgressBarProps = {
  totalProgress: number;
  present: number;
};

export const ProgressBar = ({ totalProgress, present }: ProgressBarProps) => {
  const segmentStyle = (isActive: boolean): string =>
    isActive ? 'flex-1 bg-grey-800' : 'flex-1 bg-grey-200';

  return (
    <div className="flex h-1 w-full gap-1">
      {Array.from({ length: totalProgress }).map((_, index) => (
        <div key={index} className={segmentStyle(index < present)}></div>
      ))}
    </div>
  );
};
