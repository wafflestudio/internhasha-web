import { useQuery } from '@tanstack/react-query';

import { DownloadButtonWithPresignedUrl } from '@/components/button/DownloadButtonWithPresignedUrl';
import { LinkButton } from '@/components/button/LinkButton';
import { ThumbnailWithPresignedUrl } from '@/components/thumbnail/ThumbnailWithPresignedUrl';
import { Badge } from '@/components/ui/badge';
import { SkeletonApplicantInfo } from '@/feature/applicant/ui/mypage/SkeletonApplicantInfo';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { formatMinorJobToLabel } from '@/util/format';

const mockApplicantData = {
  name: '홍길동',
  snuMail: 'example@snu.ac.kr',
  enrollYear: '2021',
  department: '컴퓨터공학부',
  positions: ['FRONTEND', 'BACKEND'],
  slogan: '열정적인 개발자를 꿈꾸고 있습니다.',
  explanation:
    '안녕하세요, 웹 개발에 관심이 많은 학생입니다. React와 Node.js를 주로 사용합니다.',
  stacks: ['React', 'TypeScript', 'Node.js'],
  imageKey: undefined,
  cvKey: undefined,
  portfolioKey: undefined,
  links: [
    {
      description: 'GitHub',
      link: 'https://github.com/example',
    },
  ],
};

export const ApplicantInfo = () => {
  const { applicantInfoData } = useApplicantInfo();

  if (applicantInfoData === undefined) {
    return <SkeletonApplicantInfo />;
  }

  // if (applicantInfoData.type === 'error') {
  //   return (
  //     <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
  //   );
  // }

  // const {
  //   name,
  //   snuMail,
  //   enrollYear,
  //   department,
  //   positions,
  //   slogan,
  //   explanation,
  //   stacks,
  //   imageKey,
  //   cvKey,
  //   portfolioKey,
  //   links,
  // } = applicantInfoData.data;

  const {
    name,
    snuMail,
    enrollYear,
    department,
    positions,
    slogan,
    explanation,
    stacks,
    imageKey,
    cvKey,
    portfolioKey,
    links,
  } =
    applicantInfoData.type === 'error'
      ? mockApplicantData
      : applicantInfoData.data;

  const formattedPositions = positions?.map((position) =>
    formatMinorJobToLabel(position),
  );

  return (
    <>
      <section className="flex gap-4">
        {imageKey !== undefined ? (
          <ThumbnailWithPresignedUrl s3Key={imageKey} type="USER_THUMBNAIL" />
        ) : (
          <div className="h-[80px] w-[80px] bg-grey-200"></div>
        )}
        <div className="flex flex-col gap-3">
          <p className="text-30 font-bold">{name}</p>
          <span className="font-regular">{`${department} ${enrollYear}학번`}</span>
        </div>
      </section>

      <section>
        <p>{slogan}</p>
      </section>

      <div className="h-[1px] w-full bg-grey-200 md:max-w-[580px]"></div>

      {(positions !== undefined || stacks !== undefined) && (
        <section className="flex flex-col gap-4">
          <h3 className="text-22 font-bold">기본 정보</h3>
          {formattedPositions !== undefined && (
            <p>{formattedPositions.join(' / ')}</p>
          )}
          <div className="flex gap-4">
            {stacks !== undefined &&
              stacks.map((stack) => (
                <Badge variant="secondary" key={`stack-${stack}`}>
                  {stack}
                </Badge>
              ))}
          </div>
        </section>
      )}

      {(explanation !== undefined ||
        portfolioKey !== undefined ||
        cvKey !== undefined) && (
        <section className="flex flex-col gap-4">
          <h3 className="text-22 font-bold">자기소개</h3>
          <p>{explanation}</p>
          <div className="pag-4 flex">
            {cvKey !== undefined && (
              <DownloadButtonWithPresignedUrl s3Key={cvKey} type="CV">
                이력서 다운로드
              </DownloadButtonWithPresignedUrl>
            )}
            {portfolioKey !== undefined && (
              <DownloadButtonWithPresignedUrl
                s3Key={portfolioKey}
                type="PORTFOLIO"
              >
                포트폴리오 다운로드
              </DownloadButtonWithPresignedUrl>
            )}
          </div>
        </section>
      )}

      <div className="h-[1px] w-full bg-grey-200 md:max-w-[580px]"></div>

      <section className="flex flex-col gap-4">
        <h3 className="text-22 font-bold">기타 정보</h3>
        <div className="flex flex-col gap-2">
          {links?.map((linkWithDescription) => (
            <div
              key={`external-link-${linkWithDescription.description}`}
              className="flex items-center gap-[10px]"
            >
              <span>{linkWithDescription.description}</span>
              <LinkButton link={linkWithDescription.link} />
            </div>
          ))}
          <div className="flex gap-[10px]">
            <span>이메일</span>
            <span>{snuMail}</span>
          </div>
        </div>
      </section>
    </>
  );
};

const useApplicantInfo = () => {
  const { token } = useGuardContext(TokenContext);
  const { applicantService } = useGuardContext(ServiceContext);
  const { data: applicantInfoData } = useQuery({
    queryKey: ['applicantService', 'getProfile', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return applicantService.getProfile({ token: t });
    },
    enabled: token !== null,
  });

  return { applicantInfoData };
};
