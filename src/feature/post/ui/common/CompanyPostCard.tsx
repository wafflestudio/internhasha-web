import { Badge, SeriesBadge } from '@/components/ui/badge';
import { ICON_SRC } from '@/entities/asset';
import type { BriefPost } from '@/entities/post';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { getEmploymentStatus } from '@/util/postFormatFunctions';

type CompanyPostCardProps = {
  post: BriefPost;
  onDetailClick(postId: string): void;
};

export const CompanyPostCard = ({
  post,
  onDetailClick,
}: CompanyPostCardProps) => {
  const { API_BASE_URL } = useGuardContext(EnvContext);

  const {
    id,
    author,
    companyName,
    slogan,
    title,
    series,
    imageLink,
    investAmount,
    employmentEndDate,
  } = post;

  return (
    <div
      className="cursor-pointer rounded-lg bg-white transition-shadow hover:shadow-md"
      onClick={() => {
        onDetailClick(id);
      }}
    >
      {/* 직군 & 마감일 */}
      <div className="relative flex h-[50px] items-center justify-between rounded-t-lg bg-grey-200 px-[22px]">
        <div className="flex items-center gap-2">
          <img src={ICON_SRC.PERSON} className="h-6 w-6" />
          <span className="text-grey-900">{title}</span>
        </div>

        <span className="text-grey-400">
          {employmentEndDate === null
            ? '상시 채용'
            : getEmploymentStatus(employmentEndDate)}
        </span>
        {/* 삼각형 */}
        <div className="absolute bottom-[-10px] right-6 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-grey-200 text-lg"></div>
      </div>

      <section className="flex flex-col gap-4 px-[22px] py-[18px]">
        {/* 회사 정보 */}
        <div className="flex items-center gap-[14px]">
          {/* 회사 이미지 */}
          <div className="h-[40px] w-[40px] overflow-hidden rounded-lg bg-grey-200">
            <img
              src={`${API_BASE_URL}/${imageLink}`}
              alt={companyName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-grey-900">
              {companyName}
            </h3>
            <span className="text-sm text-grey-300">{author.name} 추천</span>
          </div>
        </div>

        <div className="min-h-[62px] w-full text-grey-700">{slogan}</div>

        {/* 시리즈 및 투자 정보 */}
        <div className="flex w-full justify-between gap-3 py-1">
          <div className="flex items-center gap-2">
            <SeriesBadge series={series} />
            <Badge variant="secondary">
              투자 누적 {investAmount.toLocaleString()}천만원
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
};
