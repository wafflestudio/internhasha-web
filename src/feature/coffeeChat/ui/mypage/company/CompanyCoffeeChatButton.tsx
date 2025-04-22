import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { CoffeeChatButton } from '@/components/button/CoffeeChatButton';
import { UpdateCoffeeChatStatusModal } from '@/components/modal/UpdateCoffeeChatStatusModal';
import type { CoffeeChatStatus } from '@/entities/coffeeChat';
import { CompanyCoffeeChatButtonGroup } from '@/feature/coffeeChat/ui/mypage/company/CompanyCoffeeChatButtonGroup';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

type CompanyCoffeeChatButtonProps = {
  isSelectMode: boolean;
  setIsSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedChats: React.Dispatch<React.SetStateAction<string[]>>;
  selectedChats: string[];
};
export const CompanyCoffeeChatButton = ({
  isSelectMode,
  setIsSelectMode,
  selectedChats,
  setSelectedChats,
}: CompanyCoffeeChatButtonProps) => {
  const { updateCoffeeChatStatus, isPending } = useUpdateCoffeeChatStatus();
  const { coffeeChatListData } = useGetCoffeeChatList();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<'ACCEPTED' | 'REJECTED'>(
    'ACCEPTED',
  );

  if (coffeeChatListData === undefined) {
    return null;
  }
  if (coffeeChatListData.type === 'error') {
    toast.error('정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.');
    return null;
  }
  if (coffeeChatListData.data.coffeeChatList.length === 0) {
    return null;
  }
  const coffeeChatList = coffeeChatListData.data.coffeeChatList;

  const handleConfirm = (status: CoffeeChatStatus) => {
    updateCoffeeChatStatus({
      coffeeChatList: selectedChats,
      coffeeChatStatus: status,
    });
    setSelectedChats([]);
    setIsModalOpen(false);
  };
  const handleOpenModal = (status: 'ACCEPTED' | 'REJECTED') => {
    if (selectedChats.length === 0) {
      toast.info('선택된 커피챗이 없습니다.');
      return;
    }
    setModalStatus(status);
    setIsModalOpen(true);
  };
  const handleSelectAll = () => {
    const waitingChats = coffeeChatList
      .filter((coffeeChat) => coffeeChat.coffeeChatStatus === 'WAITING')
      .map((coffeeChat) => coffeeChat.id);
    const isAllSelected = waitingChats.every((id) =>
      selectedChats.includes(id),
    );
    if (isAllSelected) {
      setSelectedChats([]);
      return;
    }
    setSelectedChats(waitingChats);
  };

  const handleCancelSelect = () => {
    setIsSelectMode(false);
  };

  return (
    <>
      {isSelectMode ? (
        <CompanyCoffeeChatButtonGroup
          isPending={isPending}
          handleOpenModal={handleOpenModal}
          handleCancelSelect={handleCancelSelect}
          handleSelectAll={handleSelectAll}
          disabled={isPending || selectedChats.length === 0}
        />
      ) : (
        <CoffeeChatButton
          onClick={() => {
            setIsSelectMode((prev) => !prev);
          }}
          disabled={
            isPending ||
            coffeeChatList.filter(
              (coffeeChat) => coffeeChat.coffeeChatStatus === 'WAITING',
            ).length === 0
          }
        >
          선택 하기
        </CoffeeChatButton>
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
    </>
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

const useUpdateCoffeeChatStatus = () => {
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
      }
    },
  });

  return {
    updateCoffeeChatStatus,
    isPending,
  };
};
