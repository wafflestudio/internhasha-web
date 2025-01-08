import { useParams } from 'react-router';

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div>포스트 페이지에용</div>
  )
}