import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { CancelCoffeeChatDeleteModal } from '@/components/modal/CancelCoffeeChatDeleteModal';
import { Button } from '@/components/ui/button';
import { SkeletonCoffeeChatDetailView } from '@/feature/coffeeChat/ui/SkeletonCoffeeChatDetailView';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getFormatDate } from '@/util/postFormatFunctions';

export const CoffeeChatDetailView = ({
  coffeeChatId,
}: {
  coffeeChatId: string;
}) => {
  const { coffeeChatDetailData } = useGetCoffeeChatDetail({ coffeeChatId });
  const { API_BASE_URL } = useGuardContext(EnvContext);
  const { toMyPage } = useRouteNavigation();
  const [isCancel, setIsCancel] = useState(false);

  if (coffeeChatDetailData === undefined) {
    return <SkeletonCoffeeChatDetailView />;
  }

  if (coffeeChatDetailData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const coffeeChatDetail = coffeeChatDetailData.data;

  return (
    <>
      <div className="flex w-full py-10 bg-gray-50">
        {/* Left Section */}
        <div className="xs:w-3/5 w-11/12 mx-auto bg-white rounded-lg p-8 space-y-6">
          <div>
            <span className="text-black text-3xl font-bold content-center text-center">
              커피챗 신청서
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-gray-200 pb-5">
            {/* Profile Section */}
            <div className="flex gap-4 items-center">
              <div className="w-[40px] h-[40px] overflow-hidden">
                {coffeeChatDetail.author.profileImageLink != null ? (
                  <img
                    src={`${API_BASE_URL}/${coffeeChatDetail.author.profileImageLink}`}
                    alt="프로필 이미지"
                    className="w-[40px] h-[40px] object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-[40px] h-[40px] object-cover border border-gray-200"></div>
                )}
              </div>
              <div>
                <p className="text-gray-900 text-lg font-semibold align-center">
                  {coffeeChatDetail.companyName}
                </p>
              </div>
            </div>
            <div className="flex gap-[8px]">
              <span className="text-gray-400 text-lg font-semibold my-auto">
                {getFormatDate(coffeeChatDetail.createdAt)}
              </span>
              <p className="px-[8px] py-[4px] rounded bg-gray-200 text-gray-900 text-[13px]">
                대기
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="gap-[80px] flex flex-col">
            <div className="py-6 space-y-5">
              <p className="text-gray-700 text-sm">
                {coffeeChatDetail.content}
              </p>
            </div>
            <div className="flex gap-[8px]">
              <Button
                variant="secondary"
                onClick={toMyPage}
                className="w-full mt-20"
              >
                목록으로
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsCancel(true);
                }}
                className="w-full mt-20"
              >
                취소하기
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isCancel && (
        <CancelCoffeeChatDeleteModal
          onClose={() => {
            setIsCancel(false);
          }}
          onCancel={() => {
            setIsCancel(false);
          }}
        />
      )}
    </>
  );
};

const useGetCoffeeChatDetail = ({ coffeeChatId }: { coffeeChatId: string }) => {
  const { token } = useGuardContext(TokenContext);
  const { coffeeChatService } = useGuardContext(ServiceContext);

  const { data: coffeeChatDetailData } = useQuery({
    queryKey: ['user', 'coffeeChat', coffeeChatId, token] as const,
    queryFn: ({ queryKey: [, , , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.getCoffeeChatDetail({
        token: t,
        coffeeChatId: coffeeChatId,
      });
    },
    enabled: token !== null,
  });

  return { coffeeChatDetailData: coffeeChatDetailData };
};
