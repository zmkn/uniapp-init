export class Client {
  private constructor() {}

  // 退出APP
  quit() {
    // #ifdef APP-PLUS
    plus.runtime.quit();
    // #endif
  }

  // 重启APP
  restart() {
    // #ifdef APP-PLUS
    plus.runtime.restart();
    // #endif
  }

  // 获取客户端 appid
  getAppid(): string | undefined {
    // #ifdef APP-PLUS
    return plus.runtime.appid;
    // #endif
  }

  // 获取客户端平台
  getPlatform(): string {
    return uni.getSystemInfoSync().platform;
  }

  // 获取客户端 version
  getVersion(): string | undefined {
    // #ifdef APP-PLUS
    return plus.runtime.version;
    // #endif
  }

  // 获取客户端 versionCode
  getVersionCode(): number | undefined {
    // #ifdef APP-PLUS
    const versionCode = plus.runtime.versionCode;
    if (typeof versionCode !== "undefined") {
      return +versionCode;
    }
    // #endif
  }

  // 获取客户端5+运行环境的内部版本号
  get5PlusRuntimeVersion(): string | undefined {
    // #ifdef APP-PLUS
    return plus.runtime.innerVersion;
    // #endif
  }

  // 获取客户端uni-app运行环境的版本号
  getUniRuntimeVersion(): string | undefined {
    // #ifdef APP-PLUS
    return plus.runtime.uniVersion;
    // #endif
  }

  // 拉取 APP 信息
  getAppInfo(): Promise<PlusRuntimeWidgetInfo> {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      const appid = this.getAppid();
      if (typeof appid === "undefined") {
        reject(new Error("client appId is undefined"));
      } else {
        plus.runtime.getProperty(appid, (result: PlusRuntimeWidgetInfo) => {
          resolve(result);
        });
      }
    });
    // #endif
  }

  private static _instance?: Client;

  static getInstance(): Client {
    if (!this._instance) {
      this._instance = new Client();
    }
    return this._instance;
  }
}
