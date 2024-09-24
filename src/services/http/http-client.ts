import { Message } from "../../modules/message";
import { Spinner } from "../../modules/spinner";
import { Toast } from "../../modules/toast";
import { Navigation } from "../navigation";
import { RequestUri } from "./request-uri";

export class HttpClient {
  private _navigation = Navigation.getInstance();
  private _requestUri = RequestUri.getInstance();
  private _options: Http.HttpClientDefaultOptions = {
    duration: 0,
    spinnerDelay: 200,
    useSpinner: true,
    useDefaultData: true,
    useResponseToast: true,
    useResponseCatchToast: true,
    useRequestCancelToast: false,
    useRequestTimeoutToast: true,
    useResponseRedirectLogin: true,
  };
  private _requestOptions: Http.HttpClientDefaultRequestOptions = {
    timeout: 5000,
    withCredentials: true,
    data: {},
    header: {},
  };

  private createRequestId(): number {
    return Math.floor(Math.random() * Math.pow(10, 18));
  }

  private requestIsAbort(errorMessage: string): boolean {
    return errorMessage.indexOf("abort") !== -1;
  }

  private requestIsTimeout(errorMessage: string): boolean {
    return errorMessage.indexOf("timeout") !== -1;
  }

  private createRequest(
    options: Http.RequestOptions
  ): UniNamespace.RequestTask {
    const method = options.method;
    if (method === "GET" || method === "PUT" || method === "POST") {
      if ({}.toString.call(options.data) === "[object String]") {
        options.data = JSON.parse(options.data as string);
      }
    }
    return this.sendRequest(options);
  }

  private createRequestAsync<T>(
    options: Http.RequestOptions
  ): Promise<Http.Response<T>> {
    return new Promise((resolve, reject) => {
      options.fail = (error: Http.Fail) => {
        reject(error);
      };
      options.success = (response: Http.Response<T>) => {
        resolve(response);
      };
      this.createRequest(options);
    });
  }

  private sendRequest(options: Http.RequestOptions): UniNamespace.RequestTask {
    const id = this.createRequestId();
    options = this.requestInterceptor(options);
    options = this.responseCatchInterceptor(options, id);
    options = this.responseSuccessInterceptor(options, id);
    const request = uni.request(options) as unknown as UniNamespace.RequestTask;
    const timer: Http.RequestTimer = {
      timeout: false,
      timestamp: 0,
    };
    if (
      typeof this._options.duration !== "undefined" &&
      this._options.duration > 0
    ) {
      timer.timestamp = setTimeout(() => {
        timer.timeout = true;
        clearTimeout(timer.timestamp);
      }, this._options.duration) as unknown as number;
    }
    HttpClient.requests.set(id, [request, timer]);
    return request;
  }

  private sendRequestAsync<T>(
    options: Http.RequestOptions
  ): Promise<Http.Response<T>> {
    return new Promise((resolve, reject) => {
      options.fail = (error: Http.Fail) => {
        reject(error);
      };
      options.success = (response: Http.Response<T>) => {
        resolve(response);
      };
      this.sendRequest(options);
    });
  }

  private requestInterceptor(
    options: Http.RequestOptions
  ): Http.RequestOptions {
    options.url = this._requestUri.complete(options.url);
    options.method ?? (options.method = "GET");
    options.header ?? (options.header = {});
    options.header = Object.assign(
      {},
      this._requestOptions.header,
      options.header
    );
    options.method = options.method.toUpperCase() as any;
    options = Object.assign({}, this._requestOptions, options);
    if (this._options.useSpinner) {
      if (!HttpClient.spinner.isMount()) {
        HttpClient.spinner.mount(this._options.spinnerDelay);
      }
    }
    if (this._options.useDefaultData) {
      const data = Object.assign({}, this._requestOptions.data);
      if (typeof options.data === "undefined") {
        options.data = data;
      } else if ({}.toString.call(options.data) === "[object Object]") {
        options.data = Object.assign(data, options.data);
      } else if ({}.toString.call(options.data) === "[object  ]") {
        options.data = JSON.stringify(
          Object.assign(data, JSON.parse(options.data as string))
        );
      }
    }
    return options;
  }

