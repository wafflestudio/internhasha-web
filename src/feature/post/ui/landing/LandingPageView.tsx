import type { JobMinorCategory, PostFilter } from '@/entities/post';
import { FilterSection } from '@/feature/post/ui/landing/FilterSection';
import { LandingPostView } from '@/feature/post/ui/landing/LandingPostView';
import { NarrowRolesFilter } from '@/feature/post/ui/landing/RolesFilter';
import { RolesFilter } from '@/feature/post/ui/landing/RolesFilter';

export const LandingPageView = ({
  postFilter,
  setPostFilter,
  showSignInModal,
  handleQueryChange,
}: {
  postFilter: PostFilter;
  setPostFilter: (
    input: PostFilter | ((prev: PostFilter) => PostFilter),
  ) => void;
  showSignInModal(): void;
  handleQueryChange: ({ query }: { query: PostFilter }) => void;
}) => {
  const handleRolesChange = (updatedRoles: JobMinorCategory[]) => {
    setPostFilter((prev) => ({
      ...prev,
      roles: updatedRoles,
      page: undefined,
    }));
    handleQueryChange({
      query: { ...postFilter, roles: updatedRoles, page: undefined },
    });
  };
  const handleFilterChange = (
    updatedFilters: Omit<PostFilter, 'page' | 'roles'>,
  ) => {
    setPostFilter((prev) => ({ ...prev, ...updatedFilters, page: undefined }));
    handleQueryChange({
      query: { ...postFilter, ...updatedFilters, page: undefined },
    });
  };
  const handlePageChange = (page: number) => {
    setPostFilter((prev) => ({ ...prev, page }));
    handleQueryChange({ query: { ...postFilter, page } });
  };

  return (
    <div className="m-auto flex w-full flex-col gap-2 px-2 py-10 sm:w-screen-sm md:w-screen-md md:flex-row lg:w-screen-lg xl:max-w-screen-xl">
      {/* RolesFilter */}
      <div className="order-1 hidden md:order-none md:mt-[50px] md:block md:flex-col">
        <RolesFilter
          postFilter={postFilter}
          onChangeRoles={handleRolesChange}
        />
      </div>

      {/* NarrowRolesFilter */}
      <div className="order-1 block w-full md:order-none md:hidden">
        <NarrowRolesFilter
          postFilter={postFilter}
          onChangeRoles={handleRolesChange}
        />
      </div>

      {/* 게시글 리스트 및 상단 필터 */}
      <div className="order-2 flex-1 px-2 lg:order-none">
        <h2 className="text-30 font-bold">인턴 공고</h2>
        {/* 상단 필터 섹션 */}
        <div className="flex items-center justify-between py-6">
          <FilterSection
            postFilter={postFilter}
            onChangeFilters={handleFilterChange}
          />
        </div>
        <LandingPostView
          postFilter={postFilter}
          handlePageChange={handlePageChange}
          showSignInModal={showSignInModal}
        />
      </div>
    </div>
  );
};
