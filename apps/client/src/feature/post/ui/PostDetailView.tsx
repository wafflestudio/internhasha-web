import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/card/card.tsx';
import { SignInForBookmarkModal } from '@/components/modal/SignInForBookmarkModal.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ICON_SRC } from '@/entities/asset.ts';
import { SeriesBadge } from '@/feature/post/ui/SeriesBadge.tsx';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useAddBookmark, useDeleteBookmark } from '@/util/bookmarkFunctions.ts';
import {
  getEmploymentStatus,
  getFormatDate,
} from '@/util/postFormatFunctions.ts';

export const PostDetailView = ({ postId }: { postId: string }) => {
  const { postDetailData } = useGetPostDetail({ postId: postId });
  const { API_BASE_URL } = useGuardContext(EnvContext);
  const { token } = useGuardContext(TokenContext);

  const { toMain, toCreateResume } = useRouteNavigation();

  const [showSignInModal, setShowSignInModal] = useState(false);
  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const { addBookmark, isPending: isAddBookmarkPending } = useAddBookmark();
  const { deleteBookmark, isPending: isDeleteBookmarkPending } =
    useDeleteBookmark();

  const isPending = isAddBookmarkPending || isDeleteBookmarkPending;

  const onClickAddBookmark = ({ id }: { id: string }) => {
    if (token === null) {
      setShowSignInModal(true);
      return;
    }
    addBookmark({ postId: id });
  };

  const onClickDeleteBookmark = ({ id }: { id: string }) => {
    if (token === null) {
      setShowSignInModal(true);
      return;
    }
    deleteBookmark({ postId: id });
  };

  // TODO: 전체 페이지 대신 카드 컴포넌트만 로딩되도록 설정
  if (postDetailData === undefined) {
    return <div>로딩 중...</div>;
  }

  if (postDetailData.type === 'error') {
    return <div>정보를 불러오는 중 문제가 발생했습니다. 새로고침해주세요.</div>;
  }

  const {
    companyName,
    slogan,
    imageLink,
    tags,
    investAmount,
    series,
    investCompany,
    irDeckLink,
    landingPageLink,
    externalDescriptionLink,
    title,
    detail,
    headcount,
    employmentEndDate,
    isBookmarked,
  } = postDetailData.data;

  const investCompanyList = investCompany.split(',');
  const tagList = tags?.map((item) => item.tag);

  return (
    <div className="max-w-screen-md mx-auto gap-12 p-10 flex flex-col md:flex-row">
      <div className="flex flex-col gap-12 flex-1">
        {/* 헤더 */}
        <div className="flex flex-col justify-between items-start gap-2">
          <div className="flex items-center gap-3">
            <img
              src={`${API_BASE_URL}/${imageLink}`}
              alt="회사 썸네일 이미지"
              className="w-10 h-10 object-cover rounded-lg"
            />
            <span className="text-gray-900 text-2xl">{companyName}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-black text-4xl font-bold">{title}</span>
            <div className="content-center">
              {isBookmarked ? (
                <button
                  disabled={isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickDeleteBookmark({ id: postId });
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
                    onClickAddBookmark({ id: postId });
                  }}
                >
                  <img
                    src={ICON_SRC.BOOKMARK.UNSELECTED}
                    className="w-[30px] h-[30px]"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 회사 소개 */}
        <div className="flex flex-col gap-10">
          <Card className="border-none flex flex-col gap-5">
            <CardHeader>
              <CardTitle className="text-xl flex flex-col gap-5">
                <p className="text-xl">회사 소개</p>
                <p className="text-lg text-gray-600 font-normal">{slogan}</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 space-y-4 py-6 px-4 sm:py-6 sm:px-8 rounded-lg bg-gray-100">
              <div className="flex flex-col gap-8 sm:gap-16 xs:flex-row">
                <div className="flex items-center flex-1">
                  <span className="text-sm w-24 sm:w-32 text-gray-500 font-medium">
                    투자 유치 단계
                  </span>
                  <SeriesBadge series={series} className="py-1.5 px-2" />
                </div>
                <div className="flex-1">
                  {investAmount != null && (
                    <div className="flex items-center">
                      <span className="text-sm w-24 sm:w-32 text-gray-500 font-medium">
                        누적 투자액
                      </span>
                      <Badge
                        variant="outline"
                        className="bg-white text-gray-800 font-normal
                        py-1.5 px-2"
                      >
                        {investAmount}억 원
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm w-24 sm:w-32 text-gray-500 font-medium">
                  투자사
                </span>
                <div className="flex items-center gap-2">
                  {investCompanyList.map((company, index) => {
                    return (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-white text-gray-800 font-normal
                        py-1.5 px-2"
                      >
                        {company}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="flex gap-4 xs:gap-10">
            <div className="flex flex-col gap-5 items-center xs:flex-row">
              <span>회사 홈페이지</span>
              {landingPageLink != null ? (
                <a
                  href={landingPageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 gap-1 rounded-lg bg-gray-100"
                >
                  <img src={ICON_SRC.LINK} className="w-[20px] h-[20px]" />
                  <span>링크 접속</span>
                </a>
              ) : (
                <p>준비 중</p>
              )}
            </div>

            <div className="flex gap-5 items-center flex-col xs:flex-row flex-1">
              <span>IR Deck 자료</span>
              {irDeckLink != null ? (
                <a
                  href={`${API_BASE_URL}/${irDeckLink}`}
                  target="_blank"
                  download={true}
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 gap-1 rounded-lg bg-gray-100"
                >
                  <img src={ICON_SRC.DOWNLOAD} className="w-[20px] h-[20px]" />
                  <span>IR Deck 자료</span>
                </a>
              ) : (
                <p>준비 중</p>
              )}
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-5 items-start xs:flex-row">
              <span>외부 링크</span>
              {externalDescriptionLink !== undefined &&
                externalDescriptionLink.map((Link, index) => {
                  return (
                    <div key={index} className="flex">
                      <span className="font-normal text-gray-600">
                        {Link.description}
                      </span>
                      <a
                        href={landingPageLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 gap-1 rounded-lg bg-gray-100"
                      >
                        <img
                          src={ICON_SRC.DOWNLOAD}
                          className="w-[20px] h-[20px]"
                        />
                      </a>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* 태그 */}
          {tags != null && (
            <section className="space-y-4 border-b-2 pb-10">
              <span className="text-xl font-bold">태그</span>
              <div className="flex flex-wrap gap-2">
                {tagList?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-white text-gray-800 font-normal
                        py-1.5 px-2"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* 상세 공고 글 */}
        <section className="flex flex-col gap-7">
          <span className="text-2xl font-bold">상세 공고 글</span>
          <CardContent className="flex items-center bg-gray-100 px-6 py-4 gap-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_2490_3958"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_2490_3958)">
                <path
                  d="M12 11.6921C11.0375 11.6921 10.2136 11.3495 9.52825 10.6641C8.84275 9.97864 8.5 9.15464 8.5 8.19214C8.5 7.22964 8.84275 6.40572 9.52825 5.72039C10.2136 5.03489 11.0375 4.69214 12 4.69214C12.9625 4.69214 13.7864 5.03489 14.4718 5.72039C15.1573 6.40572 15.5 7.22964 15.5 8.19214C15.5 9.15464 15.1573 9.97864 14.4718 10.6641C13.7864 11.3495 12.9625 11.6921 12 11.6921ZM4.5 17.7884V17.0844C4.5 16.5947 4.633 16.1412 4.899 15.7239C5.165 15.3066 5.5205 14.9857 5.9655 14.7614C6.95383 14.2769 7.95092 13.9135 8.95675 13.6711C9.96258 13.4288 10.977 13.3076 12 13.3076C13.023 13.3076 14.0374 13.4288 15.0433 13.6711C16.0491 13.9135 17.0462 14.2769 18.0345 14.7614C18.4795 14.9857 18.835 15.3066 19.101 15.7239C19.367 16.1412 19.5 16.5947 19.5 17.0844V17.7884C19.5 18.2101 19.3523 18.5687 19.0568 18.8644C18.7613 19.1599 18.4026 19.3076 17.9808 19.3076H6.01925C5.59742 19.3076 5.23875 19.1599 4.94325 18.8644C4.64775 18.5687 4.5 18.2101 4.5 17.7884ZM6 17.8076H18V17.0844C18 16.8819 17.9413 16.6944 17.824 16.5219C17.7067 16.3496 17.5474 16.2089 17.3462 16.0999C16.4846 15.6756 15.6061 15.3541 14.7107 15.1354C13.8152 14.9169 12.9117 14.8076 12 14.8076C11.0883 14.8076 10.1848 14.9169 9.28925 15.1354C8.39392 15.3541 7.51542 15.6756 6.65375 16.0999C6.45258 16.2089 6.29333 16.3496 6.176 16.5219C6.05867 16.6944 6 16.8819 6 17.0844V17.8076ZM12 10.1921C12.55 10.1921 13.0208 9.99631 13.4125 9.60464C13.8042 9.21297 14 8.74214 14 8.19214C14 7.64214 13.8042 7.17131 13.4125 6.77964C13.0208 6.38797 12.55 6.19214 12 6.19214C11.45 6.19214 10.9792 6.38797 10.5875 6.77964C10.1958 7.17131 10 7.64214 10 8.19214C10 8.74214 10.1958 9.21297 10.5875 9.60464C10.9792 9.99631 11.45 10.1921 12 10.1921Z"
                  fill="#383B41"
                />
              </g>
            </svg>
            <span>{title}</span>
            <span>{headcount}명</span>
          </CardContent>
          <span className="text-gray-600 ">{detail}</span>
        </section>
      </div>

      <div className="flex flex-col flex-[0.5] w-full gap-5 my-36 md:w-80">
        <div className="text-sm text-gray-900 font-medium flex items-center gap-3">
          <span>
            채용 마감일 :{' '}
            {employmentEndDate != null
              ? getFormatDate(employmentEndDate)
              : '상시 채용'}
          </span>

          <span className="bg-gray-600 text-white py-1 px-2 rounded-md">
            {employmentEndDate != null
              ? getEmploymentStatus(employmentEndDate)
              : '상시'}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => {
              toCreateResume({ postId });
            }}
            className="bg-gray-600 text-white h-12 hover:bg-gray-400"
          >
            커피챗 신청하기
          </Button>
          <Button variant="outline" onClick={toMain}>
            목록으로
          </Button>
        </div>
      </div>
      {showSignInModal && <SignInForBookmarkModal onClose={closeSignInModal} />}
    </div>
  );
};

export const useGetPostDetail = ({ postId }: { postId: string }) => {
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
