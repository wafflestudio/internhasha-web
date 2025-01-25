import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { VentureCapitalLandingTab } from '@/feature/ventureCapital';

export const VentureCapitalLandingPage = () => {
  return (
    <div>
      <GlobalNavigationBar />
      <h1>마이페이지</h1>
      <VentureCapitalLandingTab />
    </div>
  );
};
