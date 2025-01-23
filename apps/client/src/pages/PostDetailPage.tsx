import { useParams } from 'react-router';

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
      {/* TODO: GNB 넣기 */}
      <PostDetailView postId={postId} />
    </div>
  );
};
