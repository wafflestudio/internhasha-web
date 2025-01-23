import { useQuery } from '@tanstack/react-query';

import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';

interface UseGetPostsProps {
  page?: number;
  roles?: string[];
  investmentMax?: number;
  investmentMin?: number;
  pathStatus?: number;
}

export const useGetPosts = ({
  page = 0,
  roles,
  investmentMax,
  investmentMin,
  pathStatus,
}: UseGetPostsProps) => {
  const { postService } = useGuardContext(ServiceContext);

  const { data } = useQuery({
    queryKey: [
      'postService',
      'getPosts',
      page,
      roles,
      investmentMax,
      investmentMin,
      pathStatus,
    ],
    queryFn: async () => {
      const response = await postService.getPosts({
        page,
        roles,
        investmentMax,
        investmentMin,
        pathStatus,
      });
      if (response.type === 'success') {
        return response.data;
      }
      throw new Error('회사 정보를 가져오는데 실패했습니다.');
    },
  });

  return { data };
};
