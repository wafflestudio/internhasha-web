import { useState } from 'react';

import { SignInForBookmarkModal } from '@/components/modal/SignInForBookmarkModal';
import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import { LandingPageView } from '@/feature/post';

export const LandingPage = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-grey-50">
        <GlobalNavigationBar />
        <LandingPageView setShowSignInModal={setShowSignInModal} />
      </div>
      {showSignInModal && <SignInForBookmarkModal onClose={closeSignInModal} />}
    </>
  );
};
