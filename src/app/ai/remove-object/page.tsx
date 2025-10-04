"use client";

import { Scissors } from "lucide-react";
import { useState } from "react";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { objectRemovalFormConfig } from "@/components/ai-tools/formConfigs";

export default function Page() {
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // 处理表单提交逻辑
    console.log("File name:", fileName);
    console.log("Description:", description);
  };

  return (
    <AiToolLayout>
      <AiToolForm
        onSubmit={onSubmitHandler}
        config={objectRemovalFormConfig}
        inputValue={description}
        onInputChange={setDescription}
        selectedValue=""
        onSelect={() => {}}
      >
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Upload image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFileName(file.name);
              }
            }}
            className="w-full p-2 px-3 outline-none text-sm rounded-md border border-gray-300"
          />
        </div>
      </AiToolForm>

      <AiToolResult
        icon={Scissors}
        title="Processed Image"
        placeholderText="Upload an image and describe what to remove"
        iconColor="text-gray-500"
      />
    </AiToolLayout>
  );
}
