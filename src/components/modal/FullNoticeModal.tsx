import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ModalSelectBackground } from '@/components/ui/layout';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useDialog } from '@/shared/modal/hooks';

// 전체 공지용 모달
export const FullNoticeModal = ({ onClose }: { onClose: () => void }) => {
  const { isVisible, handleClose } = useDialog({
    onClose: () => {
      if (dontShowAgain) {
        storageService.setModalClosed();
      }
      onClose();
    },
  });
  const { storageService } = useGuardContext(ServiceContext);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  return (
    <ModalSelectBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleClose}
    >
      <div className="flex flex-col gap-4 p-4 text-sm text-gray-800">
        <h1 className="text-18 font-bold">베타테스트 안내</h1>
        <p className="mt-3 flex flex-col gap-2 text-left font-light">
          <span>인턴하샤는 현재 베타 테스트 중입니다!</span>
          <span>
            서울대생을 위한 좋은 인턴 생태계를 만드는 데에 여러분의 도움이
            필요합니다. 서비스 기능 관련 건의사항 / 불편하셨던 점이 있으시다면
            언제든지 홈페이지 상단의{' '}
            <b className="font-bold">‘건의하기’ 버튼</b> 또는
            <b className="font-bold">internhasha.official@gmail.com</b>로 부담
            없이 연락 주세요.
          </span>
          <span>
            스타트업들은 점차 추가될 예정입니다. 서비스 이용해 주셔서
            감사드립니다!
          </span>
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dont-show-again"
              checked={dontShowAgain}
              onCheckedChange={(checked) => {
                setDontShowAgain(checked === true ? checked : false);
              }}
            />
            <label htmlFor="dont-show-again" className="text-sm font-medium">
              다시 보지 않기
            </label>
          </div>

          <Button onClick={handleClose} className="mt-2 self-end">
            닫기
          </Button>
        </div>
      </div>
    </ModalSelectBackground>
  );
};
