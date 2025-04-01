import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import type { PostRouteQuery } from '@/entities/route';
import { CreatePostForm, PatchPostForm } from '@/feature/post';
import { PATH } from '@/shared/route/constants';
import { RouteNavigator } from '@/shared/route/RouteNavigator';
import {
  useRouteLocation,
  useRoutePathParams,
} from '@/shared/route/useRouteParams';

export const CreatePostPage = () => {
  const { companyId } = useRoutePathParams<{ companyId: string }>();
  const body = useRouteLocation() as PostRouteQuery | undefined;

  if (companyId === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  return (
    <div className="min-h-screen">
      <GlobalNavigationBar />
      <div className="mx-auto my-[30px] flex w-[280px] flex-col justify-center gap-[50px] sm:w-[700px]">
        {body !== undefined ? (
          <>
            <h2 className="text-bold text-30 text-grey-900">인턴 공고 수정</h2>
            <PatchPostForm companyId={companyId} body={body} />
          </>
        ) : (
          <>
            <h2 className="text-bold text-30 text-grey-900">인턴 공고 작성</h2>
            <CreatePostForm companyId={companyId} />
          </>
        )}
      </div>
    </div>
  );
};
