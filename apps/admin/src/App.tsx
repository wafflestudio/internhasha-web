import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ExternalCallParams, implApi } from '@waffle/api';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

import { PATH } from '@/entities/route';
import { implAuthService } from '@/feature/auth/service/authService';
import { implEchoService } from '@/feature/echo';
import { EchoPage } from '@/pages/EchoPage';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { implTokenLocalStorageRepository } from '@/shared/token/tokenLocalStorageRepository';
import { implTokenStateRepository } from '@/shared/token/tokenStateRepository';

const RouterProvider = () => {
  return (
    <Routes>
      <Route path={PATH.INDEX} element={<LandingPage />} />
      <Route path={PATH.ECHO} element={<EchoPage />} />
      <Route path={PATH.LOGIN} element={<LoginPage />} />
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
  const ENV = useGuardContext(EnvContext);

  const tokenLocalStorageRepository = implTokenLocalStorageRepository();

  const [token, setToken] = useState<string | null>(
    tokenLocalStorageRepository.getToken,
  );
  const tokenStateRepository = implTokenStateRepository({ setToken });

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

    if (!response.ok) {
      if (response.status === 401) {
        tokenStateRepository.removeToken();
        tokenLocalStorageRepository.removeToken();
      }
    }

    return {
      status: response.status,
      data: responseBody,
    };
  };

  const apis = implApi({ externalCall });

  const services = {
    echoService: implEchoService({ apis }),
    authService: implAuthService({
      apis,
      tokenLocalStorageRepository,
      tokenStateRepository,
    }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={services}>
        <TokenContext.Provider value={{ token }}>
          <RouterProvider />
        </TokenContext.Provider>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
