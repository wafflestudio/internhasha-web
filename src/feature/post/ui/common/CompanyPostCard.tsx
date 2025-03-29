import { Badge } from '@/components/ui/badge';
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
  const { id, positionTitle, employmentEndDate, detail100, createdAt } = post;

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
          {employmentEndDate === null
            ? '상시 채용'
            : getEmploymentStatus(employmentEndDate)}
        </span>
        {/* 삼각형 */}
        <div className="absolute bottom-[-10px] right-6 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-grey-200 text-lg"></div>
      </div>

      <section className="flex flex-col gap-4 px-[22px] py-[18px]">
        <div className="min-h-[62px] w-full text-grey-700">{detail100}</div>

        {/* 신청된 커피챗 개수 및 작성 날짜 */}
        <div className="flex w-full justify-between gap-3 py-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">커피챗 몇개 신청</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{formatIsoToDate(createdAt)}</Badge>
          </div>
        </div>
      </section>
    </div>
  );
};
