import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

import { DownloadButtonWithPresignedUrl } from '@/components/button/DownloadButtonWithPresignedUrl';
import { LinkButton } from '@/components/button/LinkButton';
import { SignInForBookmarkModal } from '@/components/modal/SignInForBookmarkModal';
import { SignInForCoffeeChatModal } from '@/components/modal/SignInForCoffeChatModal';
import { Badge } from '@/components/ui/badge';
import { SeriesBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import { SkeletonPostDetailView } from '@/feature/post/ui/detail/SkeletonPostDetailView';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { UserContext } from '@/shared/context/UserContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getEmploymentStatus } from '@/util/postFormatFunctions';

export const PostDetailView = ({ postId }: { postId: string }) => {
  const { postDetailData } = useGetPostDetail({ postId: postId });
  const { API_BASE_URL } = useGuardContext(EnvContext);
  const { token } = useGuardContext(TokenContext);
  const { role, id: userId } = useGuardContext(UserContext);

  const { toMain, toCreateCoffeeChat, toCreatePost } = useRouteNavigation();

  const [showModal, setShowModal] = useState<
    'COFFEE_CHAT' | 'BOOKMARK' | 'NONE'
  >('NONE');
  const closeModal = () => {
    setShowModal('NONE');
  };

  const { addBookmark, isPending: isAddBookmarkPending } = useAddBookmark();
  const { deleteBookmark, isPending: isDeleteBookmarkPending } =
    useDeleteBookmark();

  const isPending = isAddBookmarkPending || isDeleteBookmarkPending;

  const handleClickAddBookmark = ({ id }: { id: string }) => {
    if (token === null) {
      setShowModal('BOOKMARK');
      return;
    }
    addBookmark({ postId: id });
  };

  const handleClickDeleteBookmark = ({ id }: { id: string }) => {
    if (token === null) {
      setShowModal('BOOKMARK');
      return;
    }
    deleteBookmark({ postId: id });
  };

  const handleClickApplyCoffeeChat = ({ id }: { id: string }) => {
    if (token === null) {
      setShowModal('COFFEE_CHAT');
      return;
    }
    toCreateCoffeeChat({ postId: id });
  };

  if (postDetailData === undefined) {
    return <SkeletonPostDetailView />;
  }

  if (postDetailData.type === 'error') {
    return <div>정보를 불러오는 중 문제가 발생했습니다. 새로고침해주세요.</div>;
  }

  const {
    companyName,
    author,
    explanation,
    slogan,
    imageLink,
    tags,
    investAmount,
    series,
    investCompany,
    irDeckLink,
    landingPageLink,
    links,
    title,
    category,
    detail,
    headcount,
    employmentEndDate,
    isBookmarked,
    isActive,
  } = postDetailData.data;

  const investCompanyList = investCompany.split(',');

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const formatEmploymentState = ({
    isActiveInput,
    employmentEndDateInput,
  }: {
    isActiveInput: boolean;
    employmentEndDateInput: string | null;
  }) => {
    if (!isActiveInput) {
      return '모집 완료';
    }
    if (employmentEndDateInput === null) {
      return '상시 채용';
    }
    return getEmploymentStatus(employmentEndDateInput);
  };

  return (
    <div className="mx-auto mb-[30px] flex max-w-screen-md flex-col gap-[56px] p-6 text-grey-900">
      {/* 헤더 */}
      <div className="flex w-full flex-col gap-2 md:max-w-[580px]">
        <div className="flex flex-col items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <img
              src={`${API_BASE_URL}/${imageLink}`}
              alt="회사 썸네일 이미지"
              className="h-[40px] w-[40px] rounded-lg object-cover"
            />
            <span className="text-lg font-semibold">{companyName}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-4xl font-bold">{title}</span>
            {role !== 'COMPANY' && (
              <div className="content-center">
                {isBookmarked ? (
                  <button
                    disabled={isPending}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickDeleteBookmark({ id: postId });
                    }}
                  >
                    <img src={ICON_SRC.BOOKMARK.SELECTED} />
                  </button>
                ) : (
                  <button
                    disabled={isPending}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickAddBookmark({ id: postId });
                    }}
                  >
                    <img src={ICON_SRC.BOOKMARK.UNSELECTED} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row-reverse md:justify-between md:gap-2">
        <div className="flex w-full flex-col gap-5 md:w-[310px]">
          <div className="flex items-center justify-end gap-5 text-sm text-grey-800 md:justify-start">
            <span>채용 마감일</span>
            <div className="flex items-center gap-4">
              <span>
                {employmentEndDate !== null
                  ? formatDate(employmentEndDate)
                  : '상시 채용'}
              </span>
              <Badge variant="primary">
                {formatEmploymentState({
                  isActiveInput: isActive,
                  employmentEndDateInput: employmentEndDate,
                })}
              </Badge>
            </div>
          </div>
          {role !== 'COMPANY' && (
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  handleClickApplyCoffeeChat({ id: postId });
                }}
              >
                커피챗 신청하기
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toMain({});
                }}
              >
                목록으로
              </Button>
            </div>
          )}
          {author.id === userId && (
            <div className="flex flex-row gap-3 md:flex-col">
              <Button
                onClick={() => {
                  toCreatePost({
                    companyId: userId,
                    body: {
                      id: postId,
                      title: title,
                      employmentEndDateTime: employmentEndDate ?? undefined,
                      jobMinorCategory: category,
                      detail: detail,
                      headcount: headcount,
                      salary: 999999,
                    },
                  });
                }}
                className="flex-1"
              >
                공고 수정하기
              </Button>
              <Button
                variant="destructive"
                onClick={() => {}}
                className="flex-1"
              >
                공고 마감하기
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toMain({});
                }}
                className="flex-1"
              >
                목록으로
              </Button>
            </div>
          )}
        </div>

        {/* 회사 소개 */}
        <div className="flex w-full flex-col gap-4 md:max-w-[580px]">
          <p className="text-xl font-semibold">회사 소개</p>
          <p className="font-normal text-grey-800">{slogan}</p>
          {/* 회사 설명 카드 */}
          <section className="flex flex-col gap-4 rounded-lg bg-grey-50 px-[34px] py-[24px]">
            <div className="flex flex-col gap-4 md:flex-row md:gap-[68px]">
              <div className="flex items-center">
                <span className="w-[140px] text-grey-700">투자 유치 단계</span>
                <SeriesBadge series={series} />
              </div>
              <div className="flex items-center">
                <span className="w-[140px] text-grey-700">누적 투자액</span>
                <Badge>{investAmount}천만 원</Badge>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-[140px] text-grey-700">추천 엑셀러레이터</span>
              <div className="flex items-center gap-2">
                <Badge>{author.name}</Badge>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-[140px] text-grey-700">투자사</span>
              <div className="flex items-center gap-2">
                {investCompanyList.map((company, index) => {
                  return <Badge key={index}>{company}</Badge>;
                })}
              </div>
            </div>
          </section>

          {/* 외부 링크 및 태그 모음 */}
          <div className="flex flex-col gap-[30px]">
            <section className="flex flex-col gap-5 md:flex-row md:gap-[50px]">
              {landingPageLink !== undefined &&
                landingPageLink !== null &&
                landingPageLink.trim().length !== 0 && (
                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                    <span className="text-lg font-semibold text-grey-800">
                      회사 홈페이지
                    </span>
                    <LinkButton link={landingPageLink}>링크 접속</LinkButton>
                  </div>
                )}

              {irDeckLink !== undefined &&
                irDeckLink !== null &&
                irDeckLink.trim().length !== 0 && (
                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                    <span className="text-lg font-semibold text-grey-800">
                      IR Deck 자료
                    </span>

                    <DownloadButtonWithPresignedUrl
                      s3Key={irDeckLink}
                      type="IR_DECK"
                    >
                      <img src={ICON_SRC.DOWNLOAD} />
                      <span className="font-semibold text-grey-600">
                        PDF 다운로드
                      </span>
                    </DownloadButtonWithPresignedUrl>
                  </div>
                )}
            </section>

            {links !== undefined && links.length !== 0 && (
              <section className="flex flex-col gap-3">
                <span className="text-lg font-semibold text-grey-800">
                  외부 링크
                </span>
                <div className="flex flex-col gap-1.5">
                  {links.map((linkWithDescription, index) => {
                    return (
                      <div key={index} className="flex items-center gap-[10px]">
                        <span className="text-grey-800">
                          {linkWithDescription.description}
                        </span>
                        <LinkButton link={linkWithDescription.link}>
                          링크 접속
                        </LinkButton>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 태그 */}
            {tags !== undefined && tags.length !== 0 && (
              <section className="flex flex-col gap-3">
                <span className="text-lg font-semibold text-grey-800">
                  태그
                </span>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={`tag-${tag}`} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-grey-200 md:max-w-[580px]"></div>

      {/* 상세 공고 글 */}
      <section className="flex w-full flex-col gap-[30px] md:max-w-[580px]">
        <span className="text-2xl font-bold">상세 공고 글</span>
        <div className="flex items-center gap-2 rounded-lg bg-grey-50 px-[22px] py-4">
          <img src={ICON_SRC.PERSON} />
          <span>
            {title} {headcount}명
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-lg font-semibold">회사 소개</span>
          <div data-color-mode="light" className="flex rounded-md border p-4">
            <MDEditor.Markdown source={explanation} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-lg font-semibold">직군 소개</span>
          <div data-color-mode="light" className="flex rounded-lg border p-4">
            <MDEditor.Markdown source={detail} />
          </div>
        </div>
      </section>

      {showModal === 'BOOKMARK' && (
        <SignInForBookmarkModal onClose={closeModal} />
      )}
      {showModal === 'COFFEE_CHAT' && (
        <SignInForCoffeeChatModal onClose={closeModal} />
      )}
    </div>
  );
};

const useGetPostDetail = ({ postId }: { postId: string }) => {
  const { token } = useGuardContext(TokenContext);
  const { postService } = useGuardContext(ServiceContext);

  const { data: postDetailData } = useQuery({
    queryKey: ['postService', 'getPostDetail', postId, token] as const,
    queryFn: ({ queryKey: [, , pid, t] }) => {
      return postService.getPostDetail({
        token: t !== null ? t : undefined,
        postId: pid,
      });
    },
  });

  return { postDetailData };
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
