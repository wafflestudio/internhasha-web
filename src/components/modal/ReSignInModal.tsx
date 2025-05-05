import { Button } from '@/components/ui/button';
import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const ReSignInModal = () => {
  const { toSignInSelect } = useRouteNavigation();

  const onClickButton = () => {
    toSignInSelect();
  };

  return (
    <ModalBackgroundWithHeader>
      <div className="flex flex-col gap-[14px] text-center">
        <h2 className="text-18 font-bold">인증정보가 올바르지 않아요</h2>
        <p className="text-16 font-medium">다시 로그인해 주세요</p>
      </div>
      <Button onClick={onClickButton} className="w-full">
        로그인 페이지로
      </Button>
    </ModalBackgroundWithHeader>
  );
};
