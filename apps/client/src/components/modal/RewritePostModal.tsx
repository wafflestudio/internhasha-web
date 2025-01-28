import { Button } from '@/components/ui/button';
import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const RewritePostModal = ({ companyId }: { companyId: string }) => {
  const { toMain, toCreatePost } = useRouteNavigation();
  return (
    <ModalBackgroundWithHeader>
      <div className="flex flex-col text-center gap-[14px]">
        <h2 className="text-xl font-bold">공고 작성이 완료되었어요!</h2>
        <p>해당 회사에 대한 다른 직군 공고를 계속 작성하시겠습니까?</p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={toMain} className="flex-1">
          메인으로
        </Button>
        <Button
          onClick={() => {
            toCreatePost({ companyId });
          }}
          className="flex-1"
        >
          계속 작성하기
        </Button>
      </div>
    </ModalBackgroundWithHeader>
  );
};
