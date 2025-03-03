import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { FindIdForm, FindPwForm } from '@/feature/auth';

export const FindAccountPage = () => {
  const [findTarget, setFindTarget] = useState<'ID' | 'PW'>('ID');

  const handleClickIdButton = () => {
    setFindTarget('ID');
  };

  const handleClickPwButton = () => {
    setFindTarget('PW');
  };

  return (
    <ModalBackgroundWithHeader>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[22px] font-bold text-center">
          아이디 ∙ 비밀번호 찾기
        </h2>
        <div className="flex mt-[26px] p-[6px] rounded-[10px] bg-grey-light">
          <Button
            variant="tabBar"
            className="flex-1"
            onClick={handleClickIdButton}
            disabled={findTarget === 'ID'}
          >
            아이디
          </Button>
          <Button
            variant="tabBar"
            className="flex-1"
            onClick={handleClickPwButton}
            disabled={findTarget === 'PW'}
          >
            비밀번호
          </Button>
        </div>
        {findTarget === 'ID' ? <FindIdForm /> : <FindPwForm />}
      </div>
    </ModalBackgroundWithHeader>
  );
};
