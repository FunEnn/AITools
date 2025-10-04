"use client";

import { Eraser } from "lucide-react";
import { useState } from "react";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { backgroundRemovalFormConfig } from "@/components/ai-tools/formConfigs";

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
        config={backgroundRemovalFormConfig}
        inputValue={fileName}
        onInputChange={setFileName}
        selectedValue=""
        onSelect={() => {}}
      />

      <AiToolResult
        icon={Eraser}
        title="Processed Image"
        placeholderText='Upload an image and click "Remove Background" to get started'
        iconColor="text-[#FF6B35]"
      />
    </AiToolLayout>
  );
}
