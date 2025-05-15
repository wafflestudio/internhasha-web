import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { PostsResponse } from '@/api/apis/localServer/schemas';
import { Badge } from '@/components/ui/badge';
import { ICON_SRC } from '@/entities/asset';
import type { BriefPost, PostFilter } from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';
import { formatEmploymentState } from '@/feature/post/presentation/postFormatPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { UserContext } from '@/shared/context/UserContext';
import { formatDomainToLabel, formatMinorJobToLabel } from '@/util/format';

type PostCardProps = {
  post: BriefPost;
  onDetailClick(postId: string): void;
  setShowSignInModal(input: boolean): void;
  pageParams: PostFilter;
};

export const PostCard = ({
  post,
  onDetailClick,
  setShowSignInModal,
  pageParams,
}: PostCardProps) => {
  const { token } = useGuardContext(TokenContext);
  const { role } = useGuardContext(UserContext);
  const { addBookmark, isPending: isAddBookmarkPending } =
    useAddBookmark(pageParams);
  const { deleteBookmark, isPending: isDeleteBookmarkPending } =
    useDeleteBookmark(pageParams);

  const onClickAddBookmark = ({ postId }: { postId: string }) => {
    if (token === null) {
      setShowSignInModal(true);
      return;
    }
    addBookmark({ postId });
  };
  const onClickDeleteBookmark = ({ postId }: { postId: string }) => {
    if (token === null) {
      setShowSignInModal(true);
      return;
    }
    deleteBookmark({ postId });
  };

  const isPending = isAddBookmarkPending || isDeleteBookmarkPending;
  const {
    id,
    companyName,
    profileImageKey,
    location,
    employmentEndDate,
    positionTitle,
    domain,
    slogan,
    isBookmarked,
    tags,
  } = post;

  return (
    <div
      className="flex h-[270px] cursor-pointer flex-col rounded-lg bg-white transition-shadow hover:shadow-md"
      onClick={() => {
        onDetailClick(id);
      }}
    >
      {/* 직군 & 마감일 */}
      <div className="relative flex h-[50px] items-center justify-between rounded-t-lg bg-grey-200 px-[22px]">
        <div className="flex max-w-[60%] items-center gap-2 md:max-w-[80%]">
          <img src={ICON_SRC.PERSON} className="h-6 w-6 flex-shrink-0" />
          <span className="truncate text-15 font-semibold text-grey-900">
            {positionTitle}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <div className="hidden xs:block md:hidden">
            <div className="flex items-center">
              {formatMinorJobToLabel(post.positionType)} {post.headCount}명
              <hr className="mx-4 h-4 w-[1px] bg-grey-300" />
            </div>
          </div>

          <span className="flex-shrink-0 text-grey-400">
            {formatEmploymentState({ date: employmentEndDate })}
          </span>
        </div>

        {/* 삼각형 */}
        <div className="absolute bottom-[-9px] right-6 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-grey-200 text-lg"></div>
      </div>

      <section className="flex flex-1 flex-col gap-4 px-[22px] py-[18px]">
        {/* 회사 정보 */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-[14px]">
            {/* 회사 이미지 */}
            <div className="h-[40px] w-[40px] overflow-hidden rounded-lg bg-grey-200">
              <img
                src={`/${profileImageKey}`}
                alt={companyName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-18 font-semibold text-grey-900">
                {companyName}
              </h3>
              <span className="text-12 font-regular text-grey-800">
                {formatDomainToLabel(domain)}
                <span className="xs:hidden">
                  {' '}
                  / {formatMinorJobToLabel(post.positionType)} {post.headCount}
                  명
                </span>
              </span>
            </div>
          </div>

          <div className="hidden flex-shrink-0 md:block">
            {formatMinorJobToLabel(post.positionType)}{' '}
            <span>{post.headCount}명</span>
          </div>
        </div>
        <div className="line-clamp-3 w-full flex-1 truncate text-wrap text-13 font-regular leading-[1.5] text-grey-700">
          {slogan}
        </div>

        {/* 회사 위치 및 태그 */}
        <div className="flex w-full items-center justify-between gap-3 py-1">
          <div className="flex h-[34px] flex-wrap items-center gap-2 overflow-hidden">
            <Badge variant="secondary">
              <img src={ICON_SRC.LOCATION} />{' '}
              {location.split(' ').slice(0, 2).join(' ')}
            </Badge>
            {tags.slice(0, 2).map((tag, idx) => {
              return (
                <Badge key={idx} variant="secondary">
                  {tag.tag}
                </Badge>
              );
            })}
          </div>
          {role !== 'COMPANY' && (
            <div>
              {isBookmarked ? (
                <button
                  disabled={isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickDeleteBookmark({ postId: id });
                  }}
                >
                  <img
                    src={ICON_SRC.BOOKMARK.SELECTED}
                    className="h-[30px] w-[30px]"
                  />
                </button>
              ) : (
                <button
                  disabled={isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickAddBookmark({ postId: id });
                  }}
                >
                  <img
                    src={ICON_SRC.BOOKMARK.UNSELECTED}
                    className="h-[30px] w-[30px]"
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const useAddBookmark = (pageParams: PostFilter) => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const queryClient = useQueryClient();
  const { page, roles, isActive, order, domains } = pageParams;

  const { mutate: addBookmark, isPending } = useMutation({
    mutationFn: ({ postId }: { postId: string }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.addBookmark({ token, postId });
    },
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: [
          'postService',
          'getPosts',
          page,
          roles,
          isActive,
          order,
          domains,
        ],
      });
      const previousPosts = await queryClient.getQueryData<
        ServiceResponse<PostsResponse>
      >(['postService', 'getPosts', page, roles, isActive, order, domains]);
      queryClient.setQueryData(
        ['postService', 'getPosts', page, roles, isActive, order, domains],
        () => {
          if (previousPosts === undefined || previousPosts.type === 'error') {
            return previousPosts;
          }
          return {
            ...previousPosts,
            data: {
              ...previousPosts.data,
              posts: previousPosts.data.posts.map((post) => {
                if (post.id === postId) {
                  return { ...post, isBookmarked: true };
                }
                return post;
              }),
            },
          };
        },
      );
      return { previousPosts };
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
        return;
      } else {
        toast.error('북마크 삭제에 실패했습니다.');
      }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ['postService', 'getPosts', page, roles, isActive, order, domains],
        context?.previousPosts,
      );
      toast.error('북마크 삭제에 실패했습니다.');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['postService'] });
    },
  });

  return {
    addBookmark,
    isPending,
  };
};

