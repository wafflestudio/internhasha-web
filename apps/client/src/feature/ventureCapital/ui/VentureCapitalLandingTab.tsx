import { useState } from 'react';

import { MyCompanyList } from '@/feature/ventureCapital/ui/MyCompanyList';
import { MyPage } from '@/feature/ventureCapital/ui/MyPage';
import { MyPostList } from '@/feature/ventureCapital/ui/MyPostList';

type TabMenu = 'COMPANY' | 'POST' | 'INFO';
export const VentureCapitalLandingTab = () => {
  const [menu, setMenu] = useState<TabMenu>('COMPANY');
  const handleClickTabMenu = (input: TabMenu) => {
    setMenu(input);
  };
  return (
    <div>
      <div>
        <span
          onClick={() => {
            handleClickTabMenu('COMPANY');
          }}
        >
          관리 기업
        </span>
        <span
          onClick={() => {
            handleClickTabMenu('POST');
          }}
        >
          작성한 공고
        </span>
        <span
          onClick={() => {
            handleClickTabMenu('INFO');
          }}
        >
          내 정보
        </span>
      </div>
      {menu === 'COMPANY' && <MyCompanyList />}
      {menu === 'POST' && <MyPostList />}
      {menu === 'INFO' && <MyPage />}
    </div>
  );
};
