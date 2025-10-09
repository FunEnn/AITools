"use client";

import { ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { getImageGenerationFormConfig } from "@/components/ai-tools/formConfigs";
import type { Lang } from "@/i18n";
import { useAiApi } from "@/lib/useApi";

interface GenerateImagesClientProps {
  dict: any;
  lang: Lang;
}

export default function GenerateImagesClient({
  dict,
}: GenerateImagesClientProps) {
  const imageGenerationFormConfig = getImageGenerationFormConfig(dict);
  const [selectedStyle, setSelectedStyle] = useState(
    imageGenerationFormConfig.options[0],
  );
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
      toast.error(dict.ai.aiTools.imageGeneration.inputError);
      return;
    }

    try {
      const prompt = `请生成一个${selectedStyle}风格的图像，描述：${input}。要求图像质量高，细节丰富。`;

      const result = await generateImage.execute({
        prompt: prompt,
        publish: publish,
      });

      if (result?.success && result.content) {
        setGeneratedContent(result.content);
        toast.success(dict.ai.aiTools.imageGeneration.successMessage);
      } else {
        console.error("图像生成失败:", generateImage.error);
        toast.error(dict.ai.aiTools.imageGeneration.errorMessage);
      }
    } catch (error: unknown) {
      console.error("生成图像时出错:", error);

      // 特殊处理超时错误
      if (
        error &&
        typeof error === "object" &&
        "isTimeout" in error &&
        (error as { isTimeout?: boolean }).isTimeout
      ) {
        toast.error(dict.ai.aiTools.imageGeneration.timeoutMessage);
      } else {
        toast.error(dict.ai.aiTools.imageGeneration.generateError);
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
          <p className="text-sm">
            {dict.ai.aiTools.imageGeneration.publishLabel}
          </p>
        </div>
      </AiToolForm>

      <AiToolResult
        icon={ImageIcon}
        title={dict.ai.aiTools.imageGeneration.title}
        placeholderText={dict.ai.aiTools.imageGeneration.placeholder}
        iconColor="text-[#00AD25]"
        content={generatedContent}
        loading={generateImage.loading}
        error={generateImage.error}
        isImage={true}
      />
    </AiToolLayout>
  );
}
