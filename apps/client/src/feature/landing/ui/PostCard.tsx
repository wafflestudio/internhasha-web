import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SeriesBadge } from '@/components/ui/badge';
import { ICON_SRC } from '@/entities/asset';
import type { BriefPost } from '@/entities/post';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { formatSeries, getEmploymentStatus } from '@/util/postFormatFunctions';

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
  const { token, role } = useGuardContext(TokenContext);
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
    companyName,
    slogan,
    title,
    series,
    imageLink,
    investAmount,
    employmentEndDate,
    investCompany,
    isBookmarked,
  } = post;

  const firstInvestCompany = investCompany.split(',')[0];

  return (
    <div
      className="border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md cursor-pointer transition-shadow"
      onClick={() => {
        onDetailClick(id);
      }}
    >
      {/* 직군 & 마감일 */}
      <div className="flex h-[50px] relative justify-between items-center rounded-t-lg px-[22px] bg-gray-200">
        <div className="flex items-center gap-2">
          <img src={ICON_SRC.PERSON} className="w-6 h-6" />
          <span className="text-grey-darker">{title}</span>
        </div>

        <span className="text-grey-normal-hover">
          {employmentEndDate === null
            ? '상시 채용'
            : getEmploymentStatus(employmentEndDate)}
        </span>
        {/* 삼각형 */}
        <div
          className="absolute text-lg bottom-[-8px] right-6
                  w-0 h-0 border-l-[10px] border-l-transparent
                  border-r-[10px] border-r-transparent
                  border-t-[10px] border-t-gray-200"
        ></div>
      </div>

      <section className="flex flex-col gap-4 px-[22px] py-[18px]">
        {/* 회사 정보 */}
        <div className="flex items-center gap-[14px]">
          {/* 회사 이미지 */}
          <div className="w-[40px] h-[40px] rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={`${API_BASE_URL}/${imageLink}`}
              alt={companyName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-grey-darker">
              {companyName}
            </h3>
            <span className="text-sm text-grey-normal">
              {firstInvestCompany} 추천
            </span>
          </div>
        </div>

        <div className="w-full min-h-[62px] text-grey-dark-hover">{slogan}</div>

        {/* 시리즈 및 투자 정보 */}
        <div className="flex w-full justify-between py-1 gap-3">
          <div className="flex items-center gap-2">
            <SeriesBadge variant={series}>{formatSeries(series)}</SeriesBadge>
            {investAmount != null && (
              <SeriesBadge>
                투자 누적 {investAmount.toLocaleString()}억
              </SeriesBadge>
            )}
            {firstInvestCompany !== undefined && firstInvestCompany !== '' && (
              <SeriesBadge></SeriesBadge>
            )}
          </div>
          {role !== 'CURATOR' && (
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
                    className="w-[30px] h-[30px]"
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
                    className="w-[30px] h-[30px]"
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

export const useAddBookmark = () => {
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
    addBookmark,
    isPending,
  };
};

export const useDeleteBookmark = () => {
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
