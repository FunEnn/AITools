import { QueryClient } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 单例 QueryClient，避免多实例导致缓存不一致
let browserQueryClient: QueryClient | null = null;
export function getQueryClient() {
  if (typeof window === "undefined") {
    return new QueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30_000,
          retry: 2,
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return browserQueryClient;
}
