import { useParams } from 'react-router';

import { PATH } from '@/entities/route';
import { ResumeDetailView } from '@/feature/resume';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const ResumeDetailPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  if (resumeId === undefined) {
    return <RouteNavigator link={PATH.RESUME_LIST} />;
  }
  return (
    <div>
      <ResumeDetailView resumeId={resumeId} />
    </div>
  );
};
