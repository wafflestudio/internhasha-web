import { useQuery } from '@tanstack/react-query';

import { DownloadButtonWithPresignedUrl } from '@/components/button/DownloadButtonWithPresignedUrl';
import { SmallLinkButton } from '@/components/button/LinkButton';
import { ThumbnailWithPresignedUrl } from '@/components/thumbnail/ThumbnailWithPresignedUrl';
import { Badge } from '@/components/ui/badge';
import { SeperatorLine } from '@/components/ui/separator';
import { TextareaPreview } from '@/components/ui/TextareaPreview';
import { ICON_SRC } from '@/entities/asset';
import { NoApplicantInfo } from '@/feature/applicant/ui/mypage/NoApplicantInfo';
import { SkeletonApplicantInfo } from '@/feature/applicant/ui/mypage/SkeletonApplicantInfo';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const ApplicantProfileInfo = ({
  setIsExistProfile,
}: {
  setIsExistProfile(input: boolean): void;
}) => {
  const { applicantInfoData } = useApplicantInfo({ setIsExistProfile });

  if (applicantInfoData === undefined) {
    return <SkeletonApplicantInfo />;
  }

  if (applicantInfoData.type === 'error') {
    if (applicantInfoData.code === 'APPLICANT_002') {
      return <NoApplicantInfo />;
    }
    return (
      <p>프로필 정보를 불러오는 데 실패했습니다. 잠시 후 새로고침해주세요.</p>
    );
  }

  const {
    name,
    email,
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

  const departmentList = department.split(',');
  const formattedDepartment = departmentList
    .map((item, idx) => {
      if (idx !== 0) {
        return `${item}(복수전공)`;
      }
      return item;
    })
    .join(' ∙ ');
  const formattedEnrollYear = String(enrollYear).slice(2);

  return (
    <div className="flex flex-col gap-[28px]">
      <section className="flex gap-[16px]">
        {imageKey !== undefined ? (
          <ThumbnailWithPresignedUrl s3Key={imageKey} type="USER_THUMBNAIL" />
        ) : (
          <img
            src={ICON_SRC.FAVICON.BLUE}
            className="h-[80px] w-[80px] rounded-lg"
          />
        )}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-26 font-bold">{name}</span>
            <span className="text-grey-500">{email}</span>
          </div>
          <span className="font-regular">{`${formattedDepartment} ${formattedEnrollYear}학번`}</span>
        </div>
      </section>

      {slogan != null && (
        <section>
          <p>{slogan}</p>
        </section>
      )}

      {((positions !== undefined && positions.length !== 0) ||
        (stacks !== undefined && stacks.length !== 0) ||
        explanation !== undefined ||
        cvKey !== undefined ||
        portfolioKey !== undefined) && (
        <>
          <SeperatorLine />
          <section className="flex flex-col gap-[26px]">
            <h3 className="text-22 font-bold">기본 정보</h3>
            <div className="flex flex-col gap-[36px]">
              {positions !== undefined && positions.length !== 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-16 font-bold text-grey-800">
                    희망 직무
                  </span>
                  <p className="font-regular">{positions.join(' ∙ ')}</p>
                </div>
              )}

              {stacks !== undefined && stacks.length !== 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-16 font-bold text-grey-800">
                    기술 스택
                  </span>
                  <div className="flex gap-[6px]">
                    {stacks.map((stack) => (
                      <Badge variant="outline" key={`stack-${stack}`}>
                        {stack}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {explanation !== undefined && (
                <div className="flex flex-col gap-2">
                  <span className="text-16 font-bold text-grey-800">
                    자기소개
                  </span>
                  <TextareaPreview
                    content={explanation}
                    className="font-regular"
                  />
                </div>
              )}

              {cvKey !== undefined && (
                <div className="flex flex-col gap-2">
                  <span className="text-16 font-bold text-grey-800">
                    이력서
                  </span>
                  <DownloadButtonWithPresignedUrl s3Key={cvKey} type="CV">
                    <img src={ICON_SRC.DOWNLOAD} className="h-5 w-5" />
                    PDF 다운로드
                  </DownloadButtonWithPresignedUrl>
                </div>
              )}
              {portfolioKey !== undefined && (
                <div className="flex flex-col gap-2">
                  <span className="text-16 font-bold text-grey-800">
                    포트폴리오
                  </span>
                  <DownloadButtonWithPresignedUrl
                    s3Key={portfolioKey}
                    type="PORTFOLIO"
                  >
                    <img src={ICON_SRC.DOWNLOAD} className="h-5 w-5" />
                    PDF 다운로드
                  </DownloadButtonWithPresignedUrl>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {links !== undefined && links.length !== 0 && (
        <section className="flex flex-col gap-[26px]">
          <h3 className="text-22 font-bold">기타 정보</h3>
          <div className="flex flex-col gap-2">
            {links.map((linkWithDescription) => (
              <div
                key={`external-link-${linkWithDescription.description}`}
                className="flex items-center gap-[10px]"
              >
                <span>{linkWithDescription.description}</span>
                <SmallLinkButton link={linkWithDescription.link} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const useApplicantInfo = ({
  setIsExistProfile,
}: {
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
    enabled: token !== null,
  });

  return { applicantInfoData };
};
