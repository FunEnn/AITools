"use client";

import { Hash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { blogTitlesFormConfig } from "@/components/ai-tools/formConfigs";
import { useAiApi } from "@/lib/useApi";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("综合");
  const [input, setInput] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  // 使用AI API Hook
  const { generateBlogTitle } = useAiApi();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (generateBlogTitle.loading) {
      return;
    }

    if (!input.trim()) {
      toast.error("请输入博客主题");
      return;
    }

    try {
      const prompt = `请为关于"${input}"的${selectedCategory}博客生成吸引人的标题。要求标题简洁有力，能够吸引读者点击。`;

      const result = await generateBlogTitle.execute({
        prompt: prompt,
      });

      if (result?.success && result.content) {
        setGeneratedContent(result.content);
        toast.success("标题生成成功！");
      } else {
        console.error("标题生成失败:", generateBlogTitle.error);
        toast.error("标题生成失败，请重试");
      }
    } catch (error: any) {
      console.error("生成标题时出错:", error);

      // 特殊处理超时错误
      if (error.isTimeout) {
        toast.error("AI生成时间较长，请稍后重试");
      } else {
        toast.error("生成标题时出错，请重试");
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
        loading={generateBlogTitle.loading}
      />

      <AiToolResult
        icon={Hash}
        title="生成的标题"
        placeholderText='输入主题并点击"生成标题"开始'
        iconColor="text-[#8E37EB]"
        content={generatedContent}
        loading={generateBlogTitle.loading}
        error={generateBlogTitle.error}
        renderMarkdown={true}
      />
    </AiToolLayout>
  );
}
