import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { ApplicantCoffeeChatDetailView } from '@/feature/coffeeChat';
import { PATH } from '@/shared/route/constants';
import { RouteNavigator } from '@/shared/route/RouteNavigator';
import { useRoutePathParams } from '@/shared/route/useRouteParams';

export const ApplicantCoffeeChatDetailPage = () => {
  const { coffeeChatId } = useRoutePathParams<{ coffeeChatId: string }>();

  if (coffeeChatId === undefined) {
    return <RouteNavigator link={PATH.MY_PAGE} />;
  }
  return (
    <div className="min-h-screen bg-grey-50">
      <GlobalNavigationBar />
      <ApplicantCoffeeChatDetailView coffeeChatId={coffeeChatId} />
    </div>
  );
};
