"use client";

import { FileText } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { resumeReviewFormConfig } from "@/components/ai-tools/formConfigs";
import { useAiApi } from "@/lib/useApi";

export default function Page() {
  const [fileName, setFileName] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 使用AI API Hook
  const { reviewResume } = useAiApi();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (reviewResume.loading) {
      return;
    }

    if (!selectedFile) {
      toast.error("请选择要审查的简历文件");
      return;
    }

    // 检查文件类型
    if (selectedFile.type !== "application/pdf") {
      toast.error("请上传PDF格式的简历文件");
      return;
    }

    try {
      const result = await reviewResume.execute(selectedFile);

      if (result && result.success && result.content) {
        setGeneratedContent(result.content);
        toast.success("简历审查完成！");
      } else {
        console.error("简历审查失败:", reviewResume.error);
        toast.error("简历审查失败，请重试");
      }
    } catch (error: any) {
      console.error("审查简历时出错:", error);

      // 特殊处理超时错误
      if (error.isTimeout) {
        toast.error("AI处理时间较长，请稍后重试");
      } else {
        toast.error("审查简历时出错，请重试");
      }
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
        loading={reviewResume.loading}
        acceptFileTypes="application/pdf"
        onFileChange={(file) => {
          setSelectedFile(file);
          if (file) {
            setFileName(file.name);
          }
        }}
      />

      <AiToolResult
        icon={FileText}
        title="简历审查结果"
        placeholderText='上传简历并点击"审查简历"开始分析'
        iconColor="text-[#00D4AA]"
        content={generatedContent}
        loading={reviewResume.loading}
        error={reviewResume.error}
        renderMarkdown={true}
      />
    </AiToolLayout>
  );
}
