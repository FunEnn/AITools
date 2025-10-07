"use client";

import { ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { imageGenerationFormConfig } from "@/components/ai-tools/formConfigs";
import { useAiApi } from "@/lib/useApi";

export default function Page() {
  const [selectedStyle, setSelectedStyle] = useState("写实风格");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  // 使用AI API Hook
  const { generateImage } = useAiApi();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (generateImage.loading) {
      return;
    }

    if (!input.trim()) {
      toast.error("请输入图像描述");
      return;
    }

    try {
      const prompt = `请生成一个${selectedStyle}风格的图像，描述：${input}。要求图像质量高，细节丰富。`;

      const result = await generateImage.execute({
        prompt: prompt,
        publish: publish,
      });

      if (result && result.success && result.content) {
        setGeneratedContent(result.content);
        toast.success("图像生成成功！");
      } else {
        console.error("图像生成失败:", generateImage.error);
        toast.error("图像生成失败，请重试");
      }
    } catch (error: any) {
      console.error("生成图像时出错:", error);

      // 特殊处理超时错误
      if (error.isTimeout) {
        toast.error("AI生成时间较长，请稍后重试");
      } else {
        toast.error("生成图像时出错，请重试");
      }
    }
  };

  return (
    <AiToolLayout>
      <AiToolForm
        onSubmit={onSubmitHandler}
        config={imageGenerationFormConfig}
        inputValue={input}
        onInputChange={setInput}
        selectedValue={selectedStyle}
        onSelect={setSelectedStyle}
        loading={generateImage.loading}
      >
        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">公开此图像</p>
        </div>
      </AiToolForm>

      <AiToolResult
        icon={ImageIcon}
        title="生成的图像"
        placeholderText='输入描述并点击"生成图像"开始'
        iconColor="text-[#00AD25]"
        content={generatedContent}
        loading={generateImage.loading}
        error={generateImage.error}
        isImage={true}
      />
    </AiToolLayout>
  );
}
