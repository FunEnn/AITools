"use client";

import { Eraser } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { backgroundRemovalFormConfig } from "@/components/ai-tools/formConfigs";
import { useAiApi } from "@/lib/useApi";

export default function Page() {
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
      toast.error("请选择要处理的图片");
      return;
    }

    try {
      const result = await removeBackground.execute(selectedFile);

      if (result && result.success && result.content) {
        setGeneratedContent(result.content);
        toast.success("背景移除成功！");
      } else {
        console.error("背景移除失败:", removeBackground.error);
        toast.error("背景移除失败，请重试");
      }
    } catch (error: any) {
      console.error("移除背景时出错:", error);

      // 特殊处理超时错误
      if (error.isTimeout) {
        toast.error("AI处理时间较长，请稍后重试");
      } else {
        toast.error("移除背景时出错，请重试");
      }
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
        onFileChange={(file) => {
          setSelectedFile(file);
        }}
      />

      <AiToolResult
        icon={Eraser}
        title="处理后的图像"
        placeholderText='上传图片并点击"移除背景"开始处理'
        iconColor="text-[#FF6B35]"
        content={generatedContent}
        loading={removeBackground.loading}
        error={removeBackground.error}
        isImage={true}
      />
    </AiToolLayout>
  );
}
