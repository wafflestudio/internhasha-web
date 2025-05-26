/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_SHOW_MODAL: string;
  readonly VITE_SHOW_MODAL_SEASON: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
