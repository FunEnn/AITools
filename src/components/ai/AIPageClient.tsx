"use client";

import { Protect } from "@clerk/nextjs";
import { Gem, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreationItem from "@/components/ui/CreationItem";
import type { Lang } from "@/i18n";
import { useUserApi } from "@/lib/useApi";
import type { Dictionary } from "@/types/dictionary";

interface AIPageClientProps {
  dict: Dictionary;
  lang: Lang;
}

export default function AIPageClient({ dict }: AIPageClientProps) {
  const { getUserCreations } = useUserApi();
  const [creations, setCreations] = useState<
    Array<{
      id: number;
      prompt: string;
      type: string;
      content: string;
      created_at: string;
    }>
  >([]);

  useEffect(() => {
    const fetchUserCreations = async () => {
      try {
        const result = await getUserCreations.execute();
        if (result?.success && result.data) {
          setCreations(result.data);
        } else {
          console.error("获取用户创作内容失败:", getUserCreations.error);
          toast.error(dict.ai.fetchError);
        }
      } catch (error) {
        console.error("获取创作内容时出错:", error);
        toast.error(dict.ai.fetchErrorDescription);
      }
    };

    fetchUserCreations();
  }, [
    getUserCreations.error,
    getUserCreations.execute,
    dict.ai.fetchError,
    dict.ai.fetchErrorDescription,
  ]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">{dict.ai.totalCreations}</p>
            {getUserCreations.loading ? (
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <h2 className="text-xl font-semibold">{creations.length}</h2>
            )}
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">{dict.ai.activePlan}</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Creations */}
      <div className="space-y-3">
        <p className="mt-6 mb-4">{dict.ai.recentCreations}</p>
        {getUserCreations.loading ? (
          <div className="space-y-4">
            {/* 骨架屏加载效果 */}
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={`skeleton-${Date.now()}-${index}`}
                className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : creations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-gray-500 text-center">
              <p className="text-lg font-medium mb-2">{dict.ai.noCreations}</p>
              <p className="text-sm">{dict.ai.noCreationsDescription}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {creations.map((item) => (
              <div
                key={item.id}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              >
                <CreationItem item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
