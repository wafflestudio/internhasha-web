import { useParams } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PATH } from '@/entities/route';
import { CreateCoffeeChatForm } from '@/feature/coffeeChat';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const CreateCoffeeChatPage = () => {
  const { postId } = useParams<{ postId: string }>();

  if (postId === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  return (
    <div className="min-h-screen">
      <GlobalNavigationBar />
      <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm md:w-screen-md lg:w-screen-lg">
        <h2 className="text-2xl font-bold text-grey-900">커피챗 신청서 작성</h2>
        <CreateCoffeeChatForm postId={postId} />
      </div>
    </div>
  );
};
