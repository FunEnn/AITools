import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { setTokenGetter } from "./request";

// 通用API Hook类型
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T, Args extends any[] = any[]> extends UseApiState<T> {
  execute: (...args: Args) => Promise<T | null>;
  reset: () => void;
}

// 通用API Hook
export function useApi<T = unknown, Args extends any[] = any[]>(
  apiFunction: (...args: Args) => Promise<T>,
): UseApiReturn<T, Args> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error: any) {
        console.error("API调用失败:", error);

        // 处理不同类型的错误
        let errorMessage = "请求失败";

        if (error.status === 429) {
          errorMessage = "请求过于频繁，请稍后重试";
        } else if (error.status === 401) {
          errorMessage = "未授权，请重新登录";
        } else if (error.status === 403) {
          errorMessage = "权限不足";
        } else if (error.status === 404) {
          errorMessage = "请求的资源不存在";
        } else if (error.status === 500) {
          errorMessage = "服务器内部错误，请稍后重试";
        } else if (error.message) {
          errorMessage = error.message;
        }

        setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
        return null;
      }
    },
    [apiFunction],
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// 用户相关Hooks
export const useUserApi = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // 设置token获取函数
  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  // Queries
  const userCreationsQuery = useQuery({
    queryKey: ["user", "creations"],
    queryFn: () => api.user.getUserCreations(),
  });
  const publishedCreationsQuery = useQuery({
    queryKey: ["community", "published"],
    queryFn: () => api.user.getPublishedCreations(),
  });

  // Mutations
  const toggleLikeMutation = useMutation({
    mutationFn: (id: number) => api.user.toggleLikeCreation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community", "published"] });
      queryClient.invalidateQueries({ queryKey: ["user", "creations"] });
    },
  });

  return {
    userCreationsQuery,
    publishedCreationsQuery,
    toggleLikeMutation,
  };
};

// 社区相关Hooks（优化版）
export const useCommunityApi = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // 设置token获取函数
  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  const publishedCreationsQuery = useQuery({
    queryKey: ["community", "published"],
    queryFn: () => api.user.getPublishedCreations(),
  });
  const toggleLikeMutation = useMutation({
    mutationFn: (id: number) => api.user.toggleLikeCreation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community", "published"] });
    },
  });

  return {
    publishedCreationsQuery,
    toggleLikeMutation,
  };
};

// AI工具相关Hooks
export const useAiApi = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // 设置token获取函数
  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  const generateArticle = useMutation({
    mutationFn: api.ai.generateArticle,
  });
  const generateBlogTitle = useMutation({
    mutationFn: api.ai.generateBlogTitle,
  });
  const generateImage = useMutation({
    mutationFn: api.ai.generateImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "creations"] });
      queryClient.invalidateQueries({ queryKey: ["community", "published"] });
    },
  });
  const removeBackground = useMutation({
    mutationFn: api.ai.removeBackground,
  });
  const removeObject = useMutation({
    mutationFn: api.ai.removeObject,
  });
  const reviewResume = useMutation({
    mutationFn: api.ai.reviewResume,
  });

  return {
    generateArticle,
    generateBlogTitle,
    generateImage,
    removeBackground,
    removeObject,
    reviewResume,
  };
};

export default useApi;
