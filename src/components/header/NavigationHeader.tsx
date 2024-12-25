import { Button } from '../button/button';

type NavigationHeaderProps = {
  to(): void;
  title: string;
};

export const NavigationHeader = ({ to, title }: NavigationHeaderProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={to}>뒤로</Button>
    </div>
  );
};
