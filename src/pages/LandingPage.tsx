import { useRouteNavigation } from '@/shared/route/hooks';

export const LandingPage = () => {
  const { toEcho } = useRouteNavigation();

  return (
    <div>
      <p>랜딩 페이지입니다.</p>
      <button onClick={toEcho}>에코 페이지로 이동</button>
    </div>
  );
};
