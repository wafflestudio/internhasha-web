import { PageLayout } from '@/components/ui/layout';
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
    <PageLayout>
      <ApplicantCoffeeChatDetailView coffeeChatId={coffeeChatId} />
    </PageLayout>
  );
};
