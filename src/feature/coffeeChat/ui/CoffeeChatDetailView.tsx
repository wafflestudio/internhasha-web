import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import type { CancelCoffeeChatRequest } from '@/api/apis/localServer/schemas';
import { CancelCoffeeChatCancelModal } from '@/components/modal/CancelCoffeeChatCancelModal';
import { FormErrorResponse } from '@/components/response/formResponse';
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
  const [responseMessage, setResponseMessage] = useState('');
  const { toMyPage } = useRouteNavigation();
  const [isCancel, setIsCancel] = useState(false);
  const { cancelCoffeeChat, isPending } = useCancelCoffeeChat({
    setResponseMessage,
  });

  const handleCancel = () => {
    cancelCoffeeChat({
      coffeeChatId: coffeeChatId,
      body: { coffeeChatStatus: 'CANCELED' },
    });
  };

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
                {coffeeChatDetail.company.imageKey !== '' ? (
                  <img
                    src={`${API_BASE_URL}/${coffeeChatDetail.company.imageKey}`}
                    alt="프로필 이미지"
                    className="w-[40px] h-[40px] object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-[40px] h-[40px] object-cover border border-gray-200"></div>
                )}
              </div>
              <div>
                <p className="text-gray-900 text-lg font-semibold align-center">
                  {coffeeChatDetail.company.name}
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
                disabled={isPending}
              >
                목록으로
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsCancel(true);
                }}
                className="w-full mt-20"
                disabled={isPending}
              >
                취소하기
              </Button>
            </div>
          </div>
        </div>
      </div>
      {responseMessage !== '' && (
        <FormErrorResponse>{responseMessage}</FormErrorResponse>
      )}
      {isCancel && (
        <CancelCoffeeChatCancelModal
          onClose={() => {
            setIsCancel(false);
          }}
          onCancel={() => {
            handleCancel();
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

const useCancelCoffeeChat = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { coffeeChatService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { toCoffeeChatList } = useRouteNavigation();
  const queryClient = useQueryClient();

  const { mutate: cancelCoffeeChat, isPending } = useMutation({
    mutationFn: ({
      coffeeChatId,
      body,
    }: {
      coffeeChatId: string;
      body: CancelCoffeeChatRequest;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.cancelCoffeeChat({
        token,
        coffeeChatId,
        body,
      });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
        toCoffeeChatList();
      } else {
        setResponseMessage(response.code);
      }
    },
    onError: () => {
      setResponseMessage('취소에 실패했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });
  return {
    cancelCoffeeChat,
    isPending,
  };
};
