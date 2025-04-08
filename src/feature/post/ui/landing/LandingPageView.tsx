import { useState } from 'react';

import type { JobMinorCategory, PostFilter } from '@/entities/post';
import type { PostFilterRouteQuery } from '@/entities/route';
import { FilterSection } from '@/feature/post/ui/landing/FilterSection';
import { LandingPostView } from '@/feature/post/ui/landing/LandingPostView';
import { NarrowRolesFilter } from '@/feature/post/ui/landing/RolesFilter';
import { RolesFilter } from '@/feature/post/ui/landing/RolesFilter';
import { useRouteQueryParams } from '@/shared/route/useRouteParams';

export const LandingPageView = ({
  setShowSignInModal,
}: {
  setShowSignInModal(input: boolean): void;
}) => {
  // TODO: queryParams를 전역으로 올려서 어떤 페이지에서 뒤로가기를 수행하더라도 필터링과 페이지네이션이 유지되도록 수정
  const queryParams = useRouteQueryParams() as PostFilterRouteQuery | null;
  const [postFilter, setFilterElements] = useState<PostFilter>(
    queryParams !== null
      ? queryParams
      : {
          positions: undefined,
          isActive: undefined,
          domains: undefined,
          order: undefined,
        },
  );

  const handleRolesChange = (updatedRoles: JobMinorCategory[]) => {
    setFilterElements((prev) => ({ ...prev, positions: updatedRoles }));
  };

  return (
    <div className="m-auto flex w-full flex-col gap-2 px-2 py-10 sm:w-screen-sm md:w-screen-md md:flex-row lg:w-screen-lg xl:max-w-screen-xl">
      {/* RolesFilter */}
      <div className="order-1 hidden md:order-none md:mt-[50px] md:block md:flex-col">
        <RolesFilter
          roles={postFilter.positions}
          onChangeRoles={handleRolesChange}
        />
      </div>

      {/* NarrowRolesFilter */}
      <div className="order-1 block w-full md:order-none md:hidden">
        <NarrowRolesFilter
          roles={postFilter.positions}
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
            onChangeFilters={setFilterElements}
          />
        </div>
        <LandingPostView
          postFilter={postFilter}
          setShowSignInModal={setShowSignInModal}
        />
      </div>
    </div>
  );
};
