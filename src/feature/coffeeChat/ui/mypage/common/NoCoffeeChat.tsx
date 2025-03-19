import { Button } from '@/components/ui/button';
import { useGuardContext } from '@/shared/context/hooks';
import { RoleContext } from '@/shared/context/RoleContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const NoCoffeeChat = () => {
  const { toMain } = useRouteNavigation();
  const { role } = useGuardContext(RoleContext);

  const handleButtonClick = () => {
    toMain();
  };

  const isCompany = role === 'COMPANY';

  return (
    <div className="flex h-[300px] flex-col items-center justify-around rounded-xl bg-white px-6 py-12">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-22 font-regular text-grey-900">
          {isCompany
            ? '아직 신청된 커피챗이 존재하지 않습니다.'
            : '아직 커피챗을 신청하지 않았어요!'}
        </h2>
        <p className="text-13 font-regular text-grey-700">
          {isCompany
            ? '커피챗 신청이 오면 이메일로 알림을 전송해드려요!'
            : '원하는 기업에 커피챗을 신청해봐요.'}
        </p>
      </div>
      {!isCompany && (
        <Button onClick={handleButtonClick} className="w-[310px]">
          채용 공고 확인하기
        </Button>
      )}
    </div>
  );
};
