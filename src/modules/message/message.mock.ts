export const MESSAGES: Message.Messages = {
  "0": {
    code: "ERROR",
    status: 0,
    statusText: "未知错误",
  },
  "1": {
    code: "SUCCESS",
    status: 1,
    statusText: "成功",
  },
  "2": {
    code: "API_REQUEST_ERROR",
    status: 2,
    statusText: "接口请求出错，请稍候重试",
  },
  "3": {
    code: "NETWORK_OFFLINE",
    status: 3,
    statusText: "当前网络不可用，请检查网络设置",
  },
  "4": {
    code: "NETWORK_ONLINE",
    status: 4,
    statusText: "当前网络连接正常",
  },
  "200": {
    code: "REQUEST_OK",
    status: 200,
    statusText: "200：请求成功",
  },
  "201": {
    code: "REQUEST_CREATED",
    status: 201,
    statusText: "201：请求完成",
  },
  "202": {
    code: "REQUEST_ACCEPTED",
    status: 202,
    statusText: "202：请求已接收",
  },
  "203": {
    code: "REQUEST_NON-AUTHORITATIVE_INFORMATION",
    status: 203,
    statusText: "203：请求成功，返回头信息已变更",
  },
  "204": {
    code: "REQUEST_NO_CONTENT",
    status: 204,
    statusText: "204：请求成功，无返回内容",
  },
  "205": {
    code: "REQUEST_RESET_CONTENT",
    status: 205,
    statusText: "205：请求成功，请重置文档视图",
  },
  "206": {
    code: "REQUEST_PARTIAL_CONTENT",
    status: 206,
    statusText: "206：部分GET请求已处理",
  },
  "207": {
    code: "REQUEST_Multi-STATUS",
    status: 207,
    statusText: "207：之后的请求为 XML 内容",
  },
  "208": {
    code: "REQUEST_ALREADY_REPORTED",
    status: 208,
    statusText: "208：请求DAV的绑定成员已被枚举",
  },
  "226": {
    code: "REQUEST_IM_USED ",
    status: 226,
    statusText: "226：请求已被使用",
  },
  "300": {
    code: "REQUEST_MULTIPLE_CHOICE",
    status: 300,
    statusText: "300：请求包含多个选项",
  },
  "301": {
    code: "REQUEST_MOVED_PERMANENTLY",
    status: 301,
    statusText: "301：请求已永久重定向",
  },
  "302": {
    code: "REQUEST_FOUND",
    status: 302,
    statusText: "302：请求已临时重定向",
  },
  "303": {
    code: "REQUEST_SEE_OTHER",
    status: 303,
    statusText: "303：请求已采用GET方式临时重定向",
  },
  "304": {
    code: "REQUEST_NOT_MODIFIED",
    status: 304,
    statusText: "304：请求已使用缓存的数据",
  },
  "305": {
    code: "REQUEST_USE_PROXY",
    status: 305,
    statusText: "305：请求必须采用代理访问",
  },
  "307": {
    code: "REQUEST_TEMPORARY_REDIRECT",
    status: 307,
    statusText: "307：请求已临时重定向",
  },
  "308": {
    code: "REQUEST_PERMANENT_REDIRECT",
    status: 308,
    statusText: "308：请求已永久重定向",
  },
  "400": {
    code: "REQUEST_BAD_REQUEST",
    status: 400,
    statusText: "400：请求参数错误",
  },
  "401": {
    code: "REQUEST_UNAUTHORIZED",
    status: 401,
    statusText: "401：请求未授权",
  },
  "402": {
    code: "REQUEST_PAYMENT_REQUIRED",
    status: 402,
    statusText: "402：请求需要支付",
  },
  "403": {
    code: "REQUEST_FORBIDDEN",
    status: 403,
    statusText: "403：请求已被拒绝",
  },
  "404": {
    code: "REQUEST_NOT_FOUND",
    status: 404,
    statusText: "404：请求资源未找到",
  },
  "405": {
    code: "REQUEST_METHOD_NOT_ALLOWED",
    status: 405,
    statusText: "405：请求方法不支持",
  },
  "406": {
    code: "REQUEST_NOT_ACCEPTABLE",
    status: 406,
    statusText: "406：请求无法接受",
  },
  "407": {
    code: "REQUEST_PROXY_AUTHENTICATION_REQUIRED",
    status: 407,
    statusText: "407：请求需要在代理服务器上进行身份验证",
  },
  "408": {
    code: "REQUEST_REQUEST_TIMEOUT",
    status: 408,
    statusText: "408：请求超时",
  },
  "409": {
    code: "REQUEST_CONFLICT",
    status: 409,
    statusText: "409：请求冲突",
  },
  "410": {
    code: "REQUEST_GONE",
    status: 410,
    statusText: "410：请求资源已不存在",
  },
  "411": {
    code: "REQUEST_LENGTH_REQUIRED",
    status: 411,
    statusText: "411：请求要求定义 Content-Length 长度",
  },
  "412": {
    code: "REQUEST_PRECONDITION_FAILED",
    status: 412,
    statusText: "412：请求验证先决条件失败",
  },
  "413": {
    code: "REQUEST_PAYLOAD_TOO_LARGE",
    status: 413,
    statusText: "413：请求实体过大",
  },
  "414": {
    code: "REQUEST_URI_TOO_LONG",
    status: 414,
    statusText: "414：请求 URI 过长",
  },
  "415": {
    code: "REQUEST_UNSUPPORTED_MEDIA_TYPE",
    status: 415,
    statusText: "415：请求媒体类型不支持",
  },
  "416": {
    code: "REQUEST_RANGE_NOT_SATISFIABLE",
    status: 416,
    statusText: "416：请求数据范围未匹配",
  },
  "417": {
    code: "REQUEST_EXPECTATION_FAILED",
    status: 417,
    statusText: "417：请求 Expect 无法满足",
  },
  "418": {
    code: "REQUEST_I_AM_A_TEAPOT",
    status: 418,
    statusText: "我不泡咖啡，我只是个茶壶",
  },
  "421": {
    code: "REQUEST_MISDIRECTED_REQUEST",
    status: 421,
    statusText: "421：请求被误导",
  },
  "422": {
    code: "REQUEST_UNPROCESSABLE_ENTITY",
    status: 422,
    statusText: "422：请求语义错误",
  },
  "423": {
    code: "REQUEST_LOCKED",
    status: 423,
    statusText: "423：请求资源被锁定",
  },
  "424": {
    code: "REQUEST_FAILED_DEPENDENCY",
    status: 424,
    statusText: "424：请求失败",
  },
  "425": {
    code: "REQUEST_TOO_EARLY",
    status: 425,
    statusText: "425：请求过早",
  },
  "426": {
    code: "REQUEST_UPGRADE_REQUIRED",
    status: 426,
    statusText: "426：请求协议被拒绝",
  },
  "428": {
    code: "REQUEST_PRECONDITION_REQUIRED",
    status: 428,
    statusText: "428：请求需要前置条件",
  },
  "429": {
    code: "REQUEST_TOO_MANY_REQUESTS",
    status: 429,
    statusText: "429：请求过多被限速",
  },
  "431": {
    code: "REQUEST_HEADER_FIELDS_TOO_LARGE",
    status: 431,
    statusText: "431：请求头过大",
  },
  "451": {
    code: "REQUEST_UNAVAILABLE_FOR_LEGAL_REASONS",
    status: 451,
    statusText: "451：请求资源不合法",
  },
  "500": {
    code: "REQUEST_INTERNAL_SERVER_ERROR",
    status: 500,
    statusText: "500：请求的服务器内部错误",
  },
  "501": {
    code: "REQUEST_NOT_IMPLEMENTED",
    status: 501,
    statusText: "501：请求未实现",
  },
  "502": {
    code: "REQUEST_BAD_GATEWAY",
    status: 502,
    statusText: "502：请求网关故障",
  },
  "503": {
    code: "REQUEST_SERVICE_UNAVAILABLE",
    status: 503,
    statusText: "503：请求服务器临时故障",
  },
  "504": {
    code: "REQUEST_GATEWAY_TIMEOUT",
    status: 504,
    statusText: "504：请求网关超时",
  },
  "505": {
    code: "REQUEST_HTTP_VERSION_NOT_SUPPORTED",
    status: 505,
    statusText: "505：请求所使用的 HTTP 协议版本不支持",
  },
  "506": {
    code: "REQUEST_VARIANT_ALSO_NEGOTIATES",
    status: 506,
    statusText: "506：请求服务器配置错误",
  },
  "507": {
    code: "REQUEST_INSUFFICIENT_STORAGE",
    status: 507,
    statusText: "507：请求服务器存储空间不足",
  },
  "508": {
    code: "REQUEST_LOOP_DETECTED",
    status: 508,
    statusText: "508：请求无线循环",
  },
  "510": {
    code: "REQUEST_NOT_EXTENDED",
    status: 510,
    statusText: "510：请求需要扩展",
  },
  "511": {
    code: "REQUEST_NETWORK_AUTHENTICATION_REQUIRED",
    status: 511,
    statusText: "511：请求需要授权",
  },
  "520": {
    code: "REQUEST_ERROR",
    status: 520,
    statusText: "520：请求未知错误",
  },
  "600": {
    code: "REQUEST_CANCELLED",
    status: 600,
    statusText: "600：请求已取消",
  },
  "601": {
    code: "REQUEST_TIMEOUT",
    status: 601,
    statusText: "601：请求超时",
  },
  "190001": {
    code: "user_login_success",
    status: 190001,
    statusText: "登录成功",
  },
  "190002": {
    code: "user_not_logged",
    status: 190002,
    statusText: "请您登录后访问",
  },
};
