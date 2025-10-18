import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

// 基础配置
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "/express/api";

// 动态获取token的函数
let getTokenFunction: (() => Promise<string | null>) | null = null;

// 设置获取token的函数
export const setTokenGetter = (tokenGetter: () => Promise<string | null>) => {
  getTokenFunction = tokenGetter;
};

// 重试配置
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1秒
  // 支持429（请求过于频繁）和433（请求被拒绝）错误的重试
};

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 120000, // 2分钟超时
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 动态获取最新token
    if (getTokenFunction && config.headers) {
      try {
        const token = await getTokenFunction();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.warn("获取token失败:", error);
      }
    }

    // 添加时间戳防止缓存
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    // 开发环境下才打印请求日志
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 发送请求:", {
        url: config.url,
        method: config.method,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ 请求拦截器错误:", error);
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 开发环境下才打印响应日志
    if (process.env.NODE_ENV === "development") {
      console.log("✅ 响应成功:", {
        url: response.config.url,
        status: response.status,
      });
    }

    // 统一处理响应数据
    const { data } = response;

    // 如果后端返回的数据结构是 { success, data, message }
    if (data && typeof data === "object" && "success" in data) {
      if (data.success) {
        return data;
      } else {
        // 业务错误
        const error = new Error(data.message || "请求失败");
        (error as Error & { success?: boolean }).success = false;
        return Promise.reject(error);
      }
    }

    return data;
  },
  async (error: AxiosError) => {
    console.error("❌ 响应错误:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });

    // 处理429和433错误 - 自动重试
    if (error.response?.status === 429 || error.response?.status === 433) {
      const config = error.config as { _retryCount?: number };
      if (config && !config._retryCount) {
        config._retryCount = 0;
      }

      if (config && (config._retryCount ?? 0) < RETRY_CONFIG.maxRetries) {
        config._retryCount = (config._retryCount ?? 0) + 1;
        const delay =
          RETRY_CONFIG.retryDelay * 2 ** ((config._retryCount ?? 1) - 1);
        console.log(
          `🔄 请求重试 ${config._retryCount}/${RETRY_CONFIG.maxRetries}，${delay}ms后重试... (状态码: ${error.response?.status})`,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
        return request(config as InternalAxiosRequestConfig);
      }
    }

    // 处理超时错误
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      console.error("❌ 请求超时，AI生成可能需要更长时间");
      const timeoutError = new Error(
        "请求超时，AI生成可能需要更长时间，请稍后重试",
      );
      (timeoutError as Error & { isTimeout?: boolean }).isTimeout = true;
      return Promise.reject(timeoutError);
    }

    // 处理HTTP状态码错误
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 未授权，Clerk会自动处理认证
          console.error("❌ 未授权，请检查登录状态");
          break;
        case 403:
          console.error("❌ 权限不足");
          break;
        case 404:
          console.error("❌ 请求的资源不存在");
          break;
        case 429:
          console.error("❌ 请求过于频繁，请稍后重试");
          break;
        case 433:
          console.error("❌ 请求被拒绝，可能是请求头过大或服务器限制");
          break;
        case 500:
          console.error("❌ 服务器内部错误");
          break;
        default:
          console.error(`❌ 请求失败: ${status}`);
      }

      // 返回服务器错误信息
      const errorMessage =
        (data as { message?: string })?.message || `请求失败 (${status})`;
      const customError = new Error(errorMessage);
      (customError as Error & { status?: number }).status = status;
      (customError as Error & { data?: unknown }).data = data;
      return Promise.reject(customError);
    }

    // 网络错误
    if (error.request) {
      console.error("❌ 网络错误，请检查网络连接");
      return Promise.reject(new Error("网络错误，请检查网络连接"));
    }

    // 其他错误
    return Promise.reject(error);
  },
);

// 封装常用请求方法
export const http = {
  // GET请求
  get: <T = unknown>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return request.get(url, { params, ...config });
  },

  // POST请求
  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return request.post(url, data, config);
  },

  // PUT请求
  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return request.put(url, data, config);
  },

  // DELETE请求
  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return request.delete(url, config);
  },

  // PATCH请求
  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return request.patch(url, data, config);
  },

  // 文件上传
  upload: <T = unknown>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return request.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // 增加超时时间，文件上传可能需要更长时间
      timeout: 180000, // 3分钟超时
      ...config,
    });
  },

  // 文件下载
  download: (
    url: string,
    filename?: string,
    config?: AxiosRequestConfig,
  ): Promise<void> => {
    return request
      .get(url, {
        responseType: "blob",
        ...config,
      })
      .then((response) => {
        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      });
  },
};

// 导出原始axios实例（用于特殊需求）
export { request };

// 导出默认实例
export default http;
