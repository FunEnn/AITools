"use client";

import { FileText } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { getResumeReviewFormConfig } from "@/components/ai-tools/formConfigs";
import type { Lang } from "@/i18n";
import { useAiApi } from "@/lib/useApi";

interface ReviewResumeClientProps {
  dict: any;
  lang: Lang;
}

export default function ReviewResumeClient({
  dict,
  lang,
}: ReviewResumeClientProps) {
  const resumeReviewFormConfig = getResumeReviewFormConfig(dict);
  const [fileName, setFileName] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 使用AI API Hook
  const { reviewResume } = useAiApi();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (reviewResume.isPending) {
      return;
    }

    if (!selectedFile) {
      toast.error(dict.ai.aiTools.resumeReview.inputError);
      return;
    }

    try {
      const result = await reviewResume.mutateAsync({
        resume: selectedFile,
        language: lang,
      });

      if (result?.success && result.content) {
        setGeneratedContent(result.content);
        toast.success(dict.ai.aiTools.resumeReview.successMessage);
      } else {
        console.error("简历审查失败:", reviewResume.error);
        toast.error(dict.ai.aiTools.resumeReview.errorMessage);
      }
    } catch (error: unknown) {
      console.error("审查简历时出错:", error);
      toast.error(dict.ai.aiTools.resumeReview.generateError);
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
        config={resumeReviewFormConfig}
        inputValue={fileName}
        onInputChange={setFileName}
        selectedValue=""
        onSelect={() => {}}
        loading={reviewResume.isPending}
        onFileChange={handleFileChange}
      />

      <AiToolResult
        icon={FileText}
        title={dict.ai.aiTools.resumeReview.title}
        placeholderText={dict.ai.aiTools.resumeReview.placeholder}
        iconColor="text-[#00D4AA]"
        content={generatedContent}
        loading={reviewResume.isPending}
        error={
          reviewResume.error
            ? reviewResume.error instanceof Error
              ? reviewResume.error.message
              : String(reviewResume.error)
            : null
        }
        renderMarkdown={true}
      />
    </AiToolLayout>
  );
}
