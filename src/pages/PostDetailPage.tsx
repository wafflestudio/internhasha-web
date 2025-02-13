import { useParams } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PATH } from '@/entities/route';
import { PostDetailView } from '@/feature/post';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();

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
