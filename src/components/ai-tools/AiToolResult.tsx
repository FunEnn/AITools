"use client";

import type { LucideIcon } from "lucide-react";

interface AiToolResultProps {
  icon: LucideIcon;
  title: string;
  placeholderText: string;
  iconColor?: string;
  maxHeight?: string;
}

export default function AiToolResult({
  icon: Icon,
  title,
  placeholderText,
  iconColor = "text-[#4A7AFF]",
  maxHeight = "min-h-96",
}: AiToolResultProps) {
  return (
    <div
      className={`w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 ${maxHeight}`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
          <Icon className="w-9 h-9" />
          <p>{placeholderText}</p>
        </div>
      </div>
    </div>
  );
}
