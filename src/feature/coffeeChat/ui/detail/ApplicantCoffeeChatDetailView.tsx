import { useState } from 'react';

import { Information } from '@/components/information/Information';
import { CancelCoffeeChatCancelModal } from '@/components/modal/CancelCoffeeChatCancelModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { TagStatus } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SeperatorLine } from '@/components/ui/separator';
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

  const { createdAt, coffeeChatStatus, company, content, title } =
    coffeeChatDetailData.data;
  return (
    <>
      <div className="mx-auto flex max-w-[700px] text-grey-900">
        <div className="mt-10 flex w-full flex-col gap-[30px] rounded-lg bg-white px-[40px] py-[46px] text-grey-900">
          {/* 커피챗 성사 시 부연설명 */}
          {coffeeChatStatus === 'ACCEPTED' && (
            <Information>
              <span>
                커피챗이 성사되었습니다. 회사에서 메일이 올 예정이니 잠시만
                기다려주세요.
              </span>
            </Information>
          )}
          {/* 회사 정보 */}
          <div className="flex flex-col gap-[14px]">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-30 font-bold">커피챗 신청서</h3>
              <div className="flex items-center gap-2">
                <span className="font-regular text-grey-600">
                  {getFormatDate(createdAt)}
                </span>
                <TagStatus coffeeChatStatus={coffeeChatStatus} />
              </div>
            </div>
            <div className="flex gap-3">
              {company.imageKey !== undefined ? (
                <img
                  src={`/${company.imageKey}`}
                  className="h-10 w-10 rounded-sm object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-sm bg-grey-300"></div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-18 font-semibold">{company.name}</span>
                <span>•</span>
                <span>{title}</span>
              </div>
            </div>
            <SeperatorLine />
          </div>

          <div className="flex flex-col gap-20">
            {/* 커피챗 작성 내역 */}
            <p className="whitespace-pre-wrap font-regular">{content}</p>

            {/* 버튼 목록 */}
            <div className="flex gap-2.5">
              <Button
                variant="secondary"
                onClick={() => {
                  toMyPage({ query: { tab: 'COFFEE_CHAT' } });
                }}
                className="w-full"
                disabled={isPending}
              >
                목록으로
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsCancel(true);
                }}
                className="w-full"
                disabled={isPending || coffeeChatStatus !== 'WAITING'}
              >
                신청 취소
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
