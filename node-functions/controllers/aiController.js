import crypto from "node:crypto";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import cloudinary from "../configs/cloudinary.js";
import sql from "../configs/db.js";

const DIFY_TIMEOUT_MS = 180000;

const getDifyBaseUrl = () =>
  String(process.env.DIFY_BASE_URL || "https://api.dify.ai/v1").replace(
    /\/$/,
    "",
  );

const uploadDifyWorkflowFile = async ({
  userId,
  fileBuffer,
  fileName,
  fileMime,
}) => {
  const apiKey = process.env.DIFY_API_KEY;
  if (!apiKey) {
    throw new Error("缺少环境变量 DIFY_API_KEY");
  }

  const baseUrl = getDifyBaseUrl();
  const candidateUrls = [
    `${baseUrl}/workflows/files/upload`,
    `${baseUrl}/files/upload`,
  ];

  const safeMime = (() => {
    const ext = String(fileName || "")
      .toLowerCase()
      .split(".")
      .pop();

    if (fileMime && fileMime !== "application/octet-stream") return fileMime;

    if (ext === "pdf") return "application/pdf";
    if (ext === "md") return "text/markdown";
    if (ext === "txt") return "text/plain";
    if (ext === "doc") return "application/msword";
    if (ext === "docx") {
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    return fileMime || "application/octet-stream";
  })();

  let lastError = null;

  for (const url of candidateUrls) {
    const form = new FormData();
    form.append("user", userId);
    form.append("file", new Blob([fileBuffer], { type: safeMime }), fileName);

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: form,
    });

    const data = await resp.json().catch(() => null);
    if (!resp.ok) {
      lastError = new Error(
        `Dify 文件上传失败(${resp.status})[${url}]: ${data?.message || data?.error || "unknown error"}`,
      );
      continue;
    }

    const fileId = data?.id || data?.upload_file_id;
    if (!fileId) {
      lastError = new Error(`Dify 文件上传返回缺少 id/upload_file_id[${url}]`);
      continue;
    }

    return { data, fileId, uploadUrl: url };
  }

  throw (
    lastError ||
    new Error(
      "Dify 文件上传失败：未命中可用上传接口（workflows/files/upload 或 files/upload）",
    )
  );
};

const inFlight = new Map();

const hashText = (text) =>
  crypto
    .createHash("sha1")
    .update(String(text || ""))
    .digest("hex");

const runOnce = async (key, fn) => {
  if (inFlight.has(key)) {
    return await inFlight.get(key);
  }

  const promise = (async () => await fn())().finally(() => {
    inFlight.delete(key);
  });

  inFlight.set(key, promise);
  return await promise;
};

