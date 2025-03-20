import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PATH } from '@/entities/route';
import { CreatePostForm, PatchPostForm } from '@/feature/post';
import { RouteNavigator } from '@/shared/route/RouteNavigator';
import type { PostRouteBody } from '@/shared/route/scheme';
import { useRouteLocation } from '@/shared/route/useRouteLocation';
import { useRouteParams } from '@/shared/route/useRouteParams';

export const CreatePostPage = () => {
  const { companyId } = useRouteParams<{ companyId: string }>();
  const body = useRouteLocation() as PostRouteBody | null;

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
