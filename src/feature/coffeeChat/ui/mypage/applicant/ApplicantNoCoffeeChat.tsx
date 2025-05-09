import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const ApplicantNoCoffeeChat = () => {
  const { toMain } = useRouteNavigation();

  const handleButtonClick = () => {
    toMain({});
  };

  return (
    <div className="flex flex-col items-center gap-8 rounded-lg bg-white px-6 py-6 text-grey-900 sm:px-[44px] sm:py-[48px]">
      <div className="flex flex-col items-center gap-1 sm:flex-row">
        <div className="w-full max-w-[220px]">
          <img src={ICON_SRC.SKELETON} className="object-cover" />
        </div>
        <div className="flex w-full max-w-[289px] flex-col gap-[10px] text-center">
          <h2 className="whitespace-pre-wrap text-22 font-bold">
            아직 커피챗을 신청하지 않았어요!
          </h2>
          <div>
            <p>원하는 기업에 커피챗을 신청해봐요.</p>
          </div>
        </div>
      </div>
      <Button onClick={handleButtonClick} className="w-full max-w-[310px]">
        채용 공고 확인하기
      </Button>
    </div>
  );
};
