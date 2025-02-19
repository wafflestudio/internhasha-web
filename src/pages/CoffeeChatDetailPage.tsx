import { useParams } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PATH } from '@/entities/route';
import { CoffeeChatDetailView } from '@/feature/coffeeChat';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const CoffeeChatDetailPage = () => {
  const { coffeeChatId } = useParams<{ coffeeChatId: string }>();

  if (coffeeChatId === undefined) {
    return <RouteNavigator link={PATH.COFFEE_CHAT_LIST} />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalNavigationBar />
      <CoffeeChatDetailView coffeeChatId={coffeeChatId} />
    </div>
  );
};
