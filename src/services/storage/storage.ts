export class Storage {
  private constructor() {}

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.GetStorageOptions = {
        key,
        success(result: UniNamespace.GetStorageSuccess) {
          resolve(result.data);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.getStorage(options);
    });
  }

  getSync(key: string): any {
    return uni.getStorageSync(key);
  }

  set(key: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.SetStorageOptions = {
        key,
        data,
        success(result: any) {
          resolve(result);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.setStorage(options);
    });
  }

  setSync(key: string, data: any) {
    uni.setStorageSync(key, data);
  }

  remove(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.RemoveStorageOptions = {
        key,
        success(result: any) {
          resolve(result);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.removeStorage(options);
    });
  }

  removeSync(key: string) {
    uni.removeStorageSync(key);
  }

  getInfo(): Promise<UniNamespace.GetStorageInfoSuccess> {
    return new Promise((resolve, reject) => {
      const options: UniNamespace.GetStorageInfoOptions = {
        success(result: UniNamespace.GetStorageInfoSuccess) {
          resolve(result);
        },
        fail(result: any) {
          reject(result);
        },
      };
      uni.getStorageInfo(options);
    });
  }

  getInfoSync(): UniNamespace.GetStorageInfoSuccess {
    return uni.getStorageInfoSync();
  }

  clearAll() {
    uni.clearStorage();
  }

  clearAllSync() {
    uni.clearStorageSync();
  }

  private static _instance?: Storage;

  static getInstance(): Storage {
    if (!this._instance) {
      this._instance = new Storage();
    }
    return this._instance;
  }
}