const runDifyWorkflow = async ({ userId, inputs }) => {
  const baseUrl = process.env.DIFY_BASE_URL || "https://api.dify.ai/v1";
  const apiKey = process.env.DIFY_API_KEY;

  if (!apiKey) {
    throw new Error("Missing DIFY_API_KEY");
  }

  const url = `${baseUrl.replace(/\/$/, "")}/workflows/run`;

  try {
    const response = await axios.post(
      url,
      {
        inputs,
        response_mode: "blocking",
        user: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: DIFY_TIMEOUT_MS,
      },
    );

    return response.data;
  } catch (err) {
    const status = err?.response?.status;
    const providerMessage =
      err?.response?.data?.message || err?.response?.statusText;
    const detail = providerMessage
      ? `Dify 上游错误(${status || "unknown"}): ${providerMessage}`
      : `Dify 请求失败(${status || "unknown"}): ${err?.message || "unknown"}`;
    throw new Error(detail);
  }
};

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "您已达到免费使用次数限制（10次），请升级到高级账户以继续使用文章生成功能。",
      });
    }

    const dedupKey = `article:${userId}:${hashText(prompt)}`;

    const result = await runOnce(dedupKey, async () => {
      const difyData = await runDifyWorkflow({
        userId,
        inputs: {
          action: "text",
          tool: "article",
          prompt,
        },
      });

      const outputs = difyData?.data?.outputs || difyData?.outputs || {};
      const content = outputs.text;

      if (!content) {
        throw new Error(
          "Dify 返回内容为空，请检查 workflow 输出字段是否为 text",
        );
      }

      await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

      if (plan !== "premium") {
        await clerkClient.users.updateUserMetadata(userId, {
          privateMetadata: {
            free_usage: free_usage + 1,
          },
        });
      }

      return { success: true, content };
    });

    res.json(result);
  } catch (error) {
    console.error("AI 文章生成错误:", error);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || "AI 服务暂时不可用，请稍后重试",
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "您已达到免费使用次数限制（10次），请升级到高级账户以继续使用博客标题生成功能。",
      });
    }

    const dedupKey = `blog_title:${userId}:${hashText(prompt)}`;

    const result = await runOnce(dedupKey, async () => {
      const difyData = await runDifyWorkflow({
        userId,
        inputs: {
          action: "text",
          tool: "blog_title",
          prompt,
        },
      });

      const outputs = difyData?.data?.outputs || difyData?.outputs || {};
      const content = outputs.text;

      if (!content) {
        throw new Error(
          "Dify 返回内容为空，请检查 workflow 输出字段是否为 text",
        );
      }

      await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

      if (plan !== "premium") {
        await clerkClient.users.updateUserMetadata(userId, {
          privateMetadata: {
            free_usage: free_usage + 1,
          },
        });
      }

      return { success: true, content };
    });

    res.json(result);
  } catch (error) {
    console.error("AI 博客标题生成错误:", error);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || "AI 服务暂时不可用，请稍后重试",
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "图像生成功能仅限高级用户使用，请升级您的账户以解锁此功能。",
      });
    }

    const dedupKey = `image:${userId}:${hashText(prompt)}:${publish ? "1" : "0"}`;

    const result = await runOnce(dedupKey, async () => {
      const difyData = await runDifyWorkflow({
        userId,
        inputs: {
          action: "image",
          tool: "image_generation",
          prompt,
        },
      });

      const outputs = difyData?.data?.outputs || difyData?.outputs || {};
      const imageUrl = outputs.url;

      if (!imageUrl) {
        throw new Error(
          "Dify 返回图片地址为空，请检查 workflow 输出字段是否为 url",
        );
      }

      const downloadResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      const imageBuffer = Buffer.from(downloadResponse.data);

      const uploadedImageUrl = await cloudinary.uploadImage(imageBuffer, {
        filename: `ai-generated-${Date.now()}.png`,
      });

      await sql`INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${uploadedImageUrl}, 'image', ${publish || false})`;

      return { success: true, content: uploadedImageUrl };
    });

    res.json(result);
  } catch (error) {
    console.error("AI 图像生成错误:", error);

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "AI 图像生成服务暂时不可用，请稍后重试",
    });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;
    const { prompt: promptTemplate } = req.body;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "简历审查功能仅限高级用户使用，请升级您的账户以解锁此功能。",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "请上传要审查的简历文件（PDF格式）",
      });
    }

    if (!promptTemplate) {
      return res.status(400).json({
        success: false,
        message:
          "缺少提示词模板（prompt），请从 dictionaries 传入 resumeReview.promptTemplate",
      });
    }

    const dataBuffer = req.file.buffer;
    const fileName = req.file.originalname || `resume-${Date.now()}`;
    const fileMime = req.file.mimetype || "application/octet-stream";
    const fileSize = Number(req.file.size || dataBuffer?.length || 0);
    const prompt = String(promptTemplate || "")
      .trim()
      .slice(0, 256);

    const difyFileType = "document";

    const { fileId } = await uploadDifyWorkflowFile({
      userId,
      fileBuffer: dataBuffer,
      fileName,
      fileMime,
    });

    const difyData = await runDifyWorkflow({
      userId,
      inputs: {
        action: "file",
        tool: "resume_review",
        prompt,
        file: {
          type: difyFileType,
          transfer_method: "local_file",
          upload_file_id: fileId,
          name: fileName,
          size: fileSize,
        },
      },
    });

    const outputs = difyData?.data?.outputs || difyData?.outputs || {};
    const reviewContent = outputs.text;

    if (!reviewContent) {
      return res.status(500).json({
        success: false,
        message: "Dify 返回内容为空，请检查 workflow 输出字段是否为 text",
      });
    }

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'resume_review', ${reviewContent}, 'resume-review')`;

    res.json({
      success: true,
      content: reviewContent,
      reviewType: "resume",
    });
  } catch (error) {
    console.error("简历审查错误:", error);

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.message || "简历审查服务暂时不可用，请稍后重试",
    });
  }
};
