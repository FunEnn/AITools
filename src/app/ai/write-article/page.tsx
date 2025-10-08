"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { articleFormConfig } from "@/components/ai-tools/formConfigs";
import { useAiApi } from "@/lib/useApi";

export default function Page() {
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
      toast.error("请输入文章主题");
      return;
    }

    try {
      // 构建中文prompt模板字符串
      const length = selectedLength;
      const prompt = `请写一篇关于"${input}"的${length}字文章。要求内容详实、结构清晰、逻辑严谨。`;

      const result = await generateArticle.execute({
        prompt: prompt,
        length: length,
      });

      if (result?.success && result.content) {
        setGeneratedContent(result.content);
        toast.success("文章生成成功！");
      } else {
        console.error("文章生成失败:", generateArticle.error);
        toast.error("文章生成失败，请重试");
      }
    } catch (error: any) {
      console.error("生成文章时出错:", error);

      // 特殊处理超时错误
      if (error.isTimeout) {
        toast.error("AI生成时间较长，请稍后重试");
      } else {
        toast.error("生成文章时出错，请重试");
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
        title="生成的文章"
        placeholderText='输入主题并点击"生成文章"开始'
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
