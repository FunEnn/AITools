"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            // 智能重试策略
            retry: (failureCount, error: unknown) => {
              // 根据错误类型决定是否重试
              if (error && typeof error === "object" && "status" in error) {
                const statusError = error as { status: number };
                // 这些错误不重试
                if (statusError.status === 404) return false; // 资源不存在
                if (statusError.status === 401) return false; // 未授权
                if (statusError.status === 403) return false; // 权限不足
              }
              // 其他错误最多重试3次
              return failureCount < 3;
            },
            // 指数退避重试延迟
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
          },
          mutations: {
            // 变更操作的重试策略
            retry: (failureCount, error: unknown) => {
              if (error && typeof error === "object" && "status" in error) {
                const statusError = error as { status: number };
                if (statusError.status === 404) return false;
                if (statusError.status === 401) return false;
                if (statusError.status === 403) return false;
              }
              // 变更操作重试次数较少
              return failureCount < 2;
            },
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 10000),
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
