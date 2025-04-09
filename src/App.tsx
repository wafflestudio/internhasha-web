import '@/index.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

import {
  type ExternalCallParams,
  type ExternalFileCallParams,
  implApi,
} from '@/api';
import { implExternalApi } from '@/api/client';
import { implApplicantService } from '@/feature/applicant';
import { implAuthService } from '@/feature/auth';
import { implCoffeeChatService } from '@/feature/coffeeChat';
import { implCompanyService } from '@/feature/company';
import { implPostService } from '@/feature/post';
import { ApplicantCoffeeChatDetailPage } from '@/pages/ApplicantCoffeeChatDetailPage';
import { ApplicantMyPage } from '@/pages/ApplicantMyPage';
import { ChangePasswordPage } from '@/pages/ChangePasswordPage';
import { CompanyCoffeeChatDetailPage } from '@/pages/CompanyCoffeeChatDetailPage';
import { CompanyMyPage } from '@/pages/CompanyMyPage';
import { CreateApplicantProfilePage } from '@/pages/CreateApplicantProfilePage';
import { CreateCoffeeChatPage } from '@/pages/CreateCoffeeChatPage';
import { CreateCompanyPage } from '@/pages/CreateCompanyPage';
import { CreatePostPage } from '@/pages/CreatePostPage';
import { EmailVerifyPage } from '@/pages/EmailVerifyPage';
import { LandingPage } from '@/pages/LandingPage';
import { PatchApplicantProfilePage } from '@/pages/PatchApplicantProfilePage';
import { PatchCompanyProfilePage } from '@/pages/PatchCompanyProfilePage';
import { PostDetailPage } from '@/pages/PostDetailPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpCompletePage } from '@/pages/SignUpCompletePage';
import { SignUpPage } from '@/pages/SignUpPage';
import { AuthCompanySwitchRoute } from '@/shared/auth/AuthAdminSwitchRoute';
import { ProtectedRoute } from '@/shared/auth/ProtectedRoute';
import { ReissueRoute } from '@/shared/auth/ReissueRoute';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { UserContext } from '@/shared/context/UserContext';
import { implFileService } from '@/shared/file/fileService';
import { implRoleStateRepository } from '@/shared/role/state';
import { PATH } from '@/shared/route/constants';
import { implTokenStateRepository } from '@/shared/token/state';

const RouterProvider = () => {
  return (
    <Routes>
      <Route path={PATH.SIGN_IN} element={<SignInPage />} />
      <Route path={PATH.RESET_PASSWORD} element={<ResetPasswordPage />} />
      <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
      <Route path={PATH.VERIFY_EMAIL} element={<EmailVerifyPage />} />
      <Route path={PATH.SIGN_UP_COMPLETE} element={<SignUpCompletePage />} />
      <Route element={<ReissueRoute />}>
        <Route path={PATH.INDEX} element={<LandingPage />} />
        <Route path={PATH.POST_DETAIL} element={<PostDetailPage />} />
        <Route element={<ProtectedRoute role="SIGN_IN" />}>
          <Route
            path={PATH.MY_PAGE}
            element={
              <AuthCompanySwitchRoute
                nonCompanyPage={<ApplicantMyPage />}
                companyPage={<CompanyMyPage />}
              />
            }
          />
          <Route
            path={PATH.COFFEE_CHAT_DETAIL}
            element={
              <AuthCompanySwitchRoute
                nonCompanyPage={<ApplicantCoffeeChatDetailPage />}
                companyPage={<CompanyCoffeeChatDetailPage />}
              />
            }
          />
          <Route path={PATH.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
        </Route>
        <Route element={<ProtectedRoute role="APPLICANT" />}>
          <Route
            path={PATH.CREATE_COFFEE_CHAT}
            element={<CreateCoffeeChatPage />}
          />
          <Route
            path={PATH.CREATE_PROFILE}
            element={<CreateApplicantProfilePage />}
          />
          <Route
            path={PATH.PATCH_PROFILE}
            element={<PatchApplicantProfilePage />}
          />
        </Route>
        <Route element={<ProtectedRoute role="COMPANY" />}>
          <Route path={PATH.CREATE_POST} element={<CreatePostPage />} />
          <Route path={PATH.CREATE_COMPANY} element={<CreateCompanyPage />} />
          <Route
            path={PATH.PATCH_COMPANY}
            element={<PatchCompanyProfilePage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'APPLICANT' | 'COMPANY' | null>(null);
  const [id, setId] = useState<string | null>(null);

  const ENV = useGuardContext(EnvContext);
  const tokenStateRepository = implTokenStateRepository({ setToken });
  const roleStateRepository = implRoleStateRepository({ setRole, setId });

  const localServerCall = async (content: ExternalCallParams) => {
    const response = await fetch(`/api/${content.path}`, {
      method: content.method,
      headers: content.headers,
      ...(content.body !== undefined
        ? { body: JSON.stringify(content.body) }
        : {}),
    });

    const echoRegex = /^echo\/.*$/;

    if (echoRegex.test(content.path)) {
      const responseText = (await response.text().catch(() => null)) as string;
      const responseBody = {
        message: responseText,
      };

      return {
        status: response.status,
        data: responseBody,
      };
    }

    const responseBody = (await response.json().catch(() => null)) as unknown;

    if (!response.ok) {
      if (response.status === 401) {
        tokenStateRepository.removeToken();
      }
    }
    return {
      status: response.status,
      data: responseBody,
    };
  };

  const externalServerCall = async (
    content: ExternalFileCallParams,
    returnFile: boolean = false,
  ) => {
    const getBody = (body: Record<string, unknown> | File | undefined) => {
      if (body === undefined) {
        return undefined;
      }
      if (body instanceof File) {
        return body;
      }
      return JSON.stringify(body);
    };

    const response = await fetch(content.path, {
      method: content.method,
      headers: content.headers,
      ...(getBody(content.body) !== undefined
        ? { body: getBody(content.body) }
        : {}),
    });

    if (returnFile) {
      const responseBlob = (await response.blob().catch(() => null)) as Blob;
      const contentType = response.headers.get('Content-Type');
      return {
        status: response.status,
        data: { blob: responseBlob, type: contentType },
      };
    }
    const responseBody = (await response.json().catch(() => null)) as unknown;
    return {
      status: response.status,
      data: responseBody,
    };
  };

  const apis = implApi({
    externalCall: localServerCall,
  });

  const externalApis = implExternalApi({
    externalFileCall: externalServerCall,
  });

  const services = {
    authService: implAuthService({
      apis,
      tokenStateRepository,
      roleStateRepository,
    }),
    postService: implPostService({ apis }),
    coffeeChatService: implCoffeeChatService({ apis }),
    fileService: implFileService({ apis, externalApis }),
    applicantService: implApplicantService({ apis }),
    companyService: implCompanyService({ apis }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={services}>
        <UserContext.Provider value={{ role, id }}>
          <TokenContext.Provider value={{ token }}>
            <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
              <RouterProvider />
            </GoogleOAuthProvider>
          </TokenContext.Provider>
        </UserContext.Provider>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
