import { Button } from '@/components/ui/button';
import { CompanyProfileInfo } from '@/feature/company/ui/mypage/CompanyProfileInfo';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const CompanyProfileView = ({
  setIsExistProfile,
}: {
  setIsExistProfile(input: boolean): void;
}) => {
  const { toChangePassword } = useRouteNavigation();
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col gap-[30px] rounded-[8px] bg-white px-[30px] py-[36px] text-grey-900">
        <CompanyProfileInfo setIsExistProfile={setIsExistProfile} />
        <Button className="flex-1" onClick={toChangePassword}>
          비밀번호 수정
        </Button>
      </div>
    </div>
  );
};
