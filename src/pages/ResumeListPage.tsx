import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { ResumeListView } from '@/feature/resume';

export const ResumeListPage = () => {
  return (
    <div>
      <GlobalNavigationBar />
      <ResumeListView />
    </div>
  );
};
