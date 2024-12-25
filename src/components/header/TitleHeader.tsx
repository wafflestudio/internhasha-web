type TitleHeaderProps = {
  title: string;
};

export const TitleHeader = ({ title }: TitleHeaderProps) => {
  return (
    <div>
      <span>{title}</span>
    </div>
  );
};
