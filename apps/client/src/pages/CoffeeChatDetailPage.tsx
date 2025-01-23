import { useParams } from 'react-router';

import { PATH } from '@/entities/route';
import { CoffeeChatDetailView } from '@/feature/coffeeChat';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const CoffeeChatDetailPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  if (resumeId === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }
  return (
    <div>
      <CoffeeChatDetailView resumeId={resumeId} />
    </div>
  );
};
