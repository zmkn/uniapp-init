/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_RUNTIME_ENV?: string;
  readonly VITE_API_SERVER?: string;
  readonly VITE_WEB_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_RUNTIME_ENV?: string;
    readonly VITE_API_SERVER?: string;
    readonly VITE_WEB_URL?: string;
  }
}
