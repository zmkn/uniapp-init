import URI from "urijs";
import { Config } from "../../config";
import { Storage } from "../storage";

export class RequestUri {
  private _storage = Storage.getInstance();
  private _defaultApiUrlPrefix = Config.apiUrlPrefix;

  private constructor() {}

  complete(url: string): string {
    let uri = new URI(url);
    if (!uri.origin()) {
      return `${this.getApiUrlPrefix()}${url}`;
    }
    return url;
  }

  getApiUrlPrefix(): string {
    return this.getCacheApiUrlPrefix() || this.getDefaultApiUrlPrefix();
  }

  getDefaultApiUrlPrefix(): string {
    return this._defaultApiUrlPrefix;
  }

  getCacheApiUrlPrefix(): string {
    return this._storage.getSync("apiUrlPrefix");
  }

  setCacheApiUrlPrefix(apiUrlPrefix: string) {
    this._storage.setSync("apiUrlPrefix", apiUrlPrefix);
  }

  private static _instance?: RequestUri;

  static getInstance(): RequestUri {
    if (!this._instance) {
      this._instance = new RequestUri();
    }
    return this._instance;
  }
}