  private responseCatchInterceptor(
    options: Http.RequestOptions,
    id: number
  ): Http.RequestOptions {
    const fail = options.fail;
    options.fail = (error: Http.Fail) => {
      this.responseFinishProcessor(id);
      if (this.requestIsAbort(error.errMsg)) {
        if (this._options.useRequestCancelToast) {
          const messageItem = HttpClient.message.get("600");
          const message = messageItem
            ? messageItem.statusText
            : HttpClient.message.get("0")!!.statusText;
          HttpClient.toast.create(message, {
            removed() {
              fail && fail(error);
            },
          });
        } else {
          fail && fail(error);
        }
      } else if (this.requestIsTimeout(error.errMsg)) {
        if (this._options.useRequestTimeoutToast) {
          const messageItem = HttpClient.message.get("601");
          const message = messageItem
            ? messageItem.statusText
            : HttpClient.message.get("0")!!.statusText;
          HttpClient.toast.create(message, {
            removed() {
              fail && fail(error);
            },
          });
        } else {
          fail && fail(error);
        }
      } else {
        if (this._options.useResponseCatchToast) {
          HttpClient.toast.create(error.errMsg, {
            removed() {
              fail && fail(error);
            },
          });
        } else {
          fail && fail(error);
        }
      }
    };
    return options;
  }

  private responseSuccessInterceptor(
    options: Http.RequestOptions,
    id: number
  ): Http.RequestOptions {
    const success = options.success;
    options.success = (response: Http.Response<any>) => {
      this.responseFinishProcessor(id);
      const statusCode = response.statusCode;
      if (statusCode === 200 || statusCode === 201) {
        const data = response.data as Http.ResponseBody<AnyObject>;
        const status = +data.status;
        if (status === 401 || status === 403) {
          if (this._options.useResponseRedirectLogin) {
            HttpClient.cancelAll();
            this._navigation.toLogin();
          } else {
            success && success(response);
          }
        } else if (status !== 1) {
          if (this._options.useResponseToast) {
            const messageItem = HttpClient.message.get(status.toString());
            const message = messageItem
              ? messageItem.statusText
              : data.message ?? HttpClient.message.get("0")!!.statusText;
            HttpClient.toast.create(message, {
              removed() {
                success && success(response);
              },
            });
          } else {
            success && success(response);
          }
        } else {
          success && success(response);
        }
      } else {
        if (this._options.useResponseToast) {
          const messageItem = HttpClient.message.get(statusCode.toString());
          const message = messageItem
            ? messageItem.statusText
            : HttpClient.message.get("0")!!.statusText;
          HttpClient.toast.create(message, {
            removed() {
              success && success(response);
            },
          });
        } else {
          success && success(response);
        }
      }
    };
    return options;
  }

  private responseFinishProcessor(id: number) {
    const httpClientRequest = HttpClient.requests.get(id);
    if (typeof httpClientRequest !== "undefined") {
      const timer = httpClientRequest[1];
      if (this._options.useSpinner) {
        if (
          typeof this._options.duration !== "undefined" &&
          this._options.duration > 0
        ) {
          if (!timer.timeout) {
            const createTimeoutHandler = () => {
              const timestamp = setTimeout(() => {
                clearTimeout(timestamp);
                if (timer.timeout) {
                  HttpClient.requests.has(id) && HttpClient.requests.delete(id);
                  if (
                    HttpClient.requests.size === 0 &&
                    HttpClient.spinner.isMount()
                  ) {
                    HttpClient.spinner.unmount();
                  }
                } else {
                  createTimeoutHandler();
                }
              }, 4);
            };
            createTimeoutHandler();
          } else {
            HttpClient.requests.has(id) && HttpClient.requests.delete(id);
            if (
              HttpClient.requests.size === 0 &&
              HttpClient.spinner.isMount()
            ) {
              HttpClient.spinner.unmount();
            }
          }
        } else {
          HttpClient.requests.has(id) && HttpClient.requests.delete(id);
          if (HttpClient.requests.size === 0 && HttpClient.spinner.isMount()) {
            HttpClient.spinner.unmount();
          }
        }
      } else {
        HttpClient.requests.has(id) && HttpClient.requests.delete(id);
        if (HttpClient.requests.size === 0 && HttpClient.spinner.isMount()) {
          HttpClient.spinner.unmount();
        }
      }
    }
  }

  static requests: Map<number, Http.HttpClientRequest> = new Map();

