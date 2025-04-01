import { useQuery } from '@tanstack/react-query';

import { DownloadButtonWithPresignedUrl } from '@/components/button/DownloadButtonWithPresignedUrl';
import { LinkButton } from '@/components/button/LinkButton';
import { ThumbnailWithPresignedUrl } from '@/components/thumbnail/ThumbnailWithPresignedUrl';
import { Badge, TagStatus } from '@/components/ui/badge';
import { SeperatorLine } from '@/components/ui/separator';
import type { CoffeeChatStatus } from '@/entities/coffeeChat';
import { NoApplicantInfo } from '@/feature/applicant/ui/mypage/NoApplicantInfo';
import { SkeletonApplicantInfo } from '@/feature/applicant/ui/mypage/SkeletonApplicantInfo';
import type { Applicant } from '@/mocks/applicant/schemas';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { formatMinorJobToLabel } from '@/util/format';
import { getShortenedDate } from '@/util/postFormatFunctions';

export type ApplicantInfoProps = {
  applicantData?: Applicant;
  coffeeChatStatus?: CoffeeChatStatus;
  fetchOwnInfo?: boolean;
  // 생성 날짜 추가
  createdAt?: string;
  setIsExistProfile?: (input: boolean) => void;
};

export const ApplicantInfo = ({
  applicantData,
  coffeeChatStatus,
  fetchOwnInfo = true,
  createdAt,
  setIsExistProfile,
}: ApplicantInfoProps) => {
  const { applicantInfoData } = useApplicantInfo({
    fetchOwnInfo,
    setIsExistProfile,
  });

  if (fetchOwnInfo && applicantInfoData === undefined) {
    return <SkeletonApplicantInfo />;
  }

  if (fetchOwnInfo && applicantInfoData?.type === 'error') {
    if (applicantInfoData.code === 'APPLICANT_002') {
      return <NoApplicantInfo />;
    }
    return (
      <p>프로필 정보를 불러오는 데 실패했습니다. 잠시 후 새로고침해주세요.</p>
    );
  }

  const userData = fetchOwnInfo
    ? applicantInfoData?.type === 'success'
      ? applicantInfoData.data
      : undefined
    : applicantData;

  if (userData == null) {
    return <SkeletonApplicantInfo />;
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
  } = userData;

  const formattedPositions = positions?.map((position) =>
    formatMinorJobToLabel(position),
  );

  return (
    <div className="flex flex-col gap-[24px]">
      <section className="flex gap-4">
        <div className="flex w-full justify-between">
          <div className="flex gap-[16px]">
            {imageKey !== undefined ? (
              <ThumbnailWithPresignedUrl
                s3Key={imageKey}
                type="USER_THUMBNAIL"
              />
            ) : (
              <div className="h-[80px] w-[80px] bg-grey-200"></div>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-30 font-bold">{name}</p>
              <span className="font-regular">{`${department} ${enrollYear}학번`}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {createdAt != null && (
              <span className="text-sm text-grey-300">
                {getShortenedDate(createdAt)}
              </span>
            )}
            {coffeeChatStatus !== undefined && (
              <TagStatus coffeeChatStatus={coffeeChatStatus} />
            )}
          </div>
        </div>
      </section>

      {slogan != null && (
        <section>
          <p>{slogan}</p>
        </section>
      )}

      <SeperatorLine />

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
          <div className="flex gap-4">
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

      <SeperatorLine />

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
    </div>
  );
};

const useApplicantInfo = ({
  fetchOwnInfo = true,
  setIsExistProfile,
}: {
  fetchOwnInfo: boolean;
  setIsExistProfile?: (input: boolean) => void;
}) => {
  const { token } = useGuardContext(TokenContext);
  const { applicantService } = useGuardContext(ServiceContext);
  const { data: applicantInfoData } = useQuery({
    queryKey: ['applicantService', 'getProfile', token] as const,
    queryFn: async ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      const response = await applicantService.getProfile({ token: t });
      if (setIsExistProfile !== undefined && response.type === 'success') {
        setIsExistProfile(true);
      }
      return response;
    },
    enabled: fetchOwnInfo && token !== null,
  });

  return { applicantInfoData };
};
