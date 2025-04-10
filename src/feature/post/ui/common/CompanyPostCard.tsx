import { ICON_SRC } from '@/entities/asset';
import type { BriefPost } from '@/entities/post';
import { formatIsoToDate } from '@/util/format';
import { getEmploymentStatus } from '@/util/postFormatFunctions';

type CompanyPostCardProps = {
  post: BriefPost;
  onDetailClick(postId: string): void;
};

export const CompanyPostCard = ({
  post,
  onDetailClick,
}: CompanyPostCardProps) => {
  const {
    id,
    positionTitle,
    employmentEndDate,
    detail100,
    createdAt,
    coffeeChatCount,
    isActive,
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
          <span className="text-grey-900">{positionTitle}</span>
        </div>

        <span className="text-grey-400">
          {!isActive
            ? '모집 완료'
            : employmentEndDate === null
              ? '상시 채용'
              : getEmploymentStatus(employmentEndDate)}
        </span>
        {/* 삼각형 */}
        <div className="absolute bottom-[-10px] right-6 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-grey-200 text-lg"></div>
      </div>

      <section className="flex flex-col gap-4 px-[22px] py-[18px]">
        <div className="min-h-[62px] w-full text-grey-700">{detail100}</div>

        {/* 신청된 커피챗 개수 및 작성 날짜 */}
        <div className="flex w-full py-1">
          <div className="flex items-center gap-[8px]">
            <span className="text-13 font-semibold text-grey-800">
              커피챗 {coffeeChatCount}개 신청
            </span>
            <div className="h-[18px] w-[1px] bg-grey-200" />
            <span className="text-13 font-regular text-grey-800">
              {formatIsoToDate(createdAt)}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
