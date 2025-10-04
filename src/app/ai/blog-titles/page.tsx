"use client";

import { Hash } from "lucide-react";
import { useState } from "react";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { blogTitlesFormConfig } from "@/components/ai-tools/formConfigs";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // 处理表单提交逻辑
    console.log("Blog topic:", input);
    console.log("Selected category:", selectedCategory);
  };

  return (
    <AiToolLayout>
      <AiToolForm
        onSubmit={onSubmitHandler}
        config={blogTitlesFormConfig}
        inputValue={input}
        onInputChange={setInput}
        selectedValue={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <AiToolResult
        icon={Hash}
        title="Generated titles"
        placeholderText='Enter a topic and click "Generate title" to get started'
        iconColor="text-[#8E37EB]"
      />
    </AiToolLayout>
  );
}
