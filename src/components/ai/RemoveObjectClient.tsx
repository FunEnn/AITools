"use client";

import { Scissors } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { getObjectRemovalFormConfig } from "@/components/ai-tools/formConfigs";
import type { Lang } from "@/i18n";
import { useAiApi } from "@/lib/useApi";

interface RemoveObjectClientProps {
  dict: any;
  lang: Lang;
}

export default function RemoveObjectClient({ dict }: RemoveObjectClientProps) {
  const objectRemovalFormConfig = getObjectRemovalFormConfig(dict);
  const [input, setInput] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 使用AI API Hook
  const { removeObject } = useAiApi();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (removeObject.isPending) {
      return;
    }

    if (!input.trim()) {
      toast.error(dict.ai.aiTools.objectRemoval.inputError);
      return;
    }

    if (!selectedFile) {
      toast.error(dict.ai.aiTools.objectRemoval.fileError);
      return;
    }

    try {
      const result = await removeObject.mutateAsync({
        image: selectedFile,
        object: input,
      });

      if (result?.success && result.content) {
        setGeneratedContent(result.content);
        toast.success(dict.ai.aiTools.objectRemoval.successMessage);
      } else {
        console.error("对象移除失败:", removeObject.error);
        toast.error(dict.ai.aiTools.objectRemoval.errorMessage);
      }
    } catch (error: unknown) {
      console.error("移除对象时出错:", error);
      toast.error(dict.ai.aiTools.objectRemoval.generateError);
    }
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <AiToolLayout>
      <AiToolForm
        onSubmit={onSubmitHandler}
        config={objectRemovalFormConfig}
        inputValue={input}
        onInputChange={setInput}
        selectedValue=""
        onSelect={() => {}}
        loading={removeObject.isPending}
        onFileChange={handleFileChange}
        processingText={dict.ai.processing}
      />

      <AiToolResult
        icon={Scissors}
        title={dict.ai.aiTools.objectRemoval.title}
        placeholderText={dict.ai.aiTools.objectRemoval.placeholder}
        iconColor="text-[#4A7AFF]"
        content={generatedContent}
        loading={removeObject.isPending}
        error={
          removeObject.error
            ? removeObject.error instanceof Error
              ? removeObject.error.message
              : String(removeObject.error)
            : null
        }
        isImage={true}
        processingText={dict.ai.processing}
        processingFailedText={dict.ai.processingFailed}
        imageGeneratedText={dict.ai.imageGenerated}
        viewInNewWindowText={dict.ai.viewInNewWindow}
        generatedImageAltText={dict.ai.generatedImageAlt}
      />
    </AiToolLayout>
  );
}
