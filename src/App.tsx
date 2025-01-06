import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

import { PATH } from '@/entities/route';
import { EchoPage } from '@/pages/EchoPage';
import { EmailVerifyPage } from '@/pages/EmailVerifyPage';
import { LandingPage } from '@/pages/LandingPage';
import { LocalSignUpPage } from '@/pages/LocalSignUpPage';
import { SignInSelectPage } from '@/pages/SignInSelectPage';
import { SignUpSelectPage } from '@/pages/SignUpSelectPage';
import { implAuthService } from '@/service/authService';
import { implEchoService } from '@/service/echoService';
import { implPostService } from '@/service/postService.ts';
import { type ExternalCallParams, implApi } from '@/shared/api';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { implTokenLocalStorage } from '@/shared/token/localstorage';
import { implTokenState } from '@/shared/token/state';

const RouterProvider = () => {
  return (
    <Routes>
      <Route path={PATH.INDEX} element={<LandingPage />} />
      <Route path={PATH.ECHO} element={<EchoPage />} />
      <Route path={PATH.SIGN_IN_SELECT} element={<SignInSelectPage />} />
      <Route path={PATH.SIGN_UP_SELECT} element={<SignUpSelectPage />} />
      <Route path={PATH.SIGN_UP_LOCAL} element={<LocalSignUpPage />} />
      <Route path={PATH.VERIFY_EMAIL} element={<EmailVerifyPage />} />
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
  const ENV = useGuardContext(EnvContext);

  const externalCall = async (content: ExternalCallParams) => {
    const response = await fetch(
      `${ENV.APP_ENV === 'prod' ? ENV.API_BASE_URL : '/api'}/${content.path}`,
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

    return {
      status: response.status,
      data: responseBody,
    };
  };

  const apis = implApi({ externalCall });
  const tokenState = implTokenState({ setToken });
  const tokenLocalStorage = implTokenLocalStorage();
  const services = {
    echoService: implEchoService({ apis }),
    authService: implAuthService({ apis, tokenState, tokenLocalStorage }),
    postService: implPostService({ apis }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={services}>
        <TokenContext.Provider value={{ token }}>
          <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
            <RouterProvider />
          </GoogleOAuthProvider>
        </TokenContext.Provider>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
