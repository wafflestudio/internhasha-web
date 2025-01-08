import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { TokenContext } from '@/shared/context/TokenContext.ts';

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();

  // url parameter 가 잘못되었을 경우 어떻게?
  if (postId === undefined) {
    throw new Error("잘못된 접근입니다.")
  }

  const { postDetailData } = useGetPostDetail({ postId: postId });

  if (postDetailData === undefined) {
    return <div>로딩 중...</div>
  }

  if (postDetailData.type === 'error') {
    return <div>정보를 불러오는 중 문제가 발생했습니다. 새로고침해주세요.</div>
  }

  const { companyName, roles } = postDetailData.data

  return (
    <div>
      <p>{companyName}</p>
      {roles.map((role) => (
        <p key={role.id}>{role.category}, {role.detail}</p>
      ))}
    </div>
  );
}

const useGetPostDetail = ({ postId }: { postId: string }) => {
  const { token } = useGuardContext(TokenContext)
  const { postService } = useGuardContext(ServiceContext)

  const { data: postDetailData } = useQuery({
    queryKey: ['post', token] as const,
    queryFn: ({ queryKey: [, t] }) => {
      if (t === null) {
        // 나중에 optional token call 만들기
        return postService.getPostDetail({ token: '', postId: postId });
      }
      return postService.getPostDetail({ token: t, postId: postId })
    }
  })

  return { postDetailData };
}