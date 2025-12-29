export const prompts = {
  zh: {
    writeArticle: {
      promptTemplate:
        '请写一篇关于"{topic}"的{length}字文章。要求内容详实、结构清晰、逻辑严谨。',
    },
    blogTitles: {
      promptTemplate:
        '请为关于"{topic}"的{category}博客生成吸引人的标题。要求标题简洁有力，能够吸引读者点击。',
    },
    aiTools: {
      resumeReview: {
        promptTemplate:
          "请仔细审查以下简历，并提供建设性的反馈意见，包括：\n\n1. 简历的优势和亮点\n2. 需要改进的地方\n3. 格式和结构建议\n4. 内容完整性评估\n5. 关键词优化建议\n6. 整体评分（1-10分）\n\n简历内容：\n{resume}\n\n请用中文回复，并提供具体、实用的建议。",
      },
      imageGeneration: {
        promptTemplate:
          "请生成一个{style}风格的图像，描述：{description}。要求图像质量高，细节丰富。",
      },
    },
  },
  en: {
    writeArticle: {
      promptTemplate:
        'Please write a {length}-word article about "{topic}". The content should be detailed, well-structured, and logically rigorous.',
    },
    blogTitles: {
      promptTemplate:
        'Please generate attractive titles for a {category} blog about "{topic}". The titles should be concise and compelling to attract readers.',
    },
    aiTools: {
      resumeReview: {
        promptTemplate:
          "Please carefully review the following resume and provide constructive feedback, including:\n\n1. Resume strengths and highlights\n2. Areas for improvement\n3. Format and structure suggestions\n4. Content completeness assessment\n5. Keyword optimization suggestions\n6. Overall rating (1-10 points)\n\nResume content:\n{resume}\n\nPlease respond in English and provide specific, practical suggestions.",
      },
      imageGeneration: {
        promptTemplate:
          "Please generate a {style} style image. Description: {description}. Requirements: high quality, rich details.",
      },
    },
  },
} as const;

export default prompts;
