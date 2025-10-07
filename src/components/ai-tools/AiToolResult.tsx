"use client";

import type { LucideIcon } from "lucide-react";
import Markdown from "react-markdown";

interface AiToolResultProps {
  icon: LucideIcon;
  title: string;
  placeholderText: string;
  iconColor?: string;
  maxHeight?: string;
  content?: string;
  loading?: boolean;
  error?: string | null;
  renderMarkdown?: boolean;
  isImage?: boolean;
}

export default function AiToolResult({
  icon: Icon,
  title,
  placeholderText,
  iconColor = "text-[#4A7AFF]",
  maxHeight = "min-h-96",
  content,
  loading = false,
  error,
  renderMarkdown = false,
  isImage = false,
}: AiToolResultProps) {
  return (
    <div
      className={`w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 ${maxHeight}`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#4A7AFF]"></div>
            <p>正在处理中...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-red-500">
            <Icon className="w-9 h-9" />
            <p>处理失败: {error}</p>
          </div>
        </div>
      ) : content ? (
        <div className="flex-1 p-4 overflow-y-auto">
          {isImage ? (
            <div className="flex flex-col items-center gap-4">
              <img
                src={content}
                alt="生成的图像"
                className="max-w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  console.error("图片加载失败:", content);
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">图片已生成完成</p>
                <a
                  href={content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm underline"
                >
                  在新窗口中查看
                </a>
              </div>
            </div>
          ) : (
            <div className="prose max-w-none">
              {renderMarkdown ? (
                <div className="whitespace-pre-wrap text-sm reset-tw">
                  <Markdown>{content}</Markdown>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-sm">{content}</pre>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Icon className="w-9 h-9" />
            <p>{placeholderText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
