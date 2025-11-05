import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "./api";
import { setTokenGetter } from "./request";

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

  const deleteCreationMutation = useMutation({
    mutationFn: (id: number) => api.user.deleteCreation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "creations"] });
      queryClient.invalidateQueries({ queryKey: ["community", "published"] });
    },
  });

  return {
    userCreationsQuery,
    publishedCreationsQuery,
    toggleLikeMutation,
    deleteCreationMutation,
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
