import { useRouteNavigation } from '@/shared/api/hooks';

export const EchoPage = () => {
  const { toMain } = useRouteNavigation();

  return (
    <div>
      <p>에코 페이지입니다.</p>
      <button onClick={toMain}>메인으로 이동</button>
    </div>
  );
};
