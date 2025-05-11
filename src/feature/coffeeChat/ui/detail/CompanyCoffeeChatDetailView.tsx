import { useState } from 'react';

import type { CoffeeChatCompany } from '@/api/apis/localServer/schemas';
import { Information } from '@/components/information/Information';
import { UpdateCoffeeChatStatusModal } from '@/components/modal/UpdateCoffeeChatStatusModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { TagStatus } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ApplicantInfoForCoffeeChat } from '@/feature/coffeeChat/ui/detail/ApplicantInfoForCoffeeChat';
import { SkeletonCoffeeChatDetailView } from '@/feature/coffeeChat/ui/detail/SkeletonCoffeeChatDetailView';
import {
  useGetCoffeeChatDetail,
  useUpdateCoffeeChatStatus,
} from '@/feature/coffeeChat/ui/detail/useCoffeeChatDetailHooks';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getFormatDate } from '@/util/date';

export const CoffeeChatDetailView = ({
  coffeeChatId,
}: {
  coffeeChatId: string;
}) => {
  const [responseMessage, setResponseMessage] = useState('');
  const { coffeeChatDetailData } = useGetCoffeeChatDetail({ coffeeChatId });
  const { toBack } = useRouteNavigation();
  const { updateCoffeeChatStatus, isPending } = useUpdateCoffeeChatStatus({
    setResponseMessage,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<'ACCEPTED' | 'REJECTED'>(
    'ACCEPTED',
  );
  const handleOpenModal = (status: 'ACCEPTED' | 'REJECTED') => {
    setModalStatus(status);
    setIsModalOpen(true);
  };
  const handleStatusChange = (status: 'ACCEPTED' | 'REJECTED') => {
    updateCoffeeChatStatus({
      coffeeChatList: [coffeeChatId],
      coffeeChatStatus: status,
    });
    setIsModalOpen(false);
  };

  if (coffeeChatDetailData === undefined) {
    return <SkeletonCoffeeChatDetailView />;
  }

  if (coffeeChatDetailData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }
  const coffeeChatDetail = coffeeChatDetailData.data as CoffeeChatCompany;
  const isWaiting = coffeeChatDetail.coffeeChatStatus === 'WAITING';

  return (
    <>
      <div className="mx-auto flex w-full max-w-[700px] px-6 py-[30px]">
        <div className="flex w-full flex-col gap-[28px] rounded-lg bg-white px-[40px] py-[46px] text-grey-900">
          {coffeeChatDetail.coffeeChatStatus === 'ACCEPTED' && (
            <Information>
              <span>
                커피챗이 성사되었습니다. 제시된 이메일을 통해 컨택을
                진행해주세요.
              </span>
            </Information>
          )}
          <div className="flex items-center justify-between">
            <h1 className="text-30 font-bold">커피챗 신청서</h1>
            <div className="flex items-center gap-2">
              <span className="font-regular text-grey-600">
                {getFormatDate(coffeeChatDetail.createdAt)}
              </span>
              <TagStatus coffeeChatStatus={coffeeChatDetail.coffeeChatStatus} />
            </div>
          </div>
          <ApplicantInfoForCoffeeChat applicant={coffeeChatDetail.applicant} />
          <div className="flex flex-col gap-[20px]">
            <h3 className="text-22 font-bold">커피챗 신청 내용</h3>
            <p className="whitespace-pre-wrap font-regular text-gray-700">
              {coffeeChatDetail.content}
            </p>
          </div>
          <div className="flex gap-[10px] pt-[52px]">
            <Button
              variant="secondary"
              onClick={() => {
                toBack();
              }}
              className="flex-1"
              disabled={isPending}
            >
              목록으로
            </Button>
            <Button
              variant="default"
              onClick={() => {
                handleOpenModal('ACCEPTED');
              }}
              className="flex-1"
              disabled={isPending || !isWaiting}
            >
              성사시키기
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleOpenModal('REJECTED');
              }}
              className="flex-1"
              disabled={isPending || !isWaiting}
            >
              거절하기
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <UpdateCoffeeChatStatusModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          onConfirm={() => {
            handleStatusChange(modalStatus);
          }}
          status={modalStatus}
        />
      )}

      {responseMessage !== '' && (
        <FormErrorResponse>{responseMessage}</FormErrorResponse>
      )}
    </>
  );
};
