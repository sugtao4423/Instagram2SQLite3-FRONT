/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GET_JSON_URL: string
  readonly VITE_MEDIA_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
