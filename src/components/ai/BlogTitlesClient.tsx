"use client";

import { Hash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { getBlogTitlesFormConfig } from "@/components/ai-tools/formConfigs";
import type { Lang } from "@/i18n";
import { useAiApi } from "@/lib/useApi";

interface BlogTitlesClientProps {
  dict: any;
  lang: Lang;
}

export default function BlogTitlesClient({
  dict,
  lang,
}: BlogTitlesClientProps) {
  const blogTitlesFormConfig = getBlogTitlesFormConfig(dict);
  const [selectedCategory, setSelectedCategory] = useState(
    blogTitlesFormConfig.options[0],
  );
  const [input, setInput] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  // 使用AI API Hook
  const { generateBlogTitle } = useAiApi();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (generateBlogTitle.isPending) {
      return;
    }

    if (!input.trim()) {
      toast.error(dict.ai.blogTitles.inputError);
      return;
    }

    try {
      const language = lang === "zh" ? "中文" : "English";
      const prompt =
        dict.ai.blogTitles.promptTemplate
          .replace("{topic}", input)
          .replace("{category}", selectedCategory) +
        ` 请用${language}生成标题。`;

      const result = await generateBlogTitle.mutateAsync({ prompt });

      if (result?.success && result.content) {
        setGeneratedContent(result.content);
        toast.success(dict.ai.blogTitles.successMessage);
      } else {
        console.error("标题生成失败:", generateBlogTitle.error);
        toast.error(dict.ai.blogTitles.errorMessage);
      }
    } catch (error: unknown) {
      console.error("生成标题时出错:", error);

      // 特殊处理超时错误
      if (
        error &&
        typeof error === "object" &&
        "isTimeout" in error &&
        (error as { isTimeout?: boolean }).isTimeout
      ) {
        toast.error(dict.ai.blogTitles.timeoutMessage);
      } else {
        toast.error(dict.ai.blogTitles.generateError);
      }
    }
  };

  return (
    <AiToolLayout>
      <AiToolForm
        onSubmit={onSubmitHandler}
        config={blogTitlesFormConfig}
        inputValue={input}
        onInputChange={setInput}
        selectedValue={selectedCategory}
        onSelect={setSelectedCategory}
        loading={generateBlogTitle.isPending}
      />

      <AiToolResult
        icon={Hash}
        title={dict.ai.blogTitles.title}
        placeholderText={dict.ai.blogTitles.placeholder}
        iconColor="text-[#8E37EB]"
        content={generatedContent}
        loading={generateBlogTitle.isPending}
        error={
          generateBlogTitle.error
            ? generateBlogTitle.error instanceof Error
              ? generateBlogTitle.error.message
              : String(generateBlogTitle.error)
            : null
        }
        renderMarkdown={true}
      />
    </AiToolLayout>
  );
}
