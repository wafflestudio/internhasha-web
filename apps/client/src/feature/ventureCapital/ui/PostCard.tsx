import { Badge, SeriesBadge } from '@/components/ui/badge';
import { ICON_SRC } from '@/entities/asset';
import type { BriefPost } from '@/entities/post';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { getEmploymentStatus } from '@/util/postFormatFunctions';

type PostCardProps = {
  post: BriefPost;
  onDetailClick(postId: string): void;
};

export const PostCard = ({ post, onDetailClick }: PostCardProps) => {
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
      className="border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md cursor-pointer transition-shadow"
      onClick={() => {
        onDetailClick(id);
      }}
    >
      {/* 직군 & 마감일 */}
      <div className="flex h-[50px] relative justify-between items-center rounded-t-lg px-[22px] bg-gray-200">
        <div className="flex items-center gap-2">
          <img src={ICON_SRC.PERSON} className="w-6 h-6" />
          <span className="text-grey-darker">{title}</span>
        </div>

        <span className="text-grey-normal-hover">
          {employmentEndDate === null
            ? '상시 채용'
            : getEmploymentStatus(employmentEndDate)}
        </span>
        {/* 삼각형 */}
        <div
          className="absolute text-lg bottom-[-8px] right-6
                  w-0 h-0 border-l-[10px] border-l-transparent
                  border-r-[10px] border-r-transparent
                  border-t-[10px] border-t-gray-200"
        ></div>
      </div>

      <section className="flex flex-col gap-4 px-[22px] py-[18px]">
        {/* 회사 정보 */}
        <div className="flex items-center gap-[14px]">
          {/* 회사 이미지 */}
          <div className="w-[40px] h-[40px] rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={`${API_BASE_URL}/${imageLink}`}
              alt={companyName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-grey-darker">
              {companyName}
            </h3>
            <span className="text-sm text-grey-normal">{author.name} 추천</span>
          </div>
        </div>

        <div className="w-full min-h-[62px] text-grey-dark-hover">{slogan}</div>

        {/* 시리즈 및 투자 정보 */}
        <div className="flex w-full justify-between py-1 gap-3">
          <div className="flex items-center gap-2">
            <SeriesBadge series={series} />
            <Badge variant="secondary">
              투자 누적 {investAmount.toLocaleString()}억
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
};
