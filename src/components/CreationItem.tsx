import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";

interface CreationItemProps {
  item: {
    id: number;
    prompt: string;
    type: string;
    content: string;
    created_at: string;
  };
}

export default function CreationItem({ item }: CreationItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg">
      <button
        type="button"
        className="flex justify-between items-center gap-4 w-full cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div>
          <h2>{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <span className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full">
          {item.type}
        </span>
      </button>

      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <Image
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md"
                width={400}
                height={300}
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
