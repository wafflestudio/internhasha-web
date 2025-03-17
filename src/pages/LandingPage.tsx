import { useState } from 'react';

import { SignInForBookmarkModal } from '@/components/modal/SignInForBookmarkModal';
import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { FilterElements, JobMinorCategory } from '@/entities/post';
import {
  FilterSection,
  NarrowRolesFilter,
  RolesFilter,
} from '@/feature/landing';
import { LandingPostView } from '@/feature/landing';

export const LandingPage = () => {
  const [filterElements, setFilterElements] = useState<FilterElements>({
    roles: undefined,
    investmentMax: undefined,
    investmentMin: undefined,
    series: undefined,
    pathStatus: undefined,
    order: undefined,
  });
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleRolesChange = (updatedRoles: JobMinorCategory[]) => {
    setFilterElements((prev) => ({ ...prev, roles: updatedRoles }));
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-grey-50">
        {/* 헤더 */}
        <GlobalNavigationBar />

        {/* 메인 컨텐츠 */}
        <div className="m-auto flex w-full flex-col gap-2 px-2 py-10 sm:w-screen-sm md:w-screen-md md:flex-row lg:w-screen-lg xl:max-w-screen-xl">
          {/* RolesFilter */}
          <div className="order-1 hidden md:order-none md:mt-[50px] md:block md:flex-col">
            <RolesFilter
              roles={filterElements.roles}
              onChangeRoles={handleRolesChange}
            />
          </div>

          {/* NarrowRolesFilter */}
          <div className="order-1 block w-full md:order-none md:hidden">
            <NarrowRolesFilter
              roles={filterElements.roles}
              onChangeRoles={handleRolesChange}
            />
          </div>

          {/* 게시글 리스트 및 상단 필터 */}
          <div className="order-2 flex-1 px-2 lg:order-none">
            <h2 className="text-2xl font-bold">인턴 공고</h2>
            {/* 상단 필터 섹션 */}
            <div className="flex items-center justify-between py-6">
              <FilterSection
                filterElements={filterElements}
                onChangeFilters={setFilterElements}
              />
            </div>
            <LandingPostView
              filterElements={filterElements}
              setShowSignInModal={setShowSignInModal}
            />
          </div>
        </div>
      </div>
      {showSignInModal && <SignInForBookmarkModal onClose={closeSignInModal} />}
    </>
  );
};
