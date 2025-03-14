import { useState } from 'react';

import { SignUpModal } from '@/components/modal/SignUpModal';
import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApplicantLocalLogInForm, CompanyLocalLogInForm } from '@/feature/auth';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignInPage = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { toSignUp, toFindAccount } = useRouteNavigation();

  const onCloseModal = () => {
    setShowSignUpModal(false);
  };

  return (
    <ModalBackgroundWithHeader>
      <div className="flex flex-col gap-[46px]">
        <h2 className="text-2xl font-bold text-center">로그인</h2>
        <Tabs defaultValue="APPLICANT" className="flex flex-col gap-[30px]">
          <TabsList className="flex p-[6px] rounded-[10px] bg-grey-light">
            <TabsTrigger value="APPLICANT" variant="button" className="flex-1">
              학생 회원
            </TabsTrigger>
            <TabsTrigger value="COMPANY" variant="button" className="flex-1">
              회사 회원
            </TabsTrigger>
          </TabsList>
          <TabsContent value="APPLICANT">
            <ApplicantLocalLogInForm setShowSignUpModal={setShowSignUpModal} />
          </TabsContent>
          <TabsContent value="COMPANY">
            <CompanyLocalLogInForm setShowSignUpModal={setShowSignUpModal} />
          </TabsContent>
          <section className="flex flex-col gap-[10px]">
            <div className="flex justify-end">
              <a
                className="text-grey-normal-active text-sm underline-offset-4 hover:cursor-pointer hover:underline hover:decoration-grey-normal-active"
                onClick={toFindAccount}
              >
                비밀번호 찾기
              </a>
            </div>
          </section>
          <section className="flex flex-col w-full gap-[18px]">
            <div className="text-center">
              <p className="text-sm text-grey-normal">
                아직 계정이 없으신가요?{' '}
                <a
                  className="text-grey-dark-active underline-offset-4 hover:cursor-pointer hover:underline hover:decoration-grey-dark-active"
                  onClick={() => {
                    toSignUp({});
                  }}
                >
                  회원가입
                </a>
              </p>
            </div>
          </section>
        </Tabs>
      </div>
      {showSignUpModal && <SignUpModal onClose={onCloseModal} />}
    </ModalBackgroundWithHeader>
  );
};
