import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import type { CoffeeChatStatusRequest } from '@/api/apis/localServer/schemas';
import { CoffeeChatButton } from '@/components/button/CoffeeChatButton';
import { UpdateCoffeeChatStatusModal } from '@/components/modal/UpdateCoffeeChatStatusModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Check } from '@/components/ui/check';
import { Skeleton } from '@/components/ui/skeleton';
import { TagCoffeeChat } from '@/components/ui/tagCoffeeChat';
import { ICON_SRC } from '@/entities/asset';
import { useGetCoffeeChatList } from '@/feature/coffeeChat/ui/CoffeeChatListView';
import { NoCoffeeChat } from '@/feature/coffeeChat/ui/NoCoffeeChat';
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
    coffeeChatListData?.type === 'success' &&
    Array.isArray(coffeeChatListData.data) &&
    coffeeChatListData.data.length === 0
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

  const handleConfirm = (
    status: CoffeeChatStatusRequest['coffeeChatStatus'],
  ) => {
    selectedChats.forEach((coffeeChatId) => {
      updateCoffeeChatStatus({
        coffeeChatId,
        body: { coffeeChatStatus: status },
      });
    });
    setSelectedChats([]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex gap-[18px] justify-end mb-[18px]">
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
            <Check
              checked={selectedChats.includes(coffeeChat.id)}
              onClick={() => {
                handleSelectChat(coffeeChat.id);
              }}
              disabled={coffeeChat.coffeeChatStatus !== 'WAITING'}
            />
            <div
              key={coffeeChat.id}
              className="flex flex-1 h-[50px] px-6 justify-between items-center cursor-pointer bg-white rounded-xl duration-300 hover:shadow-md px-4"
              onClick={() => {
                toCoffeeChatDetail({ coffeeChatId: coffeeChat.id });
              }}
            >
              <div className="flex items-center gap-2">
                {coffeeChat.coffeeChatStatus === 'WAITING' && (
                  <img src={ICON_SRC.BADGES} />
                )}
                <span className="text-grey-darker font-regular text-14 truncate">
                  {coffeeChat.applicant.name}
                </span>
                <span className="text-grey-dark-hover font-regular text-12 truncate">
                  {coffeeChat.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-grey-normal">
                  {getShortenedDate(coffeeChat.createdAt)}
                </span>
                <TagCoffeeChat coffeeChatStatus={coffeeChat.coffeeChatStatus} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={`loading-${idx}`}
              className="flex px-[24px] h-[50px] justify-between items-center cursor-pointer bg-white rounded-md"
            >
              <Skeleton className="w-[350px] h-[18px]" />
              <Skeleton className="w-[80px] h-6" />
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
      coffeeChatId,
      body,
    }: {
      coffeeChatId: string;
      body: CoffeeChatStatusRequest;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.updateCoffeeChatStatus({
        token,
        coffeeChatId,
        body,
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
