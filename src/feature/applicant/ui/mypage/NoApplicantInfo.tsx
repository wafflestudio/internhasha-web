import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const NoApplicantInfo = () => {
  const { toCreateProfile } = useRouteNavigation();

  const handleButtonClick = () => {
    toCreateProfile({});
  };

  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-lg bg-white px-[44px] py-[48px] text-grey-900">
      <div className="flex items-center gap-1">
        <div className="w-[220px]">
          <img src={ICON_SRC.SKELETON} className="object-fit" />
        </div>
        <div className="flex w-[289px] flex-col gap-[10px] text-center">
          <h2 className="text-22 font-bold">아직 작성된 정보가 없어요!</h2>
          <div>
            <p>프로필을 작성하면</p>
            <p>기업에 나를 더 자세히 소개할 수 있어요.</p>
          </div>
        </div>
      </div>
      <Button onClick={handleButtonClick} className="w-[310px]">
        지금 바로 프로필 작성하기
      </Button>
    </div>
  );
};
