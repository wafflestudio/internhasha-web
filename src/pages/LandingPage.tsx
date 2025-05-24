import { useState } from 'react';

import { FullNoticeModal } from '@/components/modal/FullNoticeModal';
import { SignInForBookmarkModal } from '@/components/modal/SignInForBookmarkModal';
import { PageLayout } from '@/components/ui/layout';
import type { PostFilter } from '@/entities/post';
import type { PostQuery } from '@/entities/route';
import { LandingPageView } from '@/feature/post';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useRouteQueryParams } from '@/shared/route/useRouteParams';

export const LandingPage = () => {
  const rawQueryParams = useRouteQueryParams() as PostQuery | null;
  const queryParams =
    rawQueryParams !== null
      ? {
          ...rawQueryParams,
          page:
            rawQueryParams.page !== undefined
              ? Number(rawQueryParams.page)
              : undefined,
          order:
            rawQueryParams.order !== undefined
              ? (Number(rawQueryParams.order) as 0 | 1)
              : undefined,
        }
      : null;
  const { storageService } = useGuardContext(ServiceContext);
  const { SHOW_MODAL, SHOW_MODAL_SEASON } = useGuardContext(EnvContext);
  const { toMain } = useRouteNavigation();
  const [postFilter, setPostFilter] = useState<PostFilter>(
    queryParams !== null
      ? queryParams
      : {
          roles: undefined,
          isActive: undefined,
          domains: undefined,
          order: undefined,
          page: undefined,
        },
  );

  const handleQueryChange = ({ query }: { query: PostFilter }) => {
    toMain({ query });
  };

  const [showModal, setShowModal] = useState<
    'SIGN_IN_FOR_BOOKMARK' | 'SUGGEST' | 'NONE'
  >(
    SHOW_MODAL &&
      SHOW_MODAL_SEASON !== null &&
      !storageService.checkModalClosed({ envDate: SHOW_MODAL_SEASON })
      ? 'SUGGEST'
      : 'NONE',
  );
  const closeModal = () => {
    setShowModal('NONE');
  };

  return (
    <PageLayout>
      <LandingPageView
        postFilter={postFilter}
        setPostFilter={setPostFilter}
        showSignInModal={() => {
          setShowModal('SIGN_IN_FOR_BOOKMARK');
        }}
        handleQueryChange={handleQueryChange}
      />
      {showModal === 'SIGN_IN_FOR_BOOKMARK' && (
        <SignInForBookmarkModal onClose={closeModal} />
      )}
      {showModal === 'SUGGEST' && <FullNoticeModal onClose={closeModal} />}
    </PageLayout>
  );
};
