import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { CoffeeChatListView } from '@/feature/coffeeChat';

export const CoffeeChatListPage = () => {
  return (
    <div>
      <GlobalNavigationBar />
      <CoffeeChatListView />
    </div>
  );
};
