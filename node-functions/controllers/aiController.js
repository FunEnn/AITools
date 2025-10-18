import { clerkClient } from "@clerk/express";
import axios from "axios";
import sql from "../configs/db.js";
import smms from "../configs/sm_ms.js";

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length, requestId } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "您已达到免费使用次数限制（10次），请升级到高级账户以继续使用文章生成功能。",
      });
    }

    if (requestId) {
      try {
        const existingResult = await sql`
          SELECT content FROM request_cache 
          WHERE request_id = ${requestId} AND user_id = ${userId}
        `;

        if (existingResult.length > 0) {
          console.log(`🔄 返回缓存的文章生成结果: ${requestId}`);
          return res.json({
            success: true,
            content: existingResult[0].content,
            cached: true,
          });
        }
      } catch (cacheError) {
        console.warn("检查请求缓存时出错:", cacheError);
      }
    }

    const response = await axios.post(
      "https://api.siliconflow.cn/v1/chat/completions",
      {
        model: "Qwen/QwQ-32B",
        messages: [
          {
            role: "user",
            content: `请根据以下提示生成一篇${length || "中等长度"}的文章：${prompt}`,
          },
        ],
        max_tokens: 4096,
        temperature: 0.7,
        top_p: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 120000,
      },
    );

    const content = response.data.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (requestId) {
      try {
        await sql`
          INSERT INTO request_cache (request_id, user_id, content, created_at) 
          VALUES (${requestId}, ${userId}, ${content}, NOW())
          ON CONFLICT (request_id) DO NOTHING
        `;
        console.log(`💾 缓存文章生成结果: ${requestId}`);
      } catch (cacheError) {
        console.warn("缓存请求结果时出错:", cacheError);
      }
    }

    // 更新用户免费使用次数
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      content,
    });
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
    const { prompt, requestId } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "您已达到免费使用次数限制（10次），请升级到高级账户以继续使用博客标题生成功能。",
      });
    }

    if (requestId) {
      try {
        const existingResult = await sql`
          SELECT content FROM request_cache 
          WHERE request_id = ${requestId} AND user_id = ${userId}
        `;

        if (existingResult.length > 0) {
          console.log(`🔄 返回缓存的博客标题生成结果: ${requestId}`);
          return res.json({
            success: true,
            content: existingResult[0].content,
            cached: true,
          });
        }
      } catch (cacheError) {
        console.warn("检查请求缓存时出错:", cacheError);
      }
    }

    const response = await axios.post(
      "https://api.siliconflow.cn/v1/chat/completions",
      {
        model: "Qwen/QwQ-32B",
        messages: [
          {
            role: "user",
            content: `请根据以下主题生成吸引人的博客标题：${prompt}。要求标题简洁有力，能够吸引读者点击。`,
          },
        ],
        max_tokens: 500,
        temperature: 0.8,
        top_p: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const content = response.data.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (requestId) {
      try {
        await sql`
          INSERT INTO request_cache (request_id, user_id, content, created_at) 
          VALUES (${requestId}, ${userId}, ${content}, NOW())
          ON CONFLICT (request_id) DO NOTHING
        `;
        console.log(`💾 缓存博客标题生成结果: ${requestId}`);
      } catch (cacheError) {
        console.warn("缓存请求结果时出错:", cacheError);
      }
    }

    // 更新用户免费使用次数
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({
      success: true,
      content,
    });
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
    const { prompt, publish, requestId } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "图像生成功能仅限高级用户使用，请升级您的账户以解锁此功能。",
      });
    }

    if (requestId) {
      try {
        const existingResult = await sql`
          SELECT content FROM request_cache 
          WHERE request_id = ${requestId} AND user_id = ${userId}
        `;

        if (existingResult.length > 0) {
          console.log(`🔄 返回缓存的图像生成结果: ${requestId}`);
          return res.json({
            success: true,
            content: existingResult[0].content,
            cached: true,
          });
        }
      } catch (cacheError) {
        console.warn("检查请求缓存时出错:", cacheError);
      }
    }

    const response = await axios.post(
      "https://api.siliconflow.cn/v1/images/generations",
      {
        model: "Kwai-Kolors/Kolors",
        prompt: prompt,
        image_size: "1024x1024",
        batch_size: 1,
        num_inference_steps: 20,
        guidance_scale: 7.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const imageUrl = response.data.images[0].url;

    const downloadResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(downloadResponse.data);

    const uploadedImageUrl = await smms.uploadImage(imageBuffer, {
      filename: `ai-generated-${Date.now()}.png`,
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${uploadedImageUrl}, 'image', ${publish || false})`;

    if (requestId) {
      try {
        await sql`
          INSERT INTO request_cache (request_id, user_id, content, created_at) 
          VALUES (${requestId}, ${userId}, ${uploadedImageUrl}, NOW())
          ON CONFLICT (request_id) DO NOTHING
        `;
        console.log(`💾 缓存图像生成结果: ${requestId}`);
      } catch (cacheError) {
        console.warn("缓存请求结果时出错:", cacheError);
      }
    }

    res.json({
      success: true,
      content: uploadedImageUrl,
    });
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

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "背景移除功能仅限高级用户使用，请升级您的账户以解锁此功能。",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "请上传要处理的图像文件",
      });
    }

    const imageBuffer = req.file.buffer;
    const base64Image = `data:image/${req.file.mimetype.split("/")[1]};base64,${imageBuffer.toString("base64")}`;

    const response = await axios.post(
      "https://api.siliconflow.cn/v1/images/generations",
      {
        model: "Qwen/Qwen-Image-Edit-2509",
        prompt:
          "Create a clean image with transparent background, remove the background while keeping the main subject intact",
        image: base64Image,
        image_size: "1024x1024",
        num_inference_steps: 20,
        guidance_scale: 7.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const processedImageUrl = response.data.images[0].url;

    const downloadResponse = await axios.get(processedImageUrl, {
      responseType: "arraybuffer",
    });
    const processedImageBuffer = Buffer.from(downloadResponse.data);

    const uploadedImageUrl = await smms.uploadImage(processedImageBuffer, {
      filename: `background-removed-${Date.now()}.png`,
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'background_removal', ${uploadedImageUrl}, 'image')`;
    res.json({
      success: true,
      content: uploadedImageUrl,
    });
  } catch (error) {
    console.error("背景移除错误:", error);

    let errorMessage = "背景移除服务暂时不可用，请稍后重试";

    if (
      error.response?.data?.message?.includes("prohibited or sensitive content")
    ) {
      errorMessage = "图片内容可能包含敏感信息，请尝试其他图片";
    } else if (error.response?.data?.message?.includes("content")) {
      errorMessage = "图片内容不符合处理要求，请尝试其他图片";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "对象移除功能仅限高级用户使用，请升级您的账户以解锁此功能。",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "请上传要处理的图像文件",
      });
    }

    if (!object) {
      return res.status(400).json({
        success: false,
        message: "请指定要移除的对象",
      });
    }

    const imageBuffer = req.file.buffer;
    const base64Image = `data:image/${req.file.mimetype.split("/")[1]};base64,${imageBuffer.toString("base64")}`;

    const response = await axios.post(
      "https://api.siliconflow.cn/v1/images/generations",
      {
        model: "Qwen/Qwen-Image-Edit-2509",
        prompt: `Edit the image to remove the specified object: ${object}. Keep all other elements and background unchanged`,
        image: base64Image,
        image_size: "1024x1024",
        num_inference_steps: 25,
        guidance_scale: 8.0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const processedImageUrl = response.data.images[0].url;

    const downloadResponse = await axios.get(processedImageUrl, {
      responseType: "arraybuffer",
    });
    const processedImageBuffer = Buffer.from(downloadResponse.data);

    const uploadedImageUrl = await smms.uploadImage(processedImageBuffer, {
      filename: `object-removed-${Date.now()}.png`,
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`object_removal_${object}`}, ${uploadedImageUrl}, 'image')`;

    res.json({
      success: true,
      content: uploadedImageUrl,
      removedObject: object,
    });
  } catch (error) {
    console.error("对象移除错误:", error);

    let errorMessage = "对象移除服务暂时不可用，请稍后重试";

    if (
      error.response?.data?.message?.includes("prohibited or sensitive content")
    ) {
      errorMessage = "图片内容可能包含敏感信息，请尝试其他图片";
    } else if (error.response?.data?.message?.includes("content")) {
      errorMessage = "图片内容不符合处理要求，请尝试其他图片";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;
    const { language = "zh", requestId } = req.body;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "简历审查功能仅限高级用户使用，请升级您的账户以解锁此功能。",
      });
    }

    if (requestId) {
      try {
        const existingResult = await sql`
          SELECT content FROM request_cache 
          WHERE request_id = ${requestId} AND user_id = ${userId}
        `;

        if (existingResult.length > 0) {
          console.log(`🔄 返回缓存的简历审查结果: ${requestId}`);
          return res.json({
            success: true,
            content: existingResult[0].content,
            reviewType: "resume",
            cached: true,
          });
        }
      } catch (cacheError) {
        console.warn("检查请求缓存时出错:", cacheError);
      }
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "请上传要审查的简历文件（PDF格式）",
      });
    }

    const dataBuffer = req.file.buffer;

    const { default: pdfParse } = await import("pdf-parse-new");
    const pdfData = await pdfParse(dataBuffer);

    const isEnglish = language === "en";
    const prompt = isEnglish
      ? `Please carefully review the following resume and provide constructive feedback, including:

1. Resume strengths and highlights
2. Areas for improvement
3. Format and structure suggestions
4. Content completeness assessment
5. Keyword optimization suggestions
6. Overall rating (1-10 points)

Resume content:
${pdfData.text}

Please respond in English and provide specific, practical suggestions.`
      : `请仔细审查以下简历，并提供建设性的反馈意见，包括：

1. 简历的优势和亮点
2. 需要改进的地方
3. 格式和结构建议
4. 内容完整性评估
5. 关键词优化建议
6. 整体评分（1-10分）

简历内容：
${pdfData.text}

请用中文回复，并提供具体、实用的建议。`;

    const response = await axios.post(
      "https://api.siliconflow.cn/v1/chat/completions",
      {
        model: "Qwen/QwQ-32B",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
        top_p: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const reviewContent = response.data.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'resume_review', ${reviewContent}, 'resume-review')`;

    if (requestId) {
      try {
        await sql`
          INSERT INTO request_cache (request_id, user_id, content, created_at) 
          VALUES (${requestId}, ${userId}, ${reviewContent}, NOW())
          ON CONFLICT (request_id) DO NOTHING
        `;
        console.log(`💾 缓存简历审查结果: ${requestId}`);
      } catch (cacheError) {
        console.warn("缓存请求结果时出错:", cacheError);
      }
    }

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
