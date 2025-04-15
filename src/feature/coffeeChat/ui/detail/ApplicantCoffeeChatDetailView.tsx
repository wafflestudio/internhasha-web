import { useState } from 'react';

import { CancelCoffeeChatCancelModal } from '@/components/modal/CancelCoffeeChatCancelModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { TagStatus } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TextareaPreview } from '@/components/ui/TextareaPreview';
import { SkeletonCoffeeChatDetailView } from '@/feature/coffeeChat/ui/detail/SkeletonCoffeeChatDetailView';
import {
  useGetCoffeeChatDetail,
  useUpdateCoffeeChatStatus,
} from '@/feature/coffeeChat/ui/detail/useCoffeeChatDetailHooks';
import type { CoffeeChatApplicant } from '@/mocks/coffeeChat/schemas';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getFormatDate } from '@/util/postFormatFunctions';

export const CoffeeChatDetailView = ({
  coffeeChatId,
}: {
  coffeeChatId: string;
}) => {
  const { coffeeChatDetailData } = useGetCoffeeChatDetail({ coffeeChatId });
  const [responseMessage, setResponseMessage] = useState('');
  const { toMyPage } = useRouteNavigation();
  const [isCancel, setIsCancel] = useState(false);
  const { updateCoffeeChatStatus, isPending } = useUpdateCoffeeChatStatus({
    setResponseMessage,
  });

  const handleCancel = () => {
    updateCoffeeChatStatus({
      coffeeChatList: [coffeeChatId],
      coffeeChatStatus: 'CANCELED',
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
  const coffeeChatDetail = coffeeChatDetailData.data as CoffeeChatApplicant;
  return (
    <>
      <div className="flex w-full bg-gray-50 py-10">
        {/* Left Section */}
        <div className="mx-auto w-11/12 space-y-6 rounded-lg bg-white p-8 xs:w-3/5">
          <div>
            <span className="content-center text-center text-3xl font-bold text-black">
              커피챗 신청서
            </span>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row">
            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <div className="h-[40px] w-[40px] overflow-hidden">
                {coffeeChatDetail.company.imageKey !== '' ? (
                  <img
                    src={`/${coffeeChatDetail.company.imageKey as string}`}
                    alt="프로필 이미지"
                    className="h-[40px] w-[40px] border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="h-[40px] w-[40px] border border-gray-200 object-cover"></div>
                )}
              </div>
              <div>
                <p className="align-center text-lg font-semibold text-gray-900">
                  {coffeeChatDetail.company.name}
                </p>
              </div>
            </div>
            <div className="flex gap-[8px]">
              <span className="my-auto text-lg font-semibold text-gray-400">
                {getFormatDate(coffeeChatDetail.createdAt)}
              </span>
              <TagStatus coffeeChatStatus={coffeeChatDetail.coffeeChatStatus} />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-[80px]">
            <div className="space-y-5 py-6">
              <TextareaPreview
                content={coffeeChatDetail.content}
                className="text-sm text-gray-700"
              />
            </div>
            <div className="flex gap-[8px]">
              <Button
                variant="secondary"
                onClick={() => {
                  toMyPage({ query: { tab: 'COFFEE_CHAT' } });
                }}
                className="mt-20 w-full"
                disabled={isPending}
              >
                목록으로
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsCancel(true);
                }}
                className="mt-20 w-full"
                disabled={
                  isPending || coffeeChatDetail.coffeeChatStatus !== 'WAITING'
                }
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
