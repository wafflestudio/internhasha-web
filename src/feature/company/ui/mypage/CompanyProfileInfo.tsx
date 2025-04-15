import { useQuery } from '@tanstack/react-query';

import { DownloadButtonWithPresignedUrl } from '@/components/button/DownloadButtonWithPresignedUrl';
import { LinkButton, SmallLinkButton } from '@/components/button/LinkButton';
import { ThumbnailWithPresignedUrl } from '@/components/thumbnail/ThumbnailWithPresignedUrl';
import { Badge } from '@/components/ui/badge';
import { MarkdownPreview } from '@/components/ui/MarkdownPreview';
import { ICON_SRC } from '@/entities/asset';
import { NoCompanyProfile } from '@/feature/company/ui/mypage/NoCompanyProfile';
import { SkeletonCompanyProfile } from '@/feature/company/ui/mypage/SkeletonCompanyProfile';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { normalTextToEscape } from '@/util/escapeEncoder';
import { formatDomainToLabel } from '@/util/format';

export const CompanyProfileInfo = ({
  setIsExistProfile,
}: {
  setIsExistProfile(input: boolean): void;
}) => {
  const { myInfoData } = useMyInfo({ setIsExistProfile });

  if (myInfoData === undefined) {
    return <SkeletonCompanyProfile />;
  }

  if (myInfoData.type === 'error') {
    if (myInfoData.code === 'COMPANY_001') {
      return <NoCompanyProfile />;
    }
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const {
    companyName,
    companyEstablishedYear,
    domain,
    headcount,
    location,
    detail,
    profileImageKey,
    companyInfoPDFKey,
    landingPageLink,
    links,
    tags,
    vcName,
    vcRecommendation,
  } = myInfoData.data;

  return (
    <>
      <section>
        <div className="flex items-center gap-[18px]">
          <ThumbnailWithPresignedUrl
            s3Key={profileImageKey}
            type="COMPANY_THUMBNAIL"
          />
          <div className="flex flex-col gap-1">
            <p className="text-26 font-bold">{companyName}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-md bg-grey-50 px-[34px] py-[20px]">
        <div className="flex h-[30px] items-center gap-5">
          <div className="flex flex-1 gap-[10px]">
            <p className="w-[70px] font-semibold text-grey-400">업종</p>
            <p>{formatDomainToLabel(domain)}</p>
          </div>
          <div className="flex flex-1 gap-[10px]">
            <p className="w-[70px] font-semibold text-grey-400">구성 인원수</p>
            <p>{headcount}명</p>
          </div>
        </div>
        <div className="flex h-[30px] items-center gap-[10px]">
          <p className="w-[70px] font-semibold text-grey-400">설립</p>
          <p>{companyEstablishedYear}년</p>
        </div>
        <div className="flex h-[30px] items-center gap-[10px]">
          <p className="w-[70px] font-semibold text-grey-400">근무 위치</p>
          <div className="flex gap-1">
            <img src={ICON_SRC.LOCATION} className="h-5 w-5" />
            {location.replace('|', ' ')}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[34px]">
        {(landingPageLink !== undefined || companyInfoPDFKey !== undefined) && (
          <div className="flex gap-[50px]">
            {landingPageLink !== undefined && (
              <div className="flex items-center gap-4">
                <span className="text-16 font-bold">회사 홈페이지</span>

                <LinkButton link={landingPageLink}></LinkButton>
              </div>
            )}
            {companyInfoPDFKey !== undefined && (
              <div className="flex items-center gap-4">
                <span className="text-16 font-bold">회사 소개 자료</span>
                <DownloadButtonWithPresignedUrl
                  s3Key={companyInfoPDFKey}
                  type="IR_DECK"
                >
                  <img src={ICON_SRC.DOWNLOAD} className="h-5 w-5" />
                  PDF 다운로드
                </DownloadButtonWithPresignedUrl>
              </div>
            )}
          </div>
        )}
        {links !== undefined && (
          <div className="flex flex-col gap-3">
            <p className="text-16 font-bold text-grey-800">외부 링크</p>
            <div className="flex flex-col gap-[10px]">
              {links.map((item) => (
                <div
                  key={`external-link-${item.description}`}
                  className="flex items-center gap-[10px]"
                >
                  <span className="font-regular">{item.description}</span>
                  <SmallLinkButton link={item.link}></SmallLinkButton>
                </div>
              ))}
            </div>
          </div>
        )}
        {tags !== undefined && (
          <div className="flex flex-col gap-3">
            <p className="text-16 font-bold text-grey-800">태그</p>
            <div className="flex gap-[6px]">
              {tags.map((item) => (
                <Badge key={`tag-${item.tag}`} variant="outline">
                  {item.tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <p className="text-16 font-bold text-grey-800">상세 소개</p>
          <MarkdownPreview content={normalTextToEscape(detail)} />
        </div>
        {vcName !== undefined && vcRecommendation !== undefined && (
          <div className="flex flex-col gap-3">
            <p className="text-16 font-bold text-grey-800">
              {vcName} 추천 이유
            </p>
            <p className="font-regular text-grey-800">{vcRecommendation}</p>
          </div>
        )}
      </section>
    </>
  );
};

const useMyInfo = ({
  setIsExistProfile,
}: {
  setIsExistProfile(input: boolean): void;
}) => {
  const { token } = useGuardContext(TokenContext);
  const { companyService } = useGuardContext(ServiceContext);
  const { data: myInfoData } = useQuery({
    queryKey: ['companyService', 'getMyInfo', token] as const,
    queryFn: async ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      const response = await companyService.getMyInfo({ token: t });
      if (response.type === 'success') {
        setIsExistProfile(true);
      }
      return response;
    },
    enabled: token !== null,
  });

  return { myInfoData };
};
