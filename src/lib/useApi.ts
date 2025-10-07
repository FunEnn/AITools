import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import {
  api,
  Creation,
  GenerateArticleParams,
  GenerateBlogTitleParams,
  GenerateImageParams,
  RemoveObjectParams,
} from "./api";
import { setTokenGetter } from "./request";

// 通用API Hook类型
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

// 通用API Hook
export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error: any) {
        const errorMessage = error.message || "请求失败";
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

  // 设置token获取函数
  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  const getUserCreations = useApi(api.user.getUserCreations);
  const getPublishedCreations = useApi(api.user.getPublishedCreations);
  const toggleLikeCreation = useApi(api.user.toggleLikeCreation);

  return {
    getUserCreations,
    getPublishedCreations,
    toggleLikeCreation,
  };
};

// AI工具相关Hooks
export const useAiApi = () => {
  const { getToken } = useAuth();

  // 设置token获取函数
  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  const generateArticle = useApi(api.ai.generateArticle);
  const generateBlogTitle = useApi(api.ai.generateBlogTitle);
  const generateImage = useApi(api.ai.generateImage);
  const removeBackground = useApi(api.ai.removeBackground);
  const removeObject = useApi(api.ai.removeObject);
  const reviewResume = useApi(api.ai.reviewResume);

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
