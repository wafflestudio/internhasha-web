import { useState } from 'react';

import { SignInForBookmarkModal } from '@/components/modal/SignInForBookmarkModal';
import { PageLayout } from '@/components/ui/layout';
import type { PostFilter } from '@/entities/post';
import type { PostQuery } from '@/entities/route';
import { LandingPageView } from '@/feature/post';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useRouteQueryParams } from '@/shared/route/useRouteParams';

export const LandingPage = () => {
  const queryParams = useRouteQueryParams() as PostQuery | null;
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

  const [showSignInModal, setShowSignInModal] = useState(false);

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  return (
    <PageLayout>
      <LandingPageView
        postFilter={postFilter}
        setPostFilter={setPostFilter}
        setShowSignInModal={setShowSignInModal}
        handleQueryChange={handleQueryChange}
      />
      {showSignInModal && <SignInForBookmarkModal onClose={closeSignInModal} />}
    </PageLayout>
  );
};
