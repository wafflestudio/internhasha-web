import { useQuery } from '@tanstack/react-query';

import { Card, CardContent } from '@/components/card/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const MyInfo = () => {
  const { myInfoData } = useMyInfo();

  if (myInfoData === undefined) {
    return <div>로딩중...</div>;
  }

  if (myInfoData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const { name, snuMail, phoneNumber } = myInfoData.data;

  return (
    <div className="space-y-6 w-3/5">
      <Card>
        <CardContent className="p-4 space-y-4">
          <p className="text-xl p-4 border-b-2">이름: {name}</p>
          <p className="text-xl p-4 border-b-2">메일: {snuMail}</p>
          <p className="text-xl p-4 border-b-2">전화번호: {phoneNumber}</p>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        {/* 정보 수정 버튼 */}
        <Button variant="outline" className="w-full">
          정보 수정하기
        </Button>

        {/* 회원 탈퇴 버튼 */}
        <Button variant="destructive" className="w-full">
          회원 탈퇴하기
        </Button>
      </div>
    </div>
  );
};

const useMyInfo = () => {
  const { token } = useGuardContext(TokenContext);
  const { userService } = useGuardContext(ServiceContext);
  const { data: myInfoData } = useQuery({
    queryKey: ['userService', 'getMyInfo', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return userService.getMyInfo({ token: t });
    },
    enabled: token !== null,
  });

  return { myInfoData };
};
