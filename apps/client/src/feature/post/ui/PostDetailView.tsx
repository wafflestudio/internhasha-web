import { useQuery } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/card/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { SeriesBadge } from '@/feature/post/ui/SeriesBadge.tsx';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import {
  getEmploymentStatus,
  getFormatDate,
} from '@/util/postFormatFunctions.ts';

export const PostDetailView = ({ postId }: { postId: string }) => {
  const { postDetailData } = useGetPostDetail({ postId: postId });
  const { toMain, toCreateResume } = useRouteNavigation();

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
  } = postDetailData.data;

  const investCompanyList = investCompany.split(',');
  const tagList = tags?.map((item) => item.tag);

  return (
    <div className="max-w-screen-md mx-auto gap-12 p-10 flex">
      <div className="flex flex-col gap-12 flex-1">
        {/* 헤더 */}
        <div className="flex flex-col justify-between items-start gap-2">
          <div className="flex items-center gap-3">
            <img
              src={imageLink}
              alt=""
              className="w-10 h-10 object-cover rounded-lg"
            />
            <span className="text-gray-900 text-2xl">{companyName}</span>
          </div>
          {/* TODO title 데이터 들어오면 '타이틀' 없애기*/}
          <span className="text-black text-4xl font-bold">{title}</span>
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
            <CardContent className="flex flex-col gap-4 space-y-4 py-6 px-8 rounded-lg bg-gray-100">
              {/* 투자 단계 */}
              <div className="flex gap-16">
                <div className="flex items-center">
                  <span className="text-sm w-32 text-gray-500 font-medium">
                    투자 유치 단계
                  </span>
                  <SeriesBadge series={series} className="py-1.5 px-2" />
                </div>
                <div>
                  {investAmount != null && (
                    <div className="flex items-center">
                      <span className="text-sm w-24 text-gray-500 font-medium">
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
                <span className="text-sm w-32 text-gray-500 font-medium">
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

          <section className="flex gap-12">
            <div className="flex gap-5 items-center">
              <span>회사 홈페이지</span>
              <a
                href={landingPageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 gap-1 rounded-lg bg-gray-100"
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="link">
                    <mask
                      id="mask0_2490_3618"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="21"
                    >
                      <rect
                        id="Bounding box"
                        y="0.5"
                        width="20"
                        height="20"
                        fill="#D9D9D9"
                      />
                    </mask>
                    <g mask="url(#mask0_2490_3618)">
                      <path
                        id="link_2"
                        d="M6 14.5C4.89333 14.5 3.95 14.1095 3.17 13.3285C2.39 12.5477 2 11.6033 2 10.4952C2 9.38729 2.39 8.44444 3.17 7.66667C3.95 6.88889 4.89333 6.5 6 6.5H8.25C8.4625 6.5 8.64062 6.57146 8.78438 6.71437C8.92813 6.85729 9 7.03437 9 7.24562C9 7.45687 8.92813 7.63542 8.78438 7.78125C8.64062 7.92708 8.4625 8 8.25 8H6C5.30556 8 4.71528 8.24306 4.22917 8.72917C3.74306 9.21528 3.5 9.80556 3.5 10.5C3.5 11.1944 3.74306 11.7847 4.22917 12.2708C4.71528 12.7569 5.30556 13 6 13H8.25C8.4625 13 8.64062 13.0715 8.78438 13.2144C8.92813 13.3573 9 13.5344 9 13.7456C9 13.9569 8.92813 14.1354 8.78438 14.2812C8.64062 14.4271 8.4625 14.5 8.25 14.5H6ZM7.75583 11.25C7.54361 11.25 7.36458 11.1785 7.21875 11.0356C7.07292 10.8927 7 10.7156 7 10.5044C7 10.2931 7.07181 10.1146 7.21542 9.96875C7.35903 9.82292 7.53694 9.75 7.74917 9.75H12.2442C12.4564 9.75 12.6354 9.82146 12.7812 9.96438C12.9271 10.1073 13 10.2844 13 10.4956C13 10.7069 12.9282 10.8854 12.7846 11.0312C12.641 11.1771 12.4631 11.25 12.2508 11.25H7.75583ZM11.75 14.5C11.5375 14.5 11.3594 14.4285 11.2156 14.2856C11.0719 14.1427 11 13.9656 11 13.7544C11 13.5431 11.0719 13.3646 11.2156 13.2188C11.3594 13.0729 11.5375 13 11.75 13H14C14.6944 13 15.2847 12.7569 15.7708 12.2708C16.2569 11.7847 16.5 11.1944 16.5 10.5C16.5 9.80556 16.2569 9.21528 15.7708 8.72917C15.2847 8.24306 14.6944 8 14 8H11.75C11.5375 8 11.3594 7.92854 11.2156 7.78563C11.0719 7.64271 11 7.46563 11 7.25438C11 7.04313 11.0719 6.86458 11.2156 6.71875C11.3594 6.57292 11.5375 6.5 11.75 6.5H14C15.1067 6.5 16.05 6.89049 16.83 7.67146C17.61 8.45229 18 9.39674 18 10.5048C18 11.6127 17.61 12.5556 16.83 13.3333C16.05 14.1111 15.1067 14.5 14 14.5H11.75Z"
                        fill="#777F8B"
                      />
                    </g>
                  </g>
                </svg>
                <span>링크 접속</span>
              </a>
            </div>

            <div className="flex gap-5 items-center">
              <span>IR Deck 자료</span>
              <a
                href={irDeckLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 gap-1 rounded-lg bg-gray-100"
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="vertical_align_bottom">
                    <mask
                      id="mask0_2490_3627"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="21"
                    >
                      <rect
                        id="Bounding box"
                        y="0.5"
                        width="20"
                        height="20"
                        fill="#D9D9D9"
                      />
                    </mask>
                    <g mask="url(#mask0_2490_3627)">
                      <path
                        id="vertical_align_bottom_2"
                        d="M4.75604 17.5C4.54368 17.5 4.36458 17.4285 4.21875 17.2856C4.07292 17.1427 4 16.9656 4 16.7544C4 16.5431 4.07181 16.3646 4.21542 16.2188C4.35917 16.0729 4.53722 16 4.74958 16H15.244C15.4563 16 15.6354 16.0715 15.7812 16.2144C15.9271 16.3573 16 16.5344 16 16.7456C16 16.9569 15.9282 17.1354 15.7846 17.2812C15.6408 17.4271 15.4628 17.5 15.2504 17.5H4.75604ZM9.99583 14.1875C9.89583 14.1875 9.80208 14.1701 9.71458 14.1354C9.62708 14.1007 9.54861 14.0486 9.47917 13.9792L6.51792 11.0179C6.36708 10.8671 6.29514 10.691 6.30208 10.4896C6.30903 10.2882 6.38889 10.1111 6.54167 9.95833C6.69444 9.80556 6.87153 9.72917 7.07292 9.72917C7.27431 9.72917 7.45139 9.80556 7.60417 9.95833L9.25 11.625V4.25C9.25 4.0375 9.32146 3.85937 9.46438 3.71562C9.60729 3.57187 9.78438 3.5 9.99563 3.5C10.2069 3.5 10.3854 3.57187 10.5312 3.71562C10.6771 3.85937 10.75 4.0375 10.75 4.25V11.625L12.4167 9.95833C12.5694 9.80556 12.7465 9.73264 12.9479 9.73958C13.1493 9.74653 13.3264 9.82639 13.4792 9.97917C13.6319 10.1319 13.7083 10.309 13.7083 10.5104C13.7083 10.7118 13.6329 10.8874 13.4821 11.0373L10.5208 13.9792C10.4458 14.0486 10.3646 14.1007 10.2771 14.1354C10.1896 14.1701 10.0958 14.1875 9.99583 14.1875Z"
                        fill="#777F8B"
                      />
                    </g>
                  </g>
                </svg>
                <span>IR Deck 자료</span>
              </a>
            </div>
          </section>

          <section>
            <span>외부 링크</span>
            <div>
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
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="link">
                            <mask
                              id="mask0_2490_3618"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="20"
                              height="21"
                            >
                              <rect
                                id="Bounding box"
                                y="0.5"
                                width="20"
                                height="20"
                                fill="#D9D9D9"
                              />
                            </mask>
                            <g mask="url(#mask0_2490_3618)">
                              <path
                                id="link_2"
                                d="M6 14.5C4.89333 14.5 3.95 14.1095 3.17 13.3285C2.39 12.5477 2 11.6033 2 10.4952C2 9.38729 2.39 8.44444 3.17 7.66667C3.95 6.88889 4.89333 6.5 6 6.5H8.25C8.4625 6.5 8.64062 6.57146 8.78438 6.71437C8.92813 6.85729 9 7.03437 9 7.24562C9 7.45687 8.92813 7.63542 8.78438 7.78125C8.64062 7.92708 8.4625 8 8.25 8H6C5.30556 8 4.71528 8.24306 4.22917 8.72917C3.74306 9.21528 3.5 9.80556 3.5 10.5C3.5 11.1944 3.74306 11.7847 4.22917 12.2708C4.71528 12.7569 5.30556 13 6 13H8.25C8.4625 13 8.64062 13.0715 8.78438 13.2144C8.92813 13.3573 9 13.5344 9 13.7456C9 13.9569 8.92813 14.1354 8.78438 14.2812C8.64062 14.4271 8.4625 14.5 8.25 14.5H6ZM7.75583 11.25C7.54361 11.25 7.36458 11.1785 7.21875 11.0356C7.07292 10.8927 7 10.7156 7 10.5044C7 10.2931 7.07181 10.1146 7.21542 9.96875C7.35903 9.82292 7.53694 9.75 7.74917 9.75H12.2442C12.4564 9.75 12.6354 9.82146 12.7812 9.96438C12.9271 10.1073 13 10.2844 13 10.4956C13 10.7069 12.9282 10.8854 12.7846 11.0312C12.641 11.1771 12.4631 11.25 12.2508 11.25H7.75583ZM11.75 14.5C11.5375 14.5 11.3594 14.4285 11.2156 14.2856C11.0719 14.1427 11 13.9656 11 13.7544C11 13.5431 11.0719 13.3646 11.2156 13.2188C11.3594 13.0729 11.5375 13 11.75 13H14C14.6944 13 15.2847 12.7569 15.7708 12.2708C16.2569 11.7847 16.5 11.1944 16.5 10.5C16.5 9.80556 16.2569 9.21528 15.7708 8.72917C15.2847 8.24306 14.6944 8 14 8H11.75C11.5375 8 11.3594 7.92854 11.2156 7.78563C11.0719 7.64271 11 7.46563 11 7.25438C11 7.04313 11.0719 6.86458 11.2156 6.71875C11.3594 6.57292 11.5375 6.5 11.75 6.5H14C15.1067 6.5 16.05 6.89049 16.83 7.67146C17.61 8.45229 18 9.39674 18 10.5048C18 11.6127 17.61 12.5556 16.83 13.3333C16.05 14.1111 15.1067 14.5 14 14.5H11.75Z"
                                fill="#777F8B"
                              />
                            </g>
                          </g>
                        </svg>
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

      <div className="flex flex-col flex-[0.5] w-80 gap-5 my-36">
        <div className="text-sm text-gray-900 font-medium flex items-center gap-3">
          <span>
            채용 마감일 :{' '}
            {employmentEndDate !== undefined
              ? getFormatDate(employmentEndDate)
              : '상시'}
          </span>

          <span className="bg-gray-600 text-white py-1 px-2 rounded-md">
            {employmentEndDate !== undefined &&
              getEmploymentStatus(employmentEndDate)}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => {
              toCreateResume({ postId });
            }}
            className="bg-gray-600 text-white h-12"
          >
            커피챗 신청하기
          </Button>
          <Button variant="outline" onClick={toMain}>
            목록으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export const useGetPostDetail = ({ postId }: { postId: string }) => {
  const { token } = useGuardContext(TokenContext);
  const { postService } = useGuardContext(ServiceContext);

  const { data: postDetailData } = useQuery({
    queryKey: ['postServicce', 'getPostDetail', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      return postService.getPostDetail({ token: t !== null ? t: undefined, postId: postId });
    },
  });

  return { postDetailData };
};
