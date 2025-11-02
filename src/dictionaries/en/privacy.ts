export const privacy = {
  title: "Privacy Policy",
  subtitle: "Your Privacy Matters",
  lastUpdated: "Last Updated: January 2025",
  introduction: {
    title: "Introduction",
    content:
      'AI Tools ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.',
  },
  dataCollection: {
    title: "Information We Collect",
    items: [
      {
        title: "Account Information",
        description:
          "When you create an account, we collect your email address, username, and authentication information through Clerk.",
      },
      {
        title: "Usage Data",
        description:
          "We automatically collect information about how you interact with our services, including your AI-generated content, usage patterns, and preferences.",
      },
      {
        title: "Technical Information",
        description:
          "We collect device information, IP addresses, browser type, and other technical data to ensure optimal service delivery.",
      },
      {
        title: "Files and Content",
        description:
          "When you upload files (such as images or resumes) or generate content using our AI tools, we temporarily store this data to provide our services.",
      },
    ],
  },
  dataUse: {
    title: "How We Use Your Information",
    items: [
      {
        title: "Service Provision",
        description:
          "To provide, maintain, and improve our AI tools and services, including content generation, image processing, and resume review.",
      },
      {
        title: "Account Management",
        description:
          "To manage your account, process subscriptions, and communicate with you about your account and our services.",
      },
      {
        title: "Content Storage",
        description:
          "To store and manage your creations, allowing you to access them later and share them in our community.",
      },
      {
        title: "Service Improvement",
        description:
          "To analyze usage patterns and improve our platform's performance, features, and user experience.",
      },
    ],
  },
  dataSharing: {
    title: "Information Sharing",
    content:
      "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
    items: [
      {
        title: "Service Providers",
        description:
          "With trusted third-party service providers (such as SiliconFlow for AI processing, Neon for database hosting) who assist us in operating our platform.",
      },
      {
        title: "Legal Requirements",
        description:
          "When required by law, court order, or government regulation, or to protect our rights, property, or safety.",
      },
      {
        title: "Public Content",
        description:
          "Content you choose to make public in our community will be visible to other users as intended.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at:",
    email: "3095852337@qq.com",
  },
} as const;

export default privacy;
