import { useQuery } from '@tanstack/react-query';

import { DownloadButtonWithPresignedUrl } from '@/components/button/DownloadButtonWithPresignedUrl';
import { LinkButton } from '@/components/button/LinkButton';
import { ThumbnailWithPresignedUrl } from '@/components/thumbnail/ThumbnailWithPresignedUrl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SkeletonApplicantInfo } from '@/feature/applicant/ui/mypage/SkeletonApplicantInfo';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { formatMinorJobToLabel } from '@/util/format';

export const ApplicantInfo = () => {
  const { applicantInfoData } = useApplicantInfo();

  if (applicantInfoData === undefined) {
    return <SkeletonApplicantInfo />;
  }

  if (applicantInfoData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

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
  } = applicantInfoData.data;

  const formattedPositions = positions?.map((position) =>
    formatMinorJobToLabel(position),
  );

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white px-[24px] py-[48px] text-grey-900">
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

      <div className="flex gap-2">
        {/* 정보 수정 버튼 */}
        <Button variant="outline" className="flex-1">
          정보 수정하기
        </Button>

        {/* 회원 탈퇴 버튼 */}
        <Button variant="destructive" className="flex-1">
          회원 탈퇴하기
        </Button>
      </div>
    </div>
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
