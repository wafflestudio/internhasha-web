import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const RewritePostModal = ({ postId }: { postId: string | null }) => {
  const { toPost, toMain, refreshPage } = useRouteNavigation();

  return (
    <ModalFloatBackground variant="transparent">
      <div className="flex flex-col gap-[14px] text-center">
        <h2 className="text-xl font-bold">공고 작성이 완료되었어요!</h2>
        <p>해당 회사에 대한 다른 직군 공고를 계속 작성하시겠습니까?</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            if (postId === null) {
              toMain();
              return;
            }
            toPost({ postId });
          }}
          className="flex-1"
        >
          공고로 이동
        </Button>
        <Button onClick={refreshPage} className="flex-1">
          계속 작성하기
        </Button>
      </div>
    </ModalFloatBackground>
  );
};
