import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PATH } from '@/entities/route';
import { PostDetailView } from '@/feature/post';
import { RouteNavigator } from '@/shared/route/RouteNavigator';
import { useRouteParams } from '@/shared/route/useRouteParams';

export const PostDetailPage = () => {
  const { postId } = useRouteParams<{ postId: string }>();

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
