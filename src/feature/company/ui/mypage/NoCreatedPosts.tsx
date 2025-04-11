import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const NoCreatedPosts = ({ companyId }: { companyId: string }) => {
  const { toCreatePost } = useRouteNavigation();

  const handleButtonClick = () => {
    toCreatePost({ companyId });
  };

  return (
    <div className="flex flex-col items-center gap-6 gap-8 rounded-lg bg-white px-[44px] py-[48px] text-grey-900">
      <div className="flex items-center gap-1">
        <div className="w-[220px]">
          <img src={ICON_SRC.SKELETON} className="object-fit" />
        </div>
        <div className="flex w-[289px] flex-col gap-[10px] text-center">
          <h2 className="text-22 font-bold">아직 작성된 공고가 없어요!</h2>
          <p>공고를 작성하면 커피챗 신청을 받을 수 있어요.</p>
        </div>
      </div>
      <Button onClick={handleButtonClick} className="w-[310px]">
        인턴 공고 작성하기
      </Button>
    </div>
  );
};
