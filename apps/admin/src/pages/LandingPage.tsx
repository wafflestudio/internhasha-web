import { Button } from '@waffle/design-system';

import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toEcho } = useRouteNavigation();
  return (
    <div>
      <Button onClick={toEcho}>에코 페이지로 이동</Button>
    </div>
  );
};
