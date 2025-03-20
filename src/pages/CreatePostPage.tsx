import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { PostRouteQuery } from '@/entities/route';
import { CreatePostForm, PatchPostForm } from '@/feature/post';
import { PATH } from '@/shared/route/constants';
import { RouteNavigator } from '@/shared/route/RouteNavigator';
import { useRouteLocation } from '@/shared/route/useRouteParams';
import { useRoutePathParams } from '@/shared/route/useRouteParams';

export const CreatePostPage = () => {
  const { companyId } = useRoutePathParams<{ companyId: string }>();
  const body = useRouteLocation() as PostRouteQuery | null;

  if (companyId === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  if (body === null) {
    return (
      <div className="min-h-screen">
        <GlobalNavigationBar />
        <div className="mx-auto my-[30px] flex w-[280px] flex-col justify-center gap-[50px] sm:w-[700px]">
          <h2 className="text-2xl font-bold">회사 정보 작성</h2>
          <CreatePostForm companyId={companyId} />
        </div>
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
