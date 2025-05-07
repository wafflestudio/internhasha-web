import { DownloadButtonWithPresignedUrl } from '@/components/button/DownloadButtonWithPresignedUrl';
import { SmallLinkButton } from '@/components/button/LinkButton';
import { ThumbnailWithPresignedUrl } from '@/components/thumbnail/ThumbnailWithPresignedUrl';
import { Badge } from '@/components/ui/badge';
import { SeperatorLine } from '@/components/ui/separator';
import { ICON_SRC } from '@/entities/asset';
import type { Link } from '@/entities/link';
import type { UserRole } from '@/entities/user';

export const ApplicantInfoForCoffeeChat = ({
  applicant,
}: {
  applicant: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    userRole: UserRole;
    email?: string;
    enrollYear: number;
    department: string;
    positions?: string[];
    slogan?: string;
    explanation?: string;
    stacks?: string[];
    imageKey?: string;
    cvKey?: string;
    portfolioKey?: string;
    links?: Link[];
  };
}) => {
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
  } = applicant;

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

            {email !== undefined ? (
              <span className="text-grey-500">{email}</span>
            ) : (
              <span className="text-13 text-grey-500">
                커피챗을 성사시키면 연락처를 확인할 수 있습니다.
              </span>
            )}
          </div>
          <span className="font-regular">{`${formattedDepartment} ${formattedEnrollYear}학번`}</span>
        </div>
      </section>

      {slogan != null && (
        <section>
          <p className="font-regular">{slogan}</p>
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
                  <p className="font-regular">{explanation}</p>
                </div>
              )}

              {cvKey !== undefined && (
                <div className="flex flex-col gap-2">
                  <span className="text-16 font-bold text-grey-800">
                    이력서
                  </span>
                  <DownloadButtonWithPresignedUrl
                    s3Key={cvKey}
                    type="CV"
                    fileName={`${name}_이력서.pdf`}
                  >
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
                    fileName={`${name}_포트폴리오.pdf`}
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
        <>
          <SeperatorLine />
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
        </>
      )}
      <SeperatorLine />
    </div>
  );
};
