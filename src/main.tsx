import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { App } from './App';

const root = document.getElementById('root');

if (root === null) throw new Error('Root element not found');

const ENV = {
  APP_ENV: import.meta.env.MODE as 'prod' | 'dev' | 'mock',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
};

async function enableMocking() {
  if (ENV.APP_ENV === 'mock') {
    const { worker } = await import('@/shared/mocks');

    return worker.start();
  }
  return;
}

void enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
