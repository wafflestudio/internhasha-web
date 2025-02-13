import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const MyPage = () => {
  const { myInfoData } = useMyInfo();

  // if (myInfoData === undefined) {
  //   return <div>로딩중...</div>;
  // }

  if (myInfoData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  // const { name, snuMail, phoneNumber } = myInfoData.data;

  return (
    <div className="w-full flex flex-col gap-4">
      <Card>
        {myInfoData !== undefined ? (
          <CardContent className="flex flex-col p-4 gap-2">
            <p className="p-2 border-b-[1px]">이름: {myInfoData.data.name}</p>
            <p className="p-2 border-b-[1px]">
              스누메일: {myInfoData.data.snuMail}
            </p>
            <p className="p-2 border-b-[1px]">
              전화번호: {myInfoData.data.phoneNumber}
            </p>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col p-4 gap-2">
            <p className="p-2 border-b-[1px]">
              <Skeleton className="w-full h-6" />
            </p>
            <p className="p-2 border-b-[1px]">
              <Skeleton className="w-full h-6" />
            </p>
            <p className="p-2 border-b-[1px]">
              <Skeleton className="w-full h-6" />
            </p>
          </CardContent>
        )}
      </Card>

      <div className="flex gap-2">
        {/* 정보 수정 버튼 */}
        <Button variant="outline" className="flex-1">
          정보 수정하기
        </Button>

        {/* 회원 탈퇴 버튼 */}
        <Button variant="destructive" className="flex-1">
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
