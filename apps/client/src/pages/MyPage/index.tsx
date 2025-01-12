import { useQuery } from '@tanstack/react-query';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const MyPage = () => {
  const { myInfoData } = useMyInfo();

  if (myInfoData === undefined) {
    return <div>로딩중...</div>;
  }

  if (myInfoData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const { username, snuMail, phoneNumber } = myInfoData.data;
  return (
    <div>
      <p>마이 페이지입니다.</p>
      <p>이름: {username}</p>
      <p>메일: {snuMail}</p>
      {phoneNumber !== undefined && <p>전화번호: {phoneNumber}</p>}
    </div>
  );
};

const useMyInfo = () => {
  const { token } = useGuardContext(TokenContext);
  const { userService } = useGuardContext(ServiceContext);
  const { data: myInfoData } = useQuery({
    queryKey: ['user', 'info', token] as const,
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
