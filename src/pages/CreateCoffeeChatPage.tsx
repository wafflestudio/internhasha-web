import { PageLayout } from '@/components/ui/layout';
import { CreateCoffeeChatForm } from '@/feature/coffeeChat';
import { PATH } from '@/shared/route/constants';
import { RouteNavigator } from '@/shared/route/RouteNavigator';
import { useRoutePathParams } from '@/shared/route/useRouteParams';

export const CreateCoffeeChatPage = () => {
  const { postId } = useRoutePathParams<{ postId: string }>();

  if (postId === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  return (
    <PageLayout className="bg-white">
      <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm">
        <h2 className="text-2xl font-bold text-grey-900">커피챗 신청서 작성</h2>
        <CreateCoffeeChatForm postId={postId} />
      </div>
    </PageLayout>
  );
};
