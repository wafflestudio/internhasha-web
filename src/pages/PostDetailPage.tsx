import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PostDetailView } from '@/feature/post';
import { PATH } from '@/shared/route/constants';
import { RouteNavigator } from '@/shared/route/RouteNavigator';
import { useRoutePathParams } from '@/shared/route/useRouteParams';

export const PostDetailPage = () => {
  const { postId } = useRoutePathParams<{ postId: string }>();

  if (postId === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  return (
    <div>
      <GlobalNavigationBar />
      <PostDetailView postId={postId} />
    </div>
  );
};
