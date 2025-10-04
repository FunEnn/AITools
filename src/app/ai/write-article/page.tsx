"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { articleFormConfig } from "@/components/ai-tools/formConfigs";

export default function Page() {
  const [selectedLength, setSelectedLength] = useState(
    articleFormConfig.options[0],
  );
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // 处理表单提交逻辑
    console.log("Article topic:", input);
    console.log("Article length:", selectedLength);
  };

  return (
    <AiToolLayout>
      <AiToolForm
        onSubmit={onSubmitHandler}
        config={articleFormConfig}
        inputValue={input}
        onInputChange={setInput}
        selectedValue={selectedLength}
        onSelect={setSelectedLength}
      />

      <AiToolResult
        icon={Edit}
        title="Generated article"
        placeholderText='Enter a topic and click "Generate article" to get started'
        iconColor="text-[#4A7AFF]"
        maxHeight="min-h-96 max-h-[600px]"
      />
    </AiToolLayout>
  );
}