const useDeleteBookmark = (pageParams: PostFilter) => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const queryClient = useQueryClient();
  const { page, roles, isActive, order, domains } = pageParams;

  const { mutate: deleteBookmark, isPending } = useMutation({
    mutationFn: ({ postId }: { postId: string }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.deleteBookmark({ token, postId });
    },
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: [
          'postService',
          'getPosts',
          page,
          roles,
          isActive,
          order,
          domains,
        ],
      });
      const previousPosts = await queryClient.getQueryData<
        ServiceResponse<PostsResponse>
      >(['postService', 'getPosts', page, roles, isActive, order, domains]);
      queryClient.setQueryData(
        ['postService', 'getPosts', page, roles, isActive, order, domains],
        () => {
          if (previousPosts === undefined || previousPosts.type === 'error') {
            return previousPosts;
          }
          return {
            ...previousPosts,
            data: {
              ...previousPosts.data,
              posts: previousPosts.data.posts.map((post) => {
                if (post.id === postId) {
                  return { ...post, isBookmarked: false };
                }
                return post;
              }),
            },
          };
        },
      );
      return { previousPosts };
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries({ queryKey: ['postService'] });
        return;
      } else {
        toast.error('북마크 삭제에 실패했습니다.');
      }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ['postService', 'getPosts', page, roles, isActive, order, domains],
        context?.previousPosts,
      );
      toast.error('북마크 삭제에 실패했습니다.');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['postService'] });
    },
  });

  return {
    deleteBookmark,
    isPending,
  };
};
