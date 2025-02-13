import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { App } from '@/App';
import { EnvContext } from '@/shared/context/EnvContext';

const root = document.getElementById('root');

if (root === null) throw new Error('Root element not found');

const ENV = {
  APP_ENV: import.meta.env.MODE as 'prod' | 'dev' | 'mock',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};

async function enableMocking() {
  if (ENV.APP_ENV === 'mock') {
    const { worker } = await import('@/mocks');

    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  return;
}

void enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <EnvContext.Provider value={ENV}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EnvContext.Provider>
    </StrictMode>,
  );
});
