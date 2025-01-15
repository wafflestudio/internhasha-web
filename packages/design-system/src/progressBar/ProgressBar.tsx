type ProgressBarProps = {
  totalProgress: number;
  present: number;
};

export const ProgressBar = ({ totalProgress, present }: ProgressBarProps) => {
  const segmentStyle = (isActive: boolean): React.CSSProperties => ({
    flex: 1,
    backgroundColor: isActive ? "gray" : "lightgray",
    margin: "0 2px",
  });

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "5px",
      }}
    >
      {Array.from({ length: totalProgress }).map((_, index) => (
        <div key={index} style={segmentStyle(index < present)}></div>
      ))}
    </div>
  );
};
