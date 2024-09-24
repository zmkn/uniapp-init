declare namespace Http {
  interface Fail extends UniNamespace.GeneralCallbackResult {}

  interface Response<T>
    extends Omit<UniNamespace.RequestSuccessCallbackResult, "data"> {
    data: T;
  }

  interface ResponseBody<T> {
    readonly status: number;
    readonly data?: T;
    readonly message?: string;
  }

  interface RequestOptions
    extends Omit<UniNamespace.RequestOptions, "fail" | "success"> {
    fail?: (result: Fail) => void;
    success?: (result: Response<any>) => void;
  }

  interface RequestTimer {
    timeout: boolean;
    timestamp: number;
  }

  interface HttpClientDefaultOptions {
    duration?: number;
    spinnerDelay?: number;
    useSpinner?: boolean;
    useDefaultData?: boolean;
    useResponseToast?: boolean;
    useResponseCatchToast?: boolean;
    useRequestCancelToast?: boolean;
    useRequestTimeoutToast?: boolean;
    useResponseRedirectLogin?: boolean;
  }

  interface HttpClientDefaultRequestOptions {
    timeout?: number;
    withCredentials?: boolean;
    data?: AnyObject;
    header?: AnyObject;
  }

  interface HttpClientRequestOptions extends RequestOptions {
    params?: AnyObject;
  }

  interface HttpClientSimpleRequestOptions
    extends Omit<HttpClientRequestOptions, "method"> {}

  interface HttpClientSimpleGetRequestOptions
    extends Omit<HttpClientSimpleRequestOptions, "data"> {}

  type HttpClientRequest = [UniNamespace.RequestTask, RequestTimer];
}
