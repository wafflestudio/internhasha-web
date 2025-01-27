import { ICON_SRC } from '@/entities/asset';
import type { BriefPost } from '@/entities/post';
import { useGuardContext } from '@/shared/context/hooks';
import { TokenContext } from '@/shared/context/TokenContext';

type PostCardProps = {
  post: BriefPost;
  onDetailClick: (postId: string) => void;
};

export const PostCard = ({ post, onDetailClick }: PostCardProps) => {
  const { token } = useGuardContext(TokenContext);
  const onClickAddBookmark = ({ postId }: { postId: string }) => {
    if (token === null) {
      // TODO: 로그인 유도 모달 띄우기
      return;
    }
  };
  const onClickDeleteBookmark = ({ postId }: { postId: string }) => {
    if (token === null) {
      // TODO: 로그인 유도 모달 띄우기
      return;
    }
  };
  const {
    id,
    companyName,
    slogan,
    title,
    series,
    isActive,
    imageLink,
    investAmount,
    employmentEndDate,
    isBookmarked,
  } = post;

  return (
    <div
      className="border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md cursor-pointer transition-shadow"
      onClick={() => {
        onDetailClick(id);
      }}
    >
      {/* 직군 & 마감일 */}
      <div className="flex relative justify-between items-center rounded-t-lg pl-5 pr-5 p-3 bg-gray-200">
        <div className="flex items-center gap-2">
          <img src={ICON_SRC.PERSON} className="w-6 h-6" />
          <span className="text-lg text-gray-600">{title}</span>
        </div>

        <span className="text-grey-normal-hover">
          {employmentEndDate === undefined
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
              src={imageLink}
              alt={companyName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {companyName}
            </h3>
          </div>
        </div>

        <div className="w-full min-h-[62px] text-grey-dark-hover">{slogan}</div>

        {/* 시리즈 및 투자 정보 */}
        <div className="flex w-full justify-between py-1 mt-[30px]">
          <div className="flex items-center gap-2">
            {/* TODO: 삼항 연산자 variant로 정리 */}
            <span
              className={`px-2 py-1 text-sm rounded ${
                series === 'PRE_A' || series === 'A'
                  ? 'bg-blue-100 text-blue-900'
                  : series === 'B'
                    ? 'bg-red-100 text-red-900'
                    : series === 'C'
                      ? 'bg-green-100 text-green-900'
                      : series === 'D'
                        ? 'bg-yellow-100 text-yellow-900'
                        : 'bg-gray-100 text-gray-800'
              }`}
            >
              {series === 'PRE_A'
                ? 'Pre-Series A'
                : series.length === 1
                  ? `Series ${series}`
                  : 'Seed'}
            </span>
            {investAmount != null && (
              <span className="px-2 py-1 bg-gray-200 text-xs rounded">
                투자 누적 {investAmount.toLocaleString()}억
              </span>
            )}
            {isActive && (
              <span className="px-2 py-1 bg-gray-200 text-xs rounded">
                추천
              </span>
            )}
          </div>
          <div>
            {isBookmarked ? (
              <button
                onClick={() => {
                  onClickDeleteBookmark({ postId: id });
                }}
              >
                <img
                  src={ICON_SRC.BOOKMARK.SELECTED}
                  className="w-[30px] h-[30px]"
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClickAddBookmark({ postId: id });
                }}
              >
                <img
                  src={ICON_SRC.BOOKMARK.UNSELECTED}
                  className="w-[30px] h-[30px]"
                />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const getEmploymentStatus = (employmentEndDate: string): string => {
  if (employmentEndDate === '') return '상시';

  const daysLeft = Math.ceil(
    (new Date(employmentEndDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return daysLeft >= 0 ? `D-${daysLeft}` : '마감';
};
