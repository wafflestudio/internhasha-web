import { useState } from 'react';

import type { CoffeeChatCompany } from '@/api/apis/localServer/schemas';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { ApplicantInfo } from '@/feature/applicant';
import { SkeletonCoffeeChatDetailView } from '@/feature/coffeeChat/ui/detail/SkeletonCoffeeChatDetailView';
import {
  useGetCoffeeChatDetail,
  useUpdateCoffeeChatStatus,
} from '@/feature/coffeeChat/ui/detail/useCoffeeChatDetailHooks';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const CoffeeChatDetailView = ({
  coffeeChatId,
}: {
  coffeeChatId: string;
}) => {
  const [responseMessage, setResponseMessage] = useState('');
  const { coffeeChatDetailData } = useGetCoffeeChatDetail({ coffeeChatId });
  const { toMyPage } = useRouteNavigation();
  const { updateCoffeeChatStatus, isPending } = useUpdateCoffeeChatStatus({
    setResponseMessage,
  });

  const handleStatusChange = (status: 'ACCEPTED' | 'REJECTED') => {
    updateCoffeeChatStatus({
      coffeeChatList: [coffeeChatId],
      coffeeChatStatus: status,
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
  const coffeeChatDetail = coffeeChatDetailData.data as CoffeeChatCompany;
  const isWaiting = coffeeChatDetail.coffeeChatStatus === 'WAITING';

  return (
    <div>
      <div className="mx-auto flex w-full gap-[90px] px-6 py-[30px] sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <div className="flex w-[700px] flex-col gap-6 rounded-lg bg-white px-[40px] py-[46px] text-grey-900">
          <ApplicantInfo
            fetchOwnInfo={false}
            applicantData={coffeeChatDetail.applicant}
            coffeeChatStatus={coffeeChatDetail.coffeeChatStatus}
            createdAt={coffeeChatDetail.createdAt}
          />
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-22 font-bold">커피챗 신청 내용</h3>
            <p className="text-sm text-gray-700">{coffeeChatDetail.content}</p>
          </div>
        </div>
        <div className="mb-[86px] mt-[963px] flex flex-col gap-[8px]">
          <Button
            variant="default"
            onClick={() => {
              handleStatusChange('ACCEPTED');
            }}
            className="w-[292px]"
            disabled={isPending || !isWaiting}
          >
            성사시키기
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleStatusChange('REJECTED');
            }}
            className="w-[292px]"
            disabled={isPending || !isWaiting}
          >
            거절하기
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              toMyPage({ query: { tab: 'COFFEE_CHAT' } });
            }}
            className="w-[292px]"
            disabled={isPending}
          >
            목록으로
          </Button>
        </div>
      </div>
      {responseMessage !== '' && (
        <FormErrorResponse>{responseMessage}</FormErrorResponse>
      )}
    </div>
  );
};
