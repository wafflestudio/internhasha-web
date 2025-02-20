import { useParams } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PATH } from '@/entities/route';
import { CreateCoffeeChatForm } from '@/feature/coffeeChat/ui/CreateCoffeeChatForm';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const CreateCoffeeChatPage = () => {
  const { postId } = useParams<{ postId: string }>();

  if (postId === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  return (
    <div>
      <GlobalNavigationBar />
      <CreateCoffeeChatForm postId={postId} />
    </div>
  );
};
