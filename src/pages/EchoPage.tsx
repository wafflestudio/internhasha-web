import { MessageUppercaseConverter, SendSubmit } from '@/feature/echo';
import { useRouteNavigation } from '@/shared/navigate/hooks';

export const EchoPage = () => {
  const { toMain } = useRouteNavigation();

  return (
    <div>
      <p>에코 페이지입니다.</p>
      <MessageUppercaseConverter />
      <SendSubmit />
      <button onClick={toMain}>메인으로 이동</button>
    </div>
  );
};
