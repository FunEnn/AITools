// This file is auto-generated. Do not edit manually.
export const ai = {
  totalCreations: "总创作数",
  activePlan: "当前计划",
  recentCreations: "最近创作",
  noCreations: "暂无创作内容",
  noCreationsDescription: "开始使用 AI 工具创建您的第一个作品吧！",
  loading: "正在加载",
  loadingDescription: "请稍候...",
  fetchError: "获取创作内容失败，请重试",
  fetchErrorDescription: "获取创作内容时出错，请重试",
  writeArticle: {
    title: "生成的文章",
    placeholder: '输入主题并点击"生成文章"开始',
    promptTemplate:
      '请写一篇关于"{topic}"的{length}字文章。要求内容详实、结构清晰、逻辑严谨。',
    successMessage: "文章生成成功！",
    errorMessage: "文章生成失败，请重试",
    timeoutMessage: "AI生成时间较长，请稍后重试",
    inputError: "请输入文章主题",
    generateError: "生成文章时出错，请重试",
  },
  blogTitles: {
    title: "生成的标题",
    placeholder: '输入主题并点击"生成标题"开始',
    promptTemplate:
      '请为关于"{topic}"的{category}博客生成吸引人的标题。要求标题简洁有力，能够吸引读者点击。',
    successMessage: "标题生成成功！",
    errorMessage: "标题生成失败，请重试",
    timeoutMessage: "AI生成时间较长，请稍后重试",
    inputError: "请输入博客主题",
    generateError: "生成标题时出错，请重试",
  },
  community: {
    title: "社区创作",
    noCreations: "暂无社区创作",
    noCreationsDescription: "成为第一个分享创作的用户吧！",
    fetchError: "获取创作内容失败，请重试",
    fetchErrorDescription: "获取创作内容时出错，请重试",
    likeSuccess: "点赞成功",
    unlikeSuccess: "取消点赞",
    likeError: "点赞操作失败，请重试",
    likeErrorDescription: "点赞时出错，请重试",
  },
  aiTools: {
    backgroundRemoval: {
      title: "处理后的图像",
      placeholder: '上传图像并点击"移除背景"开始',
      inputError: "请选择图像文件",
      successMessage: "背景移除成功！",
      errorMessage: "背景移除失败，请重试",
      generateError: "移除背景时出错，请重试",
    },
    objectRemoval: {
      title: "处理后的图像",
      placeholder: '描述要移除的对象并点击"移除对象"开始',
      inputError: "请描述要移除的对象",
      fileError: "请选择图像文件",
      successMessage: "对象移除成功！",
      errorMessage: "对象移除失败，请重试",
      generateError: "移除对象时出错，请重试",
    },
    resumeReview: {
      title: "简历审查结果",
      placeholder: '上传简历并点击"审查简历"开始',
      inputError: "请选择简历文件",
      successMessage: "简历审查完成！",
      errorMessage: "简历审查失败，请重试",
      generateError: "审查简历时出错，请重试",
    },
    imageGeneration: {
      title: "生成的图像",
      placeholder: '输入描述并点击"生成图像"开始',
      inputError: "请输入图像描述",
      successMessage: "图像生成成功！",
      errorMessage: "图像生成失败，请重试",
      timeoutMessage: "AI生成时间较长，请稍后重试",
      generateError: "生成图像时出错，请重试",
      publishLabel: "公开此图像",
    },
  },
  aiToolsData: {
    articleWriter: {
      title: "AI文章写作",
      description:
        "使用我们的AI写作技术生成高质量、引人入胜的文章，涵盖任何主题。",
    },
    blogTitles: {
      title: "博客标题生成器",
      description:
        "使用我们的AI驱动生成器为您的博客文章找到完美的、吸引人的标题。",
    },
    imageGeneration: {
      title: "AI图像生成",
      description:
        "使用我们的AI图像生成工具创建令人惊叹的视觉效果，体验AI的力量。",
    },
    backgroundRemoval: {
      title: "背景移除",
      description: "使用我们的AI驱动工具轻松从图像中移除背景。",
    },
    objectRemoval: {
      title: "对象移除",
      description: "使用我们的AI对象移除工具无缝地从图像中移除不需要的对象。",
    },
    resumeReview: {
      title: "简历审查",
      description: "让AI审查您的简历，提高获得理想工作的机会。",
    },
  },
  formConfigs: {
    article: {
      title: "文章生成器",
      inputLabel: "文章主题",
      inputPlaceholder: "人工智能的未来发展...",
      optionsLabel: "文章长度",
      options: [
        { text: "短篇（500-800字）", value: 800 },
        { text: "中篇（800-1200字）", value: 1200 },
        { text: "长篇（1200+字）", value: 1600 },
      ],
      buttonText: "生成文章",
    },
    blogTitles: {
      title: "博客标题生成器",
      inputLabel: "博客主题",
      inputPlaceholder: "人工智能的未来发展...",
      optionsLabel: "博客分类",
      options: ["综合", "科技", "商业", "健康", "生活", "教育", "旅游", "美食"],
      buttonText: "生成标题",
    },
    imageGeneration: {
      title: "AI图像生成器",
      inputLabel: "图像描述",
      inputPlaceholder: "描述你想要生成的图像内容...",
      optionsLabel: "风格",
      options: [
        "写实风格",
        "吉卜力风格",
        "动漫风格",
        "卡通风格",
        "奇幻风格",
        "超写实风格",
        "3D风格",
        "肖像风格",
      ],
      buttonText: "生成图像",
    },
    backgroundRemoval: {
      title: "背景移除",
      inputLabel: "上传图像",
      inputPlaceholder: "未选择文件",
      buttonText: "移除背景",
    },
    objectRemoval: {
      title: "对象移除",
      inputLabel: "描述要移除的对象",
      inputPlaceholder: "例如：背景中的汽车，图像中的树木",
      buttonText: "移除对象",
    },
    resumeReview: {
      title: "简历审查",
      inputLabel: "上传简历",
      inputPlaceholder: "未选择文件",
      buttonText: "审查简历",
    },
  },
} as const;

export default ai;
