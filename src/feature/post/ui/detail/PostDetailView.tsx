import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { DownloadButtonWithPresignedUrl } from '@/components/button/DownloadButtonWithPresignedUrl';
import { LinkButton } from '@/components/button/LinkButton';
import { ClosePostModal } from '@/components/modal/ClosePostModal';
import { SignInForBookmarkModal } from '@/components/modal/SignInForBookmarkModal';
import { SignInForCoffeeChatModal } from '@/components/modal/SignInForCoffeChatModal';
import { WriteProfileModal } from '@/components/modal/WriteProfileModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MarkdownPreview } from '@/components/ui/markdown-preview';
import { SeperatorLine } from '@/components/ui/separator';
import { ICON_SRC } from '@/entities/asset';
import {
  checkPostActive,
  formatEmploymentState,
} from '@/feature/post/presentation/postFormatPresentation';
import { SkeletonPostDetailView } from '@/feature/post/ui/detail/SkeletonPostDetailView';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { UserContext } from '@/shared/context/UserContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import {
  formatDomainToLabel,
  formatIsoToDate,
  formatMinorJobToLabel,
} from '@/util/format';

export const PostDetailView = ({ postId }: { postId: string }) => {
  const { postDetailData } = useGetPostDetail({ postId: postId });
  const { token } = useGuardContext(TokenContext);
  const { role, id: userId } = useGuardContext(UserContext);
  const { coffeeChatStatus } = useGetCoffeeChatStatus({ postId });
  const { applicantProfileResponse } = useGetApplicantProfile();

  const { toBack, toCreateCoffeeChat, toCreatePost } = useRouteNavigation();

  const [showModal, setShowModal] = useState<
    'COFFEE_CHAT' | 'BOOKMARK' | 'NONE' | 'CLOSE_POST' | 'NEED_PROFILE'
  >('NONE');
  const [modalMessage, setModalMessage] = useState('');
  const closeModal = () => {
    setShowModal('NONE');
  };

  const { addBookmark, isPending: isAddBookmarkPending } = useAddBookmark();
  const { deleteBookmark, isPending: isDeleteBookmarkPending } =
    useDeleteBookmark();
  const { closePost, isPending: isClosePostPending } = useClosePost({
    closeModal,
    setModalMessage,
  });

  const isPending =
    isAddBookmarkPending || isDeleteBookmarkPending || isClosePostPending;

  if (
    postDetailData === undefined ||
    (role === 'APPLICANT' && applicantProfileResponse === undefined)
  ) {
    return <SkeletonPostDetailView />;
  }

  if (
    postDetailData.type === 'error' ||
    (role === 'APPLICANT' &&
      applicantProfileResponse?.type === 'error' &&
      applicantProfileResponse.code !== 'APPLICANT_002')
  ) {
    return <div>정보를 불러오는 중 문제가 발생했습니다. 새로고침해주세요.</div>;
  }

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
    if (role === 'APPLICANT') {
      if (
        applicantProfileResponse?.type === 'error' &&
        applicantProfileResponse.code === 'APPLICANT_002'
      ) {
        setShowModal('NEED_PROFILE');
        return;
      }
    }
    toCreateCoffeeChat({ postId: id });
  };

  const handleClickClosePost = () => {
    setShowModal('CLOSE_POST');
  };

  const { author, company, position, isBookmarked } = postDetailData.data;
  const isEmploymentActive = checkPostActive({
    date: position.employmentEndDate,
  });

  return (
    <div className="mx-auto mb-[30px] flex max-w-screen-md flex-col gap-[56px] p-6 text-grey-900">
      {/* 헤더 */}
      <div className="flex w-full flex-col gap-2 md:max-w-[580px]">
        <div className="flex flex-col items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <img
              src={`/${company.profileImageKey}`}
              alt="회사 썸네일 이미지"
              className="h-[40px] w-[40px] rounded-lg object-cover"
            />
            <span className="text-lg font-semibold">{company.companyName}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-4xl font-bold">{position.positionTitle}</span>
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
                {position.employmentEndDate !== null
                  ? formatIsoToDate(position.employmentEndDate)
                  : '상시 채용'}
              </span>
              <Badge variant="primary">
                {formatEmploymentState({
                  date: position.employmentEndDate,
                })}
              </Badge>
            </div>
          </div>
          <div className="flex flex-row gap-3 md:flex-col">
            {role !== 'COMPANY' && (
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    handleClickApplyCoffeeChat({ id: postId });
                  }}
                  disabled={coffeeChatStatus?.isSubmitted}
                >
                  {(coffeeChatStatus?.isSubmitted ?? false)
                    ? '커피챗 신청완료'
                    : '커피챗 신청하기'}
                </Button>
              </div>
            )}
            {author.id === userId && (
              <Button
                onClick={() => {
                  toCreatePost({
                    companyId: company.id,
                    body: {
                      id: postId,
                      positionTitle: position.positionTitle,
                      employmentEndDateTime: position.employmentEndDate,
                      jobMinorCategory: position.positionType,
                      detail: position.detail,
                      headcount: position.headCount,
                      salary: position.salary,
                    },
                  });
                }}
                disabled={!isEmploymentActive}
                className="flex-1"
              >
                공고 수정하기
              </Button>
            )}
            {author.id === userId && (
              <Button
                variant="destructive"
                onClick={() => {
                  handleClickClosePost();
                }}
                disabled={!isEmploymentActive}
              >
                {isEmploymentActive ? '공고 마감하기' : '마감됨'}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                toBack();
              }}
            >
              목록으로
            </Button>
          </div>
        </div>

        {/* 회사 소개 */}
        <div className="flex w-full flex-col gap-4 md:max-w-[580px]">
          <p className="text-xl font-semibold">회사 소개</p>
          {/* 회사 설명 카드 */}
          <section className="flex flex-col gap-4 rounded-lg bg-grey-50 px-[34px] py-[24px]">
            <div className="flex flex-col gap-4 md:flex-row md:gap-[68px]">
              <div className="flex flex-1 items-center">
                <span className="w-[80px] text-grey-700">업종</span>
                <span>{formatDomainToLabel(company.domain)}</span>
              </div>
              <div className="flex flex-1 items-center">
                <span className="w-[80px] text-grey-700">구성 인원수</span>
                <span>{company.headcount}명</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-[80px] text-grey-700">설립</span>
              <div className="flex items-center gap-2">
                <span>{company.companyEstablishedYear}년</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-[80px] text-grey-700">근무 위치</span>
              <div className="flex items-center gap-2">
                <img src={ICON_SRC.LOCATION} />
                <span>{company.location.replace('|', ' ')}</span>
              </div>
            </div>
          </section>

          {/* 외부 링크 및 태그 모음 */}
          <div className="flex flex-col gap-[30px]">
            <section className="flex flex-col gap-5 md:flex-row md:gap-[50px]">
              {company.landingPageLink !== undefined &&
                company.landingPageLink.trim().length !== 0 && (
                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                    <span className="text-lg font-semibold text-grey-800">
                      회사 홈페이지
                    </span>
                    <LinkButton link={company.landingPageLink}>
                      링크 접속
                    </LinkButton>
                  </div>
                )}

              {token !== null &&
                company.companyInfoPDFKey !== undefined &&
                company.companyInfoPDFKey.trim().length !== 0 && (
                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                    <span className="text-lg font-semibold text-grey-800">
                      회사 소개 자료
                    </span>

                    <DownloadButtonWithPresignedUrl
                      s3Key={company.companyInfoPDFKey}
                      type="IR_DECK"
                      fileName={`${company.companyName}_소개자료.pdf`}
                    >
                      <img src={ICON_SRC.DOWNLOAD} />
                      <span className="font-semibold text-grey-600">
                        PDF 다운로드
                      </span>
                    </DownloadButtonWithPresignedUrl>
                  </div>
                )}
            </section>

            {company.links !== undefined && company.links.length !== 0 && (
              <section className="flex flex-col gap-3">
                <span className="text-lg font-semibold text-grey-800">
                  외부 링크
                </span>
                <div className="flex flex-col gap-1.5">
                  {company.links.map((linkWithDescription, index) => {
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
            {company.tags !== undefined && company.tags.length !== 0 && (
              <section className="flex flex-col gap-3">
                <span className="text-lg font-semibold text-grey-800">
                  태그
                </span>

                <div className="flex flex-wrap gap-2">
                  {company.tags.map((item, index) => (
                    <Badge key={index} variant="outline">
                      {item.tag}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            <section className="flex flex-col gap-3">
              <span className="text-lg font-semibold text-grey-800">
                상세 소개
              </span>
              <div className="flex rounded-md border">
                <MarkdownPreview content={company.detail} />
              </div>
            </section>

            {company.vcName !== undefined &&
              company.vcRecommendation !== undefined && (
                <section className="flex flex-col gap-3">
                  <span className="text-lg font-semibold text-grey-800">
                    VC 추천 이유
                  </span>
                  <p
                    data-color-mode="light"
                    className="flex rounded-md border p-4"
                  >
                    {company.vcRecommendation}
                  </p>
                </section>
              )}
          </div>
        </div>
      </div>

      <SeperatorLine className="md:max-w-[580px]" />

      {/* 상세 공고 글 */}
      <section className="flex w-full flex-col gap-[30px] md:max-w-[580px]">
        <span className="text-2xl font-bold">상세 공고 글</span>
        <div className="flex flex-col gap-4 rounded-lg bg-grey-50 px-[34px] py-[24px]">
          <div className="flex items-center gap-2">
            <img src={ICON_SRC.PERSON} />
            <span>
              {formatMinorJobToLabel(position.positionType)}{' '}
              {position.headCount}명
            </span>
          </div>
          <div className="flex flex-1 gap-4">
            <span className="text-grey-700">월급</span>
            {position.salary == null ? (
              <span>추후 협의</span>
            ) : (
              <span>{position.salary} 만원</span>
            )}
          </div>
        </div>
        <div className="flex rounded-md border">
          <MarkdownPreview content={position.detail} />
        </div>
      </section>

      {showModal === 'BOOKMARK' && (
        <SignInForBookmarkModal onClose={closeModal} />
      )}
      {showModal === 'COFFEE_CHAT' && (
        <SignInForCoffeeChatModal onClose={closeModal} />
      )}
      {showModal === 'CLOSE_POST' && (
        <ClosePostModal
          onClose={closeModal}
          onConfirm={() => {
            closePost({ postId });
          }}
          modalMessage={modalMessage}
        />
      )}
      {showModal === 'NEED_PROFILE' && (
        <WriteProfileModal onClose={closeModal} />
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

const useGetCoffeeChatStatus = ({ postId }: { postId: string }) => {
  const { token } = useGuardContext(TokenContext);
  const { coffeeChatService } = useGuardContext(ServiceContext);

  const { data: coffeeChatStatusResponse } = useQuery({
    queryKey: [
      'coffeeChatService',
      'getCoffeeChatStatus',
      postId,
      token,
    ] as const,
    queryFn: async ({ queryKey: [, , pid, t] }) => {
      if (t === null) {
        return { isSubmitted: false };
      }

      const response = await coffeeChatService.getCoffeeChatStatus({
        token: t,
        postId: pid,
      });

      if (response.type === 'error') {
        return { isSubmitted: false };
      }

      return response.data;
    },
  });

  return { coffeeChatStatus: coffeeChatStatusResponse };
};

import { createErrorMessage } from '@/entities/errors';

const useClosePost = ({
  closeModal,
  setModalMessage,
}: {
  closeModal: () => void;
  setModalMessage: (input: string) => void;
}) => {
  const { token } = useGuardContext(TokenContext);
  const { postService } = useGuardContext(ServiceContext);

  const queryClient = useQueryClient();

  const { mutate: closePost, isPending } = useMutation({
    mutationFn: ({ postId }: { postId: string }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.closePost({ token, postId });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries({ queryKey: ['postService'] });
        closeModal();
        return;
      } else {
        setModalMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setModalMessage(
        '공고 마감에 실패하였습니다. 잠시 후에 다시 시도해주세요.',
      );
    },
  });

  return {
    closePost,
    isPending,
  };
};

const useGetApplicantProfile = () => {
  const { token } = useGuardContext(TokenContext);
  const { role } = useGuardContext(UserContext);
  const { applicantService } = useGuardContext(ServiceContext);

  const { data: applicantProfileResponse } = useQuery({
    queryKey: ['ApplicantService', 'getProfile', token, role] as const,
    queryFn: async ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      if (role !== 'APPLICANT') {
        throw new Error('지원자가 아닙니다.');
      }

      return applicantService.getProfile({
        token: t,
      });
    },
    enabled: token !== null && role === 'APPLICANT',
  });

  return { applicantProfileResponse };
};
