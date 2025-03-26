import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Badge, SeriesBadge } from '@/components/ui/badge';
import { ICON_SRC } from '@/entities/asset';
import type { BriefPost } from '@/entities/post';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { UserContext } from '@/shared/context/UserContext';
import { getEmploymentStatus } from '@/util/postFormatFunctions';

type PostCardProps = {
  post: BriefPost;
  onDetailClick(postId: string): void;
  setShowSignInModal(input: boolean): void;
};

export const PostCard = ({
  post,
  onDetailClick,
  setShowSignInModal,
}: PostCardProps) => {
  const { token } = useGuardContext(TokenContext);
  const { role } = useGuardContext(UserContext);
  const { API_BASE_URL } = useGuardContext(EnvContext);
  const { addBookmark, isPending: isAddBookmarkPending } = useAddBookmark();
  const { deleteBookmark, isPending: isDeleteBookmarkPending } =
    useDeleteBookmark();

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
    author,
    companyName,
    slogan,
    title,
    series,
    imageLink,
    investAmount,
    employmentEndDate,
    isBookmarked,
  } = post;

  return (
    <div
      className="cursor-pointer rounded-lg bg-white transition-shadow hover:shadow-md"
      onClick={() => {
        onDetailClick(id);
      }}
    >
      {/* 직군 & 마감일 */}
      <div className="relative flex h-[50px] items-center justify-between rounded-t-lg bg-grey-200 px-[22px]">
        <div className="flex items-center gap-2">
          <img src={ICON_SRC.PERSON} className="h-6 w-6" />
          <span className="text-grey-900">{title}</span>
        </div>

        <span className="text-grey-400">
          {employmentEndDate === null
            ? '상시 채용'
            : getEmploymentStatus(employmentEndDate)}
        </span>
        {/* 삼각형 */}
        <div className="absolute bottom-[-10px] right-6 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-grey-200 text-lg"></div>
      </div>

      <section className="flex flex-col gap-4 px-[22px] py-[18px]">
        {/* 회사 정보 */}
        <div className="flex items-center gap-[14px]">
          {/* 회사 이미지 */}
          <div className="h-[40px] w-[40px] overflow-hidden rounded-lg bg-grey-200">
            <img
              src={`${API_BASE_URL}/${imageLink}`}
              alt={companyName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-grey-900">
              {companyName}
            </h3>
            <span className="text-sm text-grey-300">{author.name} 추천</span>
          </div>
        </div>

        <div className="min-h-[62px] w-full text-grey-700">{slogan}</div>

        {/* 시리즈 및 투자 정보 */}
        <div className="flex w-full justify-between gap-3 py-1">
          <div className="flex items-center gap-2">
            <SeriesBadge series={series} />
            <Badge variant="secondary">
              투자 누적 {investAmount.toLocaleString()}천만원
            </Badge>
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

const useAddBookmark = () => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const queryClient = useQueryClient();

  const { mutate: addBookmark, isPending } = useMutation({
    mutationFn: ({ postId }: { postId: string }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.addBookmark({ token, postId });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
        return;
      } else {
        // TODO: 북마크 생성 실패 시 하단에 토스트 띄우기
        return;
      }
    },
    onError: () => {
      // TODO: 북마크 생성 실패 시 하단에 토스트 띄우기
      return;
    },
  });

  return {
    addBookmark,
    isPending,
  };
};

const useDeleteBookmark = () => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const queryClient = useQueryClient();

  const { mutate: deleteBookmark, isPending } = useMutation({
    mutationFn: ({ postId }: { postId: string }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.deleteBookmark({ token, postId });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries({ queryKey: ['postService'] });
        return;
      } else {
        // TODO: 북마크 생성 실패 시 하단에 토스트 띄우기
        return;
      }
    },
    onError: () => {
      // TODO: 북마크 생성 실패 시 하단에 토스트 띄우기
      return;
    },
  });

  return {
    deleteBookmark,
    isPending,
  };
};
