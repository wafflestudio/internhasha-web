import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router';

import { PATH } from '@/entities/route';
import { EchoPage } from '@/pages/EchoPage';
import { LandingPage } from '@/pages/LandingPage';
import { implEchoService } from '@/service/echoService';
import { type ExternalCallParams, implApi } from '@/shared/api';
import { ServiceContext } from '@/shared/context/ServiceContext';

const RouterProvider = () => {
  return (
    <Routes>
      <Route path={PATH.INDEX} element={<LandingPage />} />
      <Route path={PATH.ECHO} element={<EchoPage />} />
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
  const ENV = {
    APP_ENV: import.meta.env.MODE as 'prod' | 'dev',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  };

  const externalCall = async (content: ExternalCallParams) => {
    const response = await fetch(`${ENV.API_BASE_URL}/${content.path}`, {
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

    return {
      status: response.status,
      data: responseBody,
    };
  };

  const apis = implApi({ externalCall });
  const services = {
    echoService: implEchoService({ apis }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={services}>
        <RouterProvider />
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
