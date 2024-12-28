import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PATH } from '@/entities/route';
import { implEchoService } from '@/feature/echo';
import { EchoPage } from '@/pages/EchoPage';
import { LandingPage } from '@/pages/LandingPage';
import { type ExternalCallParams, implApi } from '@/shared/api';
import { ServiceContext } from '@/shared/context/ServiceContext';

const publicRoutes = [
  {
    path: PATH.INDEX,
    element: <LandingPage />,
  },
  {
    path: PATH.ECHO,
    element: <EchoPage />,
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const routers = createBrowserRouter([...publicRoutes]);

export const App = () => {
  const ENV = {
    API_BASE_URL: 'https://www.survey-josha.site',
  };
  const externalCall = async (content: ExternalCallParams) => {
    const response = await fetch(`${ENV.API_BASE_URL}/${content.path}`, {
      method: content.method,
      headers: content.headers,
      ...(content.body !== undefined
        ? { body: JSON.stringify(content.body) }
        : {}),
    });

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
        <RouterProvider router={routers} />
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
