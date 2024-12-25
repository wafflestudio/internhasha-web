type TitleHeaderProps = {
  title: string;
};

export const TitleHeader = ({ title }: TitleHeaderProps) => {
  return (
    <div className="flex position sticky top-0 p-5 bg-white shadow-bottom">
      <span className="text-lg font-bold">{title}</span>
    </div>
  );
};
