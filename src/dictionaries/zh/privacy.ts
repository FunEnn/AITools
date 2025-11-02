export const privacy = {
  title: "隐私政策",
  subtitle: "您的隐私对我们至关重要",
  lastUpdated: "最后更新：2025年1月",
  introduction: {
    title: "简介",
    content:
      "AI Tools（“我们”、“我们的”或“我方”）致力于保护您的隐私。本隐私政策说明了您使用我们的平台和服务时，我们如何收集、使用、披露和保护您的信息。",
  },
  dataCollection: {
    title: "我们收集的信息",
    items: [
      {
        title: "账户信息",
        description:
          "当您创建账户时，我们通过 Clerk 收集您的邮箱地址、用户名和身份验证信息。",
      },
      {
        title: "使用数据",
        description:
          "我们自动收集您与我们服务交互的信息，包括您生成的 AI 内容、使用模式和偏好设置。",
      },
      {
        title: "技术信息",
        description:
          "我们收集设备信息、IP 地址、浏览器类型和其他技术数据，以确保最佳的服务交付。",
      },
      {
        title: "文件和内容",
        description:
          "当您上传文件（如图像或简历）或使用我们的 AI 工具生成内容时，我们会临时存储这些数据以提供服务。",
      },
    ],
  },
  dataUse: {
    title: "我们如何使用您的信息",
    items: [
      {
        title: "服务提供",
        description:
          "提供、维护和改进我们的 AI 工具和服务，包括内容生成、图像处理和简历审查。",
      },
      {
        title: "账户管理",
        description:
          "管理您的账户、处理订阅，并就您的账户和我们的服务与您沟通。",
      },
      {
        title: "内容存储",
        description:
          "存储和管理您的创作内容，允许您稍后访问并在我们的社区中分享。",
      },
      {
        title: "服务改进",
        description: "分析使用模式，改进我们平台的性能、功能和用户体验。",
      },
    ],
  },
  dataSharing: {
    title: "信息共享",
    content:
      "我们不会向第三方出售、交易或出租您的个人信息。我们仅在以下情况下共享您的信息：",
    items: [
      {
        title: "服务提供商",
        description:
          "与值得信赖的第三方服务提供商（如用于 AI 处理的 SiliconFlow、用于数据库托管的 Neon）共享，他们协助我们运营平台。",
      },
      {
        title: "法律要求",
        description:
          "在法律、法院命令或政府法规要求时，或为保护我们的权利、财产或安全时。",
      },
      {
        title: "公开内容",
        description: "您选择在我们社区中公开的内容将按预期对其他用户可见。",
      },
    ],
  },
  contact: {
    title: "联系我们",
    content: "如果您对本隐私政策有任何疑问，请通过以下方式联系我们：",
    email: "3095852337@qq.com",
  },
} as const;

export default privacy;
