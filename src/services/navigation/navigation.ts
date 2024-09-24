export class Navigation {
  private constructor() {}

  formatUrl(url: string): string {
    if (!url.startsWith("/")) {
      url = `/${url}`;
    }
    return url;
  }

  // 保留当前页面，跳转到应用内的某个页面
  navigateTo(
    url: string,
    animationType?: Navigation.EnterAnimationType,
    animationDuration?: number,
    events?: any
  ): Promise<UniNamespace.NavigateToSuccessOptions> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.NavigateToOptions = {
        url: this.formatUrl(url),
        animationType,
        animationDuration,
        events,
        success(result: UniNamespace.NavigateToSuccessOptions) {
          resolve(result);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.navigateTo(options);
    });
  }

  // 关闭当前页面，跳转到应用内的某个页面
  redirectTo(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.RedirectToOptions = {
        url: this.formatUrl(url),
        success(result: any) {
          resolve(result);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.redirectTo(options);
    });
  }

  // 关闭所有页面，打开到应用内的某个页面
  reLaunch(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.ReLaunchOptions = {
        url: this.formatUrl(url),
        success(result: any) {
          resolve(result);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.reLaunch(options);
    });
  }

  // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  switchTab(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.SwitchTabOptions = {
        url: this.formatUrl(url),
        success(result: any) {
          resolve(result);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.switchTab(options);
    });
  }

  // 关闭当前页面，返回上一页面或多级页面
  navigateBack(
    delta: number = 1,
    animationType?: Navigation.ExitAnimationType,
    animationDuration?: number
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.NavigateBackOptions = {
        delta,
        animationType,
        animationDuration,
        success(result: any) {
          resolve(result);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.navigateBack(options);
    });
  }

  // 预加载页面
  preloadPage(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.PreloadPageOptions = {
        url: this.formatUrl(url),
        success(result: any) {
          resolve(result);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.preloadPage(options);
    });
  }

  // 取消预载页面，仅App-nvue支持
  unPreloadPage(url: string) {
    const options: UniNamespace.UnPreloadPageOptions = {
      url: this.formatUrl(url),
    };
    uni.unPreloadPage(options);
  }

  // 获取所有页面实例
  getPages() {
    return getCurrentPages();
  }

  // 获取当前或之前的页面
  getPage(prevNumber = 0) {
    const pages = this.getPages();
    const prevPage = pages[pages.length - 1 - prevNumber];
    // #ifdef H5
    return prevPage;
    // #endif
    return prevPage.$vm;
  }

  // 重定向到首页页面
  toIndex() {
    return this.switchTab("/pages/index/index");
  }

  // 重定向到登录页面
  toLogin() {
    return this.switchTab("/pages/index/index");
  }

  // 重定向到无网络页面
  toNoNetwork() {
    return this.navigateTo("/pages/state/network");
  }

  private static _instance?: Navigation;

  static getInstance(): Navigation {
    if (!this._instance) {
      this._instance = new Navigation();
    }
    return this._instance;
  }
}
