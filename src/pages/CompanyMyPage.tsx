import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { CoffeeChatStatus } from '@/api/apis/localServer/schemas';
import { CoffeeChatButton } from '@/components/button/CoffeeChatButton';
import { UpdateCoffeeChatStatusModal } from '@/components/modal/UpdateCoffeeChatStatusModal';
import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ICON_SRC } from '@/entities/asset';
import type { MyPageRouteQuery } from '@/entities/route';
import {
  CoffeeChatNumberBadge,
  CompanyCoffeeChatListView,
} from '@/feature/coffeeChat';
import { CompanyCoffeeChatBtnGroup } from '@/feature/coffeeChat/ui/mypage/company/CompanyCoffeeChatBtn';
import { CompanyProfileView } from '@/feature/company';
import { MyPostList } from '@/feature/post/ui/mypage/company/MyPostList';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useRouteQueryParams } from '@/shared/route/useRouteParams';

type MyPageTab = MyPageRouteQuery['tab'];

export const CompanyMyPage = () => {
  const queryParams = useRouteQueryParams() as MyPageRouteQuery | null;
  const { toCreatePost, toMyPage, toPatchCompany } = useRouteNavigation();
  const [isExistProfile, setIsExistProfile] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const { coffeeChatListData } = useGetCoffeeChatList();
  const { updateCoffeeChatStatus, isPending } = useUpdateCoffeeChatStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<'ACCEPTED' | 'REJECTED'>(
    'ACCEPTED',
  );

  const [isSelectMode, setIsSelectMode] = useState(false);
  const handleConfirm = (status: CoffeeChatStatus) => {
    updateCoffeeChatStatus({
      coffeeChatList: selectedChats,
      coffeeChatStatus: status,
    });
    setSelectedChats([]);
    setIsModalOpen(false);
  };

  const handleTabChange = (tab: string) => {
    toMyPage({ query: { tab: tab as MyPageTab } });
  };
  const handleOpenModal = (status: 'ACCEPTED' | 'REJECTED') => {
    if (selectedChats.length === 0) {
      alert('선택된 커피챗이 없습니다.');
      return;
    }
    setModalStatus(status);
    setIsModalOpen(true);
  };

  const handleSelectAll = () => {
    if (
      coffeeChatListData === undefined ||
      coffeeChatListData.type === 'error'
    ) {
      return;
    }
    const allSelected = coffeeChatListData.data.coffeeChatList
      .filter((coffeeChat) => coffeeChat.coffeeChatStatus === 'WAITING')
      .map((coffeeChat) => coffeeChat.id);
    setSelectedChats(allSelected);
  };

  const handleCancelSelect = () => {
    setIsSelectMode(false);
  };

  return (
    <div className="min-h-screen bg-grey-50">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="mx-auto flex w-full flex-col gap-10 px-6 py-[30px] sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold text-grey-900">마이페이지</h1>
        <Tabs
          value={
            queryParams !== null && queryParams.tab !== 'BOOKMARK'
              ? queryParams.tab
              : 'COFFEE_CHAT'
          }
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex flex-col gap-[30px]">
            <TabsList className="align flex gap-[30px]">
              <TabsTrigger value="COFFEE_CHAT" className="gap-1">
                나에게 신청된 커피챗
                <CoffeeChatNumberBadge />
              </TabsTrigger>
              <TabsTrigger value="POST">작성한 공고</TabsTrigger>
              <TabsTrigger value="PROFILE">내 정보</TabsTrigger>
              <TabsContent value="POST" className="ml-auto">
                {isExistProfile && (
                  <Button
                    onClick={() => {
                      if (companyId === null) {
                        return;
                      }
                      toCreatePost({ companyId: companyId });
                    }}
                    className="font-medium"
                    size="sm"
                  >
                    <img src={ICON_SRC.PLUS} />
                    공고 추가
                  </Button>
                )}
              </TabsContent>
              <TabsContent value="PROFILE" className="ml-auto">
                {isExistProfile && (
                  <Button
                    onClick={toPatchCompany}
                    className="font-medium"
                    size="sm"
                  >
                    <img src={ICON_SRC.EDIT.WHITE} />
                    회사 정보 수정
                  </Button>
                )}
              </TabsContent>
              <TabsContent value="COFFEE_CHAT" className="ml-auto">
                {isSelectMode ? (
                  <CompanyCoffeeChatBtnGroup
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
                    disabled={isPending}
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
              </TabsContent>
            </TabsList>

            <TabsContent value="COFFEE_CHAT">
              <CompanyCoffeeChatListView
                setSelectedChats={setSelectedChats}
                selectedChats={selectedChats}
                isSelectMode={isSelectMode}
              />
            </TabsContent>
            <TabsContent value="POST">
              <MyPostList
                setIsExistProfile={setIsExistProfile}
                companyId={companyId}
                setCompanyId={setCompanyId}
              />
            </TabsContent>
            <TabsContent value="PROFILE">
              <CompanyProfileView setIsExistProfile={setIsExistProfile} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
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
