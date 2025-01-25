import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { MyInfo } from '@/feature/user';

export const MyPage = () => {
  return (
    <div>
      <GlobalNavigationBar />
      <h1>나의 정보</h1>
      <MyInfo />
    </div>
  );
};
