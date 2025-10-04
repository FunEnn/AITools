"use client";

import { ImageIcon } from "lucide-react";
import { useState } from "react";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { imageGenerationFormConfig } from "@/components/ai-tools/formConfigs";

export default function Page() {
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // 处理表单提交逻辑
    console.log("Image prompt:", input);
    console.log("Selected style:", selectedStyle);
    console.log("Publish:", publish);
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
          <p className="text-sm">Make this image Public</p>
        </div>
      </AiToolForm>

      <AiToolResult
        icon={ImageIcon}
        title="Generated image"
        placeholderText='Enter a topic and click "Generate image" to get started'
        iconColor="text-[#00AD25]"
      />
    </AiToolLayout>
  );
}
