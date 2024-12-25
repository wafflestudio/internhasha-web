type NavigationHeaderProps = {
  to(): void;
  title: string;
};

export const NavigationHeader = ({ to, title }: NavigationHeaderProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={to}>뒤로</button>
    </div>
  );
};
