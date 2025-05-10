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
    <PageLayout className="flex flex-col items-center bg-white">
      <div className="m-[30px] flex w-full flex-col gap-7 px-16 xs:gap-[50px] sm:max-w-[700px]">
        <h2 className="text-30 font-bold text-grey-900">커피챗 신청서 작성</h2>
        <CreateCoffeeChatForm postId={postId} />
      </div>
    </PageLayout>
  );
};
