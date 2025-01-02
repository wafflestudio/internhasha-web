import { Button } from '@/components/button';
import { MessageUppercaseConverter } from '@/pages/EchoPage/MessageUppercaseConverter';
import { SendSubmit } from '@/pages/EchoPage/SendSubmit';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const EchoPage = () => {
  const { toMain } = useRouteNavigation();

  return (
    <div>
      <p>에코 페이지입니다.</p>
      <MessageUppercaseConverter />
      <SendSubmit />
      <Button onClick={toMain}>메인으로 이동</Button>
    </div>
  );
};
