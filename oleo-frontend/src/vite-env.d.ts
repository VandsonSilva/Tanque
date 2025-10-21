/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // a variável que você criou no Vercel
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
