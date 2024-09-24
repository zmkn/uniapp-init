import { ConfigEnv, UserConfig, defineConfig } from "vite";
import "./dotenv.config";

async function loadUniPluginModule() {
  const uni = await import("@dcloudio/vite-plugin-uni");
  return (uni.default as any).default || uni.default;
}

// https://vitejs.dev/config/
export default defineConfig(
  async ({ mode }: ConfigEnv): Promise<UserConfig> => {
    const uniPlugin = await loadUniPluginModule();
    return {
      plugins: [uniPlugin()],
      define: {
        "process.env": process.env,
        "process.env.VITE_RUNTIME_ENV": JSON.stringify(
          process.env.VITE_RUNTIME_ENV
        ),
        "process.env.VITE_API_SERVER": JSON.stringify(
          process.env.VITE_API_SERVER
        ),
        "process.env.VITE_WEB_URL": JSON.stringify(process.env.VITE_WEB_URL),
      },
    };
  }
);
