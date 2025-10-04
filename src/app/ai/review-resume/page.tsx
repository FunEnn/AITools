"use client";

import { FileText } from "lucide-react";
import { useState } from "react";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { resumeReviewFormConfig } from "@/components/ai-tools/formConfigs";

export default function Page() {
  const [fileName, setFileName] = useState("");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // 处理表单提交逻辑
    console.log("File name:", fileName);
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
      />

      <AiToolResult
        icon={FileText}
        title="Analysis Results"
        placeholderText='Upload a resume and click "Review Resume" to get started'
        iconColor="text-[#00D4AA]"
      />
    </AiToolLayout>
  );
}
