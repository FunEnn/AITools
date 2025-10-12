"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { getArticleFormConfig } from "@/components/ai-tools/formConfigs";
import type { Lang } from "@/i18n";
import { useAiApi } from "@/lib/useApi";

interface WriteArticleClientProps {
  dict: any;
  lang: Lang;
}

export default function WriteArticleClient({
  dict,
  lang,
}: WriteArticleClientProps) {
  const articleFormConfig = getArticleFormConfig(dict);
  const [selectedLength, setSelectedLength] = useState(
    articleFormConfig.options[0],
  );

  const [input, setInput] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  // 使用AI API Hook
  const { generateArticle } = useAiApi();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (generateArticle.loading) {
      return;
    }

    if (!input.trim()) {
      toast.error(dict.ai.writeArticle.inputError);
      return;
    }

    try {
      // 构建prompt模板字符串
      const length = selectedLength.valueOf();
      const language = lang === "zh" ? "中文" : "English";
      const prompt =
        dict.ai.writeArticle.promptTemplate
          .replace("{topic}", input)
          .replace("{length}", length.toString()) +
        ` 请用${language}生成文章内容。`;

      const result = await generateArticle.execute({
        prompt: prompt,
        length: length.toString(),
      });

      if (result?.success && result.content) {
        setGeneratedContent(result.content);
        toast.success(dict.ai.writeArticle.successMessage);
      } else {
        console.error("文章生成失败:", generateArticle.error);
        toast.error(dict.ai.writeArticle.errorMessage);
      }
    } catch (error: unknown) {
      console.error("生成文章时出错:", error);

      // 特殊处理超时错误
      if (
        error &&
        typeof error === "object" &&
        "isTimeout" in error &&
        (error as { isTimeout?: boolean }).isTimeout
      ) {
        toast.error(dict.ai.writeArticle.timeoutMessage);
      } else {
        toast.error(dict.ai.writeArticle.generateError);
      }
    }
  };

  return (
    <AiToolLayout>
      <AiToolForm
        onSubmit={onSubmitHandler}
        config={articleFormConfig}
        inputValue={input}
        onInputChange={setInput}
        selectedValue={selectedLength}
        onSelect={setSelectedLength}
        loading={generateArticle.loading}
      />

      <AiToolResult
        icon={Edit}
        title={dict.ai.writeArticle.title}
        placeholderText={dict.ai.writeArticle.placeholder}
        iconColor="text-[#4A7AFF]"
        content={generatedContent}
        loading={generateArticle.loading}
        error={generateArticle.error}
        maxHeight="min-h-96 max-h-[600px]"
        renderMarkdown={true}
      />
    </AiToolLayout>
  );
}
