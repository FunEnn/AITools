"use client";

import { Scissors } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AiToolForm from "@/components/ai-tools/AiToolForm";
import AiToolLayout from "@/components/ai-tools/AiToolLayout";
import AiToolResult from "@/components/ai-tools/AiToolResult";
import { objectRemovalFormConfig } from "@/components/ai-tools/formConfigs";
import { useAiApi } from "@/lib/useApi";

export default function Page() {
  const [_fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 使用AI API Hook
  const { removeObject } = useAiApi();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (removeObject.loading) {
      return;
    }

    if (!selectedFile) {
      toast.error("请选择要处理的图片");
      return;
    }

    if (!description.trim()) {
      toast.error("请描述要移除的对象");
      return;
    }

    try {
      const result = await removeObject.execute({
        image: selectedFile,
        object: description,
      });

      if (result?.success && result.content) {
        setGeneratedContent(result.content);
        toast.success("对象移除成功！");
      } else {
        console.error("对象移除失败:", removeObject.error);
        toast.error("对象移除失败，请重试");
      }
    } catch (error: any) {
      console.error("移除对象时出错:", error);

      // 特殊处理超时错误
      if (error.isTimeout) {
        toast.error("AI处理时间较长，请稍后重试");
      } else {
        toast.error("移除对象时出错，请重试");
      }
    }
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
        loading={removeObject.loading}
      >
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">上传图片</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFileName(file.name);
                setSelectedFile(file);
              }
            }}
            className="w-full p-2 px-3 outline-none text-sm rounded-md border border-gray-300"
          />
        </div>
      </AiToolForm>

      <AiToolResult
        icon={Scissors}
        title="处理后的图像"
        placeholderText="上传图片并描述要移除的对象"
        iconColor="text-gray-500"
        content={generatedContent}
        loading={removeObject.loading}
        error={removeObject.error}
        isImage={true}
      />
    </AiToolLayout>
  );
}
