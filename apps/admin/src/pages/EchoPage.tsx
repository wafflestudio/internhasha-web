import { Button } from '@waffle/design-system';

import { MessageUppercaseConverter } from '@/feature/echo';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const EchoPage = () => {
  const { toMain } = useRouteNavigation();
  return (
    <div>
      <p>에코 페이지입니다.</p>
      <MessageUppercaseConverter />
      <Button onClick={toMain}>메인으로 이동</Button>
    </div>
  );
};
