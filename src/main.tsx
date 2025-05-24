import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { App } from '@/App';
import { EnvContext } from '@/shared/context/EnvContext';

const root = document.getElementById('root');

if (root === null) throw new Error('Root element not found');

const ENV = {
  APP_ENV: import.meta.env.MODE as 'prod' | 'dev' | 'mock',
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  SHOW_MODAL_SEASON: import.meta.env.VITE_SHOW_MODAL_SEASON === 'true',
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
