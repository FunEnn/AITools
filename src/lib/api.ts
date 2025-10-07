import http from "./request";

// API接口类型定义
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  creations?: T[];
}

// 创作相关类型
export interface Creation {
  id: number;
  user_id: string;
  prompt: string;
  content: string;
  type: "article" | "blog-title" | "image" | "resume-review";
  publish: boolean;
  likes: string[];
  created_at: string;
  updated_at: string;
}

// AI生成请求参数
export interface GenerateArticleParams {
  prompt: string;
  length?: string;
}

export interface GenerateBlogTitleParams {
  prompt: string;
}

export interface GenerateImageParams {
  prompt: string;
  publish?: boolean;
}

export interface RemoveBackgroundParams {
  image: File;
}

export interface RemoveObjectParams {
  image: File;
  object: string;
}

export interface ResumeReviewParams {
  resume: File;
}

// 用户相关API
export const userApi = {
  // 获取用户创作列表
  getUserCreations: (): Promise<ApiResponse<Creation[]>> => {
    return http.get("/user/get-user-creations");
  },

  // 获取已发布的创作列表
  getPublishedCreations: (): Promise<ApiResponse<Creation[]>> => {
    return http.get("/user/get-published-creations");
  },

  // 点赞/取消点赞创作
  toggleLikeCreation: (id: number): Promise<ApiResponse> => {
    return http.post("/user/toggle-like-creation", { id });
  },
};

// AI工具相关API
export const aiApi = {
  // 生成文章
  generateArticle: (
    params: GenerateArticleParams,
  ): Promise<{ success: boolean; content: string; message?: string }> => {
    return http.post("/ai/generate-article", params);
  },

  // 生成博客标题
  generateBlogTitle: (
    params: GenerateBlogTitleParams,
  ): Promise<{ success: boolean; content: string; message?: string }> => {
    return http.post("/ai/generate-blog-title", params);
  },

  // 生成图片
  generateImage: (
    params: GenerateImageParams,
  ): Promise<{ success: boolean; content: string; message?: string }> => {
    return http.post("/ai/generate-image", params);
  },

  // 移除背景
  removeBackground: (
    imageFile: File,
  ): Promise<{ success: boolean; content: string; message?: string }> => {
    const formData = new FormData();
    formData.append("image", imageFile);
    return http.upload("/ai/remove-background", formData);
  },

  // 移除对象
  removeObject: (
    params: RemoveObjectParams,
  ): Promise<{
    success: boolean;
    content: string;
    removedObject?: string;
    message?: string;
  }> => {
    const formData = new FormData();
    formData.append("image", params.image);
    formData.append("object", params.object);
    return http.upload("/ai/remove-object", formData);
  },

  // 简历审查
  reviewResume: (
    resumeFile: File,
  ): Promise<{
    success: boolean;
    content: string;
    reviewType?: string;
    message?: string;
  }> => {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    return http.upload("/ai/resume-review", formData);
  },
};

// 导出所有API
export const api = {
  user: userApi,
  ai: aiApi,
};

export default api;
