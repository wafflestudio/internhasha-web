import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const NoCreatedPosts = ({ companyId }: { companyId: string }) => {
  const { toCreatePost } = useRouteNavigation();

  const handleButtonClick = () => {
    toCreatePost({ companyId });
  };

  return (
    <div className="flex flex-col items-center gap-8 rounded-lg bg-white px-6 py-6 text-grey-900 sm:px-[44px] sm:py-[48px]">
      <div className="flex flex-col items-center gap-1 sm:flex-row">
        <div className="w-full max-w-[220px]">
          <img src={ICON_SRC.SKELETON} className="object-cover" />
        </div>
        <div className="flex w-full max-w-[289px] flex-col gap-[10px] text-center">
          <h2 className="whitespace-pre-wrap text-22 font-bold">
            아직 작성된 공고가 없어요!
          </h2>
          <div>
            <p>공고를 작성하면 커피챗 신청을 받을 수 있어요.</p>
          </div>
        </div>
      </div>
      <Button onClick={handleButtonClick} className="w-full max-w-[310px]">
        인턴 공고 작성하기
      </Button>
    </div>
  );
};
