import { Button } from '../button/button';

type NavigationHeaderProps = {
  to(): void;
  title: string;
};

export const NavigationHeader = ({ to, title }: NavigationHeaderProps) => {
  return (
    <div className="flex justify-between items-center sticky top-0 p-5 bg-white shadow-bottom">
      <h1 className="text-lg font-bold">{title}</h1>
      <Button onClick={to} variant="white" className="w-20 text-sm">
        목록으로
      </Button>
    </div>
  );
};
