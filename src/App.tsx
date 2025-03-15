import './index.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

import {
  type ExternalCallParams,
  type ExternalFileCallParams,
  implApi,
} from '@/api';
import type { RolesFilterCategory } from '@/entities/filter';
import { PATH } from '@/entities/route';
import { implAuthService } from '@/feature/auth';
import { implCoffeeChatService } from '@/feature/coffeeChat';
import { implLandingService } from '@/feature/landing/service/landingService';
import { implPostService } from '@/feature/post';
import { implUserService } from '@/feature/user';
import { implVentureCapitalService } from '@/feature/ventureCapital';
import { CoffeeChatDetailPage } from '@/pages/CoffeeChatDetailPage';
import { CreateCoffeeChatPage } from '@/pages/CreateCoffeeChatPage';
import { CreateCompanyPage } from '@/pages/CreateCompanyPage';
import { CreatePostPage } from '@/pages/CreatePostPage';
import { CreateProfilePage } from '@/pages/CreateProfilePage';
import { EmailVerifyPage } from '@/pages/EmailVerifyPage';
import { FindAccountPage } from '@/pages/FindAccountPage';
import { LandingPage } from '@/pages/LandingPage';
import { MyPage } from '@/pages/MyPage';
import { PostDetailPage } from '@/pages/PostDetailPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpCompletePage } from '@/pages/SignUpCompletePage';
import { SignUpPage } from '@/pages/SignUpPage';
import { VentureCapitalMyPage } from '@/pages/VentureCapitalMyPage';
import { ApplicantProtectedRoute } from '@/shared/auth/ApplicantProtectedRoute';
import { AuthCompanySwitchRoute } from '@/shared/auth/AuthAdminSwitchRoute';
import { AuthProtectedRoute } from '@/shared/auth/AuthProtectedRoute';
import { CompanyProtectedRoute } from '@/shared/auth/CompanyProtectedRoute';
import { ReissueRoute } from '@/shared/auth/ReissueRoute';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { RolesFilterContext } from '@/shared/context/RolesFilterContext';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { implFileService } from '@/shared/file/fileService';
import { implRoleStateRepository } from '@/shared/role/state';
import { implRolesFilterLocalStorageRepository } from '@/shared/rolesFilter/localstorage';
import { implRolesFilterStateRepository } from '@/shared/rolesFilter/state';
import { implTokenStateRepository } from '@/shared/token/state';

import { implExternalApi } from './api/client';
import { RoleContext } from './shared/context/RoleContext';

const RouterProvider = () => {
  return (
    <Routes>
      <Route element={<ReissueRoute />}>
        <Route path={PATH.INDEX} element={<LandingPage />} />
      </Route>
      <Route path={PATH.POST_DETAIL} element={<PostDetailPage />} />
      <Route path={PATH.SIGN_IN} element={<SignInPage />} />
      <Route path={PATH.FIND_ACCOUNT} element={<FindAccountPage />} />
      <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
      <Route path={PATH.VERIFY_EMAIL} element={<EmailVerifyPage />} />
      <Route path={PATH.SIGN_UP_COMPLETE} element={<SignUpCompletePage />} />
      <Route element={<AuthProtectedRoute />}>
        <Route
          path={PATH.MY_PAGE}
          element={
            <AuthCompanySwitchRoute
              nonCompanyPage={<MyPage />}
              companyPage={<VentureCapitalMyPage />}
            />
          }
        />
        <Route
          path={PATH.COFFEE_CHAT_DETAIL}
          element={<CoffeeChatDetailPage />}
        />
      </Route>
      <Route element={<ApplicantProtectedRoute />}>
        <Route
          path={PATH.CREATE_COFFEE_CHAT}
          element={<CreateCoffeeChatPage />}
        />
        <Route path={PATH.CREATE_PROFILE} element={<CreateProfilePage />} />
      </Route>
      <Route element={<CompanyProtectedRoute />}>
        <Route path={PATH.CREATE_POST} element={<CreatePostPage />} />
        <Route path={PATH.CREATE_COMPANY} element={<CreateCompanyPage />} />
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
  const rolesFilterLocalStorageRepository =
    implRolesFilterLocalStorageRepository();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'APPLICANT' | 'COMPANY' | null>(null);
  const [activeCategory, setActiveCategory] = useState<RolesFilterCategory>(
    rolesFilterLocalStorageRepository.getActiveJobCategory,
  );
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(
    rolesFilterLocalStorageRepository.getIsFilterDropdownOpen,
  );

  const ENV = useGuardContext(EnvContext);
  const tokenStateRepository = implTokenStateRepository({ setToken });
  const roleStateRepository = implRoleStateRepository({ setRole });
  const rolesFilterStateRepository = implRolesFilterStateRepository({
    setActiveCategory,
    setIsFilterDropdownOpen,
  });

  const localServerCall = async (content: ExternalCallParams) => {
    const response = await fetch(
      `${ENV.APP_ENV === 'prod' ? ENV.API_BASE_URL : ''}/api/${content.path}`,
      {
        method: content.method,
        headers: content.headers,
        ...(content.body !== undefined
          ? { body: JSON.stringify(content.body) }
          : {}),
      },
    );

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

  const externalServerCall = async (content: ExternalFileCallParams) => {
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
    userService: implUserService({ apis }),
    coffeeChatService: implCoffeeChatService({ apis }),
    fileService: implFileService({ apis, externalApis }),
    landingService: implLandingService({
      rolesFilterLocalStorageRepository,
      rolesFilterStateRepository,
    }),
    ventureCapitalService: implVentureCapitalService({ apis }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={services}>
        <RoleContext.Provider value={{ role }}>
          <TokenContext.Provider value={{ token }}>
            <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
              <RolesFilterContext.Provider
                value={{ activeCategory, isFilterDropdownOpen }}
              >
                <RouterProvider />
              </RolesFilterContext.Provider>
            </GoogleOAuthProvider>
          </TokenContext.Provider>
        </RoleContext.Provider>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
