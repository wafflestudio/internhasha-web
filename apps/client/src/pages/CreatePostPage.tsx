import { useLocation } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PATH } from '@/entities/route';
import { CreatePostForm, PatchPostForm } from '@/feature/post';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

type Body = {
  companyId: string;
  postBody?: {
    id: string;
    title: string;
    employmentEndDateTime?: string;
    jobMajorCategory: string;
    jobMinorCategory: string;
    detail: string;
    headcount: number;
  };
};

export const CreatePostPage = () => {
  const location = useLocation();
  const state = location.state as Body | undefined;

  if (state === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  const { companyId, postBody } = state;

  if (postBody === undefined) {
    return (
      <div>
        <GlobalNavigationBar />
        <h1>채용 공고 작성하기</h1>
        <CreatePostForm companyId={companyId} />
      </div>
    );
  }

  return (
    <div>
      <GlobalNavigationBar />
      <h1>채용 공고 수정하기</h1>
      <PatchPostForm companyId={companyId} />
    </div>
  );
};
