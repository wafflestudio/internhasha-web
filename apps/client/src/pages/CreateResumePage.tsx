import { useParams } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PATH } from '@/entities/route.ts';
import { CreateResumeForm } from '@/feature/resume/ui/CreateResumeForm.tsx';
import { RouteNavigator } from '@/shared/route/RouteNavigator.tsx';

export const CreateResumePage = () => {
  const { postId } = useParams<{ postId: string }>();

  if (postId === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  return (
    <div>
      <GlobalNavigationBar />
      <h2>커피챗 신청 페이지</h2>
      <CreateResumeForm postId={postId} />
    </div>
  );
};
