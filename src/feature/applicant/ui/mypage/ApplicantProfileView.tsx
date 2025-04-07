import { Button } from '@/components/ui/button';
import { ApplicantProfileInfo } from '@/feature/applicant/ui/mypage/ApplicantProfileInfo';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const ApplicantProfileView = ({
  setIsExistProfile,
}: {
  setIsExistProfile(input: boolean): void;
}) => {
  const { toChangePassword } = useRouteNavigation();
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-[700px] flex-col gap-12 rounded-lg bg-white px-[24px] py-[48px] text-grey-900">
        <ApplicantProfileInfo setIsExistProfile={setIsExistProfile} />
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1">
            회원 탈퇴
          </Button>
          <Button className="flex-1" onClick={toChangePassword}>
            비밀번호 수정
          </Button>
        </div>
      </div>
    </div>
  );
};
