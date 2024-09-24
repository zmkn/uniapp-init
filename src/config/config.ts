const runtimeEnv = process.env.VITE_RUNTIME_ENV ?? "";
const webUrlPrefix = process.env.VITE_WEB_URL ?? "";
const apiUrlPrefix = process.env.VITE_API_SERVER ?? "";

export default {
  runtimeEnv,
  webUrlPrefix,
  apiUrlPrefix,
};
