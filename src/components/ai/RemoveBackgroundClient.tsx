"use client";

import { Eraser } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { getBackgroundRemovalFormConfig } from "@/components/ai-tools/formConfigs";
import type { Lang } from "@/i18n";
import { useAiApi } from "@/lib/useApi";

interface RemoveBackgroundClientProps {
  dict: any;
  lang: Lang;
}

export default function RemoveBackgroundClient({
  dict,
}: RemoveBackgroundClientProps) {
  const backgroundRemovalFormConfig = getBackgroundRemovalFormConfig(dict);
  const [fileName, setFileName] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 使用AI API Hook
  const { removeBackground } = useAiApi();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (removeBackground.loading) {
      return;
    }

    if (!selectedFile) {
      toast.error(dict.ai.aiTools.backgroundRemoval.inputError);
      return;
    }

    try {
      const result = await removeBackground.execute(selectedFile);

      if (result?.success && result.content) {
        setGeneratedContent(result.content);
        toast.success(dict.ai.aiTools.backgroundRemoval.successMessage);
      } else {
        console.error("背景移除失败:", removeBackground.error);
        toast.error(dict.ai.aiTools.backgroundRemoval.errorMessage);
      }
    } catch (error: unknown) {
      console.error("移除背景时出错:", error);
      toast.error(dict.ai.aiTools.backgroundRemoval.generateError);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  return (
    <AiToolLayout>
      <AiToolForm
        onSubmit={onSubmitHandler}
        config={backgroundRemovalFormConfig}
        inputValue={fileName}
        onInputChange={setFileName}
        selectedValue=""
        onSelect={() => {}}
        loading={removeBackground.loading}
        onFileChange={handleFileChange}
      />

      <AiToolResult
        icon={Eraser}
        title={dict.ai.aiTools.backgroundRemoval.title}
        placeholderText={dict.ai.aiTools.backgroundRemoval.placeholder}
        iconColor="text-[#FF6B35]"
        content={generatedContent}
        loading={removeBackground.loading}
        error={removeBackground.error}
        isImage={true}
      />
    </AiToolLayout>
  );
}
