import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { CoffeeChatStatus } from '@/api/apis/localServer/schemas';
import { CoffeeChatButton } from '@/components/button/CoffeeChatButton';
import { UpdateCoffeeChatStatusModal } from '@/components/modal/UpdateCoffeeChatStatusModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { TagStatus } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { ICON_SRC } from '@/entities/asset';
import { NoCoffeeChat } from '@/feature/coffeeChat/ui/mypage/common/NoCoffeeChat';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getShortenedDate } from '@/util/postFormatFunctions';

export const CompanyCoffeeChatListView = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const { updateCoffeeChatStatus, isPending } = useUpdateCoffeeChatStatus({
    setResponseMessage,
  });
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<'ACCEPTED' | 'REJECTED'>(
    'ACCEPTED',
  );

  const { coffeeChatListData } = useGetCoffeeChatList();
  const { toCoffeeChatDetail } = useRouteNavigation();

  if (coffeeChatListData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }
  if (
    coffeeChatListData !== undefined &&
    coffeeChatListData.data.coffeeChatList.length === 0
  ) {
    return <NoCoffeeChat />;
  }

  const handleSelectChat = (coffeeChatId: string) => {
    setSelectedChats((prev) =>
      prev.includes(coffeeChatId)
        ? prev.filter((id) => id !== coffeeChatId)
        : [...prev, coffeeChatId],
    );
  };

  const handleOpenModal = (status: 'ACCEPTED' | 'REJECTED') => {
    if (selectedChats.length === 0) {
      setResponseMessage('선택된 커피챗이 없습니다.');
      return;
    }
    setModalStatus(status);
    setIsModalOpen(true);
  };

  const handleConfirm = (status: CoffeeChatStatus) => {
    updateCoffeeChatStatus({
      coffeeChatList: selectedChats,
      coffeeChatStatus: status,
    });
    setSelectedChats([]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="mb-[18px] flex justify-end gap-[18px]">
        <CoffeeChatButton
          variant="accept"
          onClick={() => {
            handleOpenModal('ACCEPTED');
          }}
          disabled={isPending}
        >
          모두 성사
        </CoffeeChatButton>
        <CoffeeChatButton
          variant="reject"
          onClick={() => {
            handleOpenModal('REJECTED');
          }}
          disabled={isPending}
        >
          모두 거절
        </CoffeeChatButton>
      </div>
      {coffeeChatListData !== undefined ? (
        coffeeChatListData.data.coffeeChatList.map((coffeeChat) => (
          <div key={coffeeChat.id} className="flex items-center gap-3">
            <Checkbox
              checked={selectedChats.includes(coffeeChat.id)}
              onClick={() => {
                handleSelectChat(coffeeChat.id);
              }}
              disabled={coffeeChat.coffeeChatStatus !== 'WAITING'}
            />
            <div
              key={coffeeChat.id}
              className="flex h-[50px] flex-1 cursor-pointer items-center justify-between rounded-xl bg-white px-4 px-6 duration-300 hover:shadow-md"
              onClick={() => {
                toCoffeeChatDetail({ coffeeChatId: coffeeChat.id });
              }}
            >
              <div className="flex items-center gap-2">
                {coffeeChat.coffeeChatStatus === 'WAITING' && (
                  <img src={ICON_SRC.BADGES} />
                )}
                <span className="truncate text-14 font-regular text-grey-900">
                  {coffeeChat.applicant.name}
                </span>
                <span className="truncate text-12 font-regular text-grey-700">
                  {coffeeChat.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-grey-300">
                  {getShortenedDate(coffeeChat.createdAt)}
                </span>
                <TagStatus coffeeChatStatus={coffeeChat.coffeeChatStatus} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={`loading-${idx}`}
              className="flex h-[50px] cursor-pointer items-center justify-between rounded-md bg-white px-[24px]"
            >
              <Skeleton className="h-[18px] w-[350px]" />
              <Skeleton className="h-6 w-[80px]" />
            </div>
          ))}
        </>
      )}
      {responseMessage !== '' && (
        <FormErrorResponse>{responseMessage}</FormErrorResponse>
      )}
      {isModalOpen && (
        <UpdateCoffeeChatStatusModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          onConfirm={() => {
            handleConfirm(modalStatus);
          }}
          status={modalStatus}
          selectedCount={selectedChats.length}
        />
      )}
    </div>
  );
};

const useGetCoffeeChatList = () => {
  const { token } = useGuardContext(TokenContext);
  const { coffeeChatService } = useGuardContext(ServiceContext);

  const { data: coffeeChatListData } = useQuery({
    queryKey: ['coffeeChatService', 'getCoffeeChatList', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.getCoffeeChatList({ token: t });
    },
    enabled: token !== null,
  });

  if (coffeeChatListData?.type === 'success') {
    coffeeChatListData.data.coffeeChatList.sort((a, b) => {
      if (
        a.coffeeChatStatus === 'WAITING' &&
        b.coffeeChatStatus !== 'WAITING'
      ) {
        return -1;
      }
      if (
        a.coffeeChatStatus !== 'WAITING' &&
        b.coffeeChatStatus === 'WAITING'
      ) {
        return 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  return { coffeeChatListData };
};

const useUpdateCoffeeChatStatus = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { coffeeChatService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const queryClient = useQueryClient();

  const { mutate: updateCoffeeChatStatus, isPending } = useMutation({
    mutationFn: ({
      coffeeChatList,
      coffeeChatStatus,
    }: {
      coffeeChatList: string[];
      coffeeChatStatus: CoffeeChatStatus;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.updateCoffeeChatStatus({
        token,
        body: {
          coffeeChatStatus,
          coffeeChatList,
        },
      });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
      } else {
        setResponseMessage(response.code);
      }
    },
    onError: () => {
      setResponseMessage(
        '업데이트에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    updateCoffeeChatStatus,
    isPending,
  };
};
