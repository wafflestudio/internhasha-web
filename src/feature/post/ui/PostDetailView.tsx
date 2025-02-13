import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

import { SignInForBookmarkModal } from '@/components/modal/SignInForBookmarkModal';
import { SignInForCoffeeChatModal } from '@/components/modal/SignInForCoffeChatModal';
import { Badge } from '@/components/ui/badge';
import { SeriesBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { ICON_SRC } from '@/entities/asset';
import { SkeletonPostDetailView } from '@/feature/post/ui/SkeletonPostDetailView';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getEmploymentStatus } from '@/util/postFormatFunctions';

export const PostDetailView = ({ postId }: { postId: string }) => {
  const { postDetailData } = useGetPostDetail({ postId: postId });
  const { API_BASE_URL } = useGuardContext(EnvContext);
  const { token, role } = useGuardContext(TokenContext);

  const { toMain, toCreateResume } = useRouteNavigation();

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
    toCreateResume({ postId: id });
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
    <div className="max-w-screen-md p-6 mb-[30px] mx-auto gap-[56px] flex flex-col">
      {/* 헤더 */}
      <div className="w-full md:max-w-[580px] flex flex-col gap-2">
        <div className="flex flex-col justify-between items-start gap-2">
          <div className="flex items-center gap-3">
            <img
              src={`${API_BASE_URL}/${imageLink}`}
              alt="회사 썸네일 이미지"
              className="w-[40px] h-[40px] object-cover rounded-lg"
            />
            <span className="text-grey-darker text-lg font-semibold">
              {companyName}
            </span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-black text-4xl font-bold">{title}</span>
            {role !== 'CURATOR' && (
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

      <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-2 md:justify-between">
        <div className="flex flex-col w-full md:w-[310px] gap-5">
          <div className="text-sm text-grey-darker flex justify-end md:justify-start items-center gap-5">
            <span>채용 마감일</span>
            <div className="flex gap-4 items-center">
              <span>
                {employmentEndDate !== null
                  ? formatDate(employmentEndDate)
                  : '상시 채용'}
              </span>
              <span className="bg-gray-600 text-white py-1 px-2 rounded-md">
                {formatEmploymentState({
                  isActiveInput: isActive,
                  employmentEndDateInput: employmentEndDate,
                })}
              </span>
            </div>
          </div>
          {role !== 'CURATOR' && (
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  handleClickApplyCoffeeChat({ id: postId });
                }}
              >
                커피챗 신청하기
              </Button>
              <Button variant="outline" onClick={toMain}>
                목록으로
              </Button>
            </div>
          )}
          {/* // TODO: 내가 작성한 글에서는 삭제, 수정, 목록으로가 나타나도록 수정 */}
          {/* (
          <div className="flex flex-row md:flex-col-reverse gap-3">
            <Button variant="destructive" onClick={() => {}} className="flex-1">
              공고 삭제하기
            </Button>
            <Button variant="outline" onClick={toMain} className="flex-1">
              목록으로
            </Button>
            <Button onClick={() => {}} className="flex-1">
              공고 수정하기
            </Button>
          </div>
        ) */}
        </div>

        {/* 회사 소개 */}
        <div className="flex w-full md:max-w-[580px] flex-col gap-4">
          <p className="text-xl font-semibold">회사 소개</p>
          <p className="text-grey-dark-active font-normal">{slogan}</p>
          {/* 회사 설명 카드 */}
          <section className="flex flex-col gap-4 px-[34px] py-[24px] bg-grey-light rounded-lg">
            <div className="flex flex-col md:flex-row gap-4 md:gap-[68px]">
              <div className="flex items-center">
                <span className="w-[140px] text-grey-dark-hover font-semibold">
                  투자 유치 단계
                </span>
                <SeriesBadge series={series} />
              </div>
              <div className="flex items-center">
                <span className="w-[140px] text-grey-dark-hover font-semibold">
                  누적 투자액
                </span>
                <Badge>{investAmount}천만 원</Badge>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-[140px] text-grey-dark-hover font-semibold">
                추천 엑셀러레이터
              </span>
              <div className="flex items-center gap-2">
                <Badge>{author.name}</Badge>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-[140px] text-grey-dark-hover font-semibold">
                투자사
              </span>
              <div className="flex items-center gap-2">
                {investCompanyList.map((company, index) => {
                  return <Badge key={index}>{company}</Badge>;
                })}
              </div>
            </div>
          </section>

          {/* 외부 링크 및 태그 모음 */}
          <div className="flex flex-col gap-[30px]">
            <section className="flex flex-col md:flex-row gap-5 md:gap-[50px]">
              {landingPageLink !== undefined &&
                landingPageLink !== null &&
                landingPageLink.trim().length !== 0 && (
                  <div className="flex flex-col items-start sm:items-center sm:flex-row gap-5">
                    <span className="text-lg text-grey-dark-active font-semibold">
                      회사 홈페이지
                    </span>
                    <a
                      href={landingPageLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center w-fit px-[10px] py-[6px] gap-1 rounded-sm bg-grey-light"
                    >
                      <img src={ICON_SRC.LINK} />
                      <span className="text-grey-dark font-semibold">
                        링크 접속
                      </span>
                    </a>
                  </div>
                )}

              {irDeckLink !== undefined &&
                irDeckLink !== null &&
                irDeckLink.trim().length !== 0 && (
                  <div className="flex flex-col items-start sm:items-center sm:flex-row gap-5">
                    <span className="text-lg text-grey-dark-active font-semibold">
                      IR Deck 자료
                    </span>

                    <a
                      href={`${API_BASE_URL}/${irDeckLink}`}
                      target="_blank"
                      download={true}
                      rel="noopener noreferrer"
                      className="flex items-center w-fit px-[10px] py-[6px] gap-1 rounded-sm bg-grey-light"
                    >
                      <img src={ICON_SRC.DOWNLOAD} />
                      <span className="text-grey-dark font-semibold">
                        PDF 다운로드
                      </span>
                    </a>
                  </div>
                )}
            </section>

            {links !== undefined && links.length !== 0 && (
              <section className="flex flex-col gap-3">
                <span className="text-lg text-grey-dark-active font-semibold">
                  외부 링크
                </span>
                <div className="flex flex-col gap-1.5">
                  {links.map((linkWithDescription, index) => {
                    return (
                      <div key={index} className="flex gap-[10px] items-center">
                        <span className="text-grey-dark">
                          {linkWithDescription.description}
                        </span>
                        <a
                          href={linkWithDescription.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 gap-1 rounded-lg bg-grey-light"
                        >
                          <img src={ICON_SRC.LINK} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 태그 */}
            <section className="flex flex-col gap-3">
              <span className="text-lg text-grey-dark-active font-semibold">
                태그
              </span>
              {tags !== undefined && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={`tag-${tag}`} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <div className="w-full md:max-w-[580px] h-[1px] bg-grey-light-active"></div>

      {/* 상세 공고 글 */}
      <section className="flex flex-col w-full md:max-w-[580px] gap-[30px]">
        <span className="text-2xl font-bold">상세 공고 글</span>
        <CardContent className="flex items-center bg-grey-light px-[22px] py-4 gap-2 rounded-lg">
          <img src={ICON_SRC.PERSON} />
          <span>
            {title} {headcount}명
          </span>
        </CardContent>
        <div className="flex flex-col gap-4">
          <span className="text-lg font-semibold">회사 소개</span>
          <div data-color-mode="light" className="flex p-4 border rounded-md">
            <MDEditor.Markdown source={explanation} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-lg font-semibold">직군 소개</span>
          <div data-color-mode="light" className="flex p-4 border rounded-lg">
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