  static options: Http.HttpClientDefaultOptions = {
    duration: 0,
    spinnerDelay: 200,
    useSpinner: true,
    useDefaultData: true,
    useResponseToast: true,
    useResponseCatchToast: true,
    useRequestCancelToast: false,
    useRequestTimeoutToast: true,
    useResponseRedirectLogin: true,
  };

  static requestOptions: Http.HttpClientDefaultRequestOptions = {
    timeout: 5000,
    withCredentials: true,
    data: {},
    header: {},
  };

  static toast: Toast = new Toast();

  static spinner: Spinner = new Spinner();

  static message: Message = Message.getInstance();

  static cancel(httpClientRequest: Http.HttpClientRequest) {
    const keys = HttpClient.requests.keys();
    for (const key of keys) {
      if (HttpClient.requests.get(key) === httpClientRequest) {
        httpClientRequest[0].abort();
        HttpClient.requests.delete(key);
        break;
      }
    }
  }

  static cancelAll() {
    HttpClient.requests.forEach((item) => {
      item[0].abort();
    });
    HttpClient.requests.clear();
  }

  constructor(
    options: Http.HttpClientDefaultOptions = {},
    requestOptions: Http.HttpClientDefaultRequestOptions = {}
  ) {
    this._options = Object.assign({}, HttpClient.options, options);
    this._requestOptions = Object.assign(
      {},
      HttpClient.requestOptions,
      requestOptions
    );
    if (typeof requestOptions.data !== "undefined") {
      this._requestOptions.data = Object.assign(
        {},
        HttpClient.requestOptions.data,
        requestOptions.data
      );
    }
    if (typeof requestOptions.header !== "undefined") {
      this._requestOptions.header = Object.assign(
        {},
        HttpClient.requestOptions.header,
        requestOptions.header
      );
    }
  }

  get(options: Http.HttpClientSimpleGetRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "GET";
    if (typeof options.params !== "undefined") {
      newOptions.data = options.params;
    }
    return this.createRequest(newOptions);
  }

  getAsync<T>(options: Http.HttpClientSimpleGetRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "GET";
    if (typeof options.params !== "undefined") {
      newOptions.data = options.params;
    }
    return this.createRequestAsync<T>(newOptions);
  }

  put(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "PUT";
    return this.createRequest(newOptions);
  }

  putAsync<T>(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "PUT";
    return this.createRequestAsync<T>(newOptions);
  }

  post(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "POST";
    return this.createRequest(newOptions);
  }

  postAsync<T>(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "POST";
    return this.createRequestAsync<T>(newOptions);
  }

  head(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "HEAD";
    return this.createRequest(newOptions);
  }

  headAsync<T>(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "HEAD";
    return this.createRequestAsync<T>(newOptions);
  }

  trace(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "TRACE";
    return this.createRequest(newOptions);
  }

  traceAsync<T>(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "TRACE";
    return this.createRequestAsync<T>(newOptions);
  }

  delete(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "DELETE";
    return this.createRequest(newOptions);
  }

  deleteAsync<T>(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "DELETE";
    return this.createRequestAsync<T>(newOptions);
  }

  options(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "OPTIONS";
    return this.createRequest(newOptions);
  }

  optionsAsync<T>(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "OPTIONS";
    return this.createRequestAsync<T>(newOptions);
  }

  connect(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "CONNECT";
    return this.createRequest(newOptions);
  }

  connectAsync<T>(options: Http.HttpClientSimpleRequestOptions) {
    const newOptions: Http.RequestOptions = Object.assign({}, options);
    newOptions.method = "CONNECT";
    return this.createRequestAsync<T>(newOptions);
  }

  request(options: Http.HttpClientRequestOptions) {
    if (typeof options.method === "undefined") {
      options.method = "GET";
    }
    if (
      options.method!!.toLowerCase() === "get" &&
      typeof options.params !== "undefined"
    ) {
      options.data = options.params;
    }
    return this.sendRequest(options);
  }

  requestAsync(options: Http.HttpClientRequestOptions) {
    if (typeof options.method === "undefined") {
      options.method = "GET";
    }
    if (
      options.method!!.toLowerCase() === "get" &&
      typeof options.params !== "undefined"
    ) {
      options.data = options.params;
    }
    return this.sendRequestAsync(options);
  }
}
