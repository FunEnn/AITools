"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Lang } from "@/i18n";
import { useCommunityApi } from "@/lib/useApi";

interface CommunityClientProps {
  dict: any;
  lang: Lang;
}

export default function CommunityClient({ dict }: CommunityClientProps) {
  const [creations, setCreations] = useState<
    Array<{
      id: number;
      user_id: string;
      prompt: string;
      content: string;
      type: string;
      publish: boolean;
      likes: string[];
      created_at: string;
      updated_at: string;
    }>
  >([]);
  const { user } = useUser();

  // 使用API Hook
  const { getPublishedCreations, toggleLikeCreation } = useCommunityApi();

  useEffect(() => {
    if (!user) return;

    const fetchCreations = async () => {
      try {
        const result = await getPublishedCreations.execute();
        if (result?.success && result.data) {
          setCreations(result.data);
        } else {
          console.error("获取创作内容失败:", getPublishedCreations.error);
          toast.error(dict.ai.community.fetchError);
        }
      } catch (error) {
        console.error("获取创作内容时出错:", error);
        toast.error(dict.ai.community.fetchErrorDescription);
      }
    };

    fetchCreations();
  }, [
    user,
    getPublishedCreations.error,
    getPublishedCreations.execute,
    dict.ai.community.fetchError,
    dict.ai.community.fetchErrorDescription,
  ]);

  const handleLike = async (creationId: number) => {
    if (!user) return;

    try {
      const result = await toggleLikeCreation.execute(creationId);
      if (result?.success) {
        // 更新本地状态
        setCreations((prevCreations) =>
          prevCreations.map((creation) => {
            if (creation.id === creationId) {
              const isLiked = creation.likes.includes(user.id);
              return {
                ...creation,
                likes: isLiked
                  ? creation.likes.filter((id) => id !== user.id)
                  : [...creation.likes, user.id],
              };
            }
            return creation;
          }),
        );
        const isLiked =
          creations.find((c) => c.id === creationId)?.likes.includes(user.id) ||
          false;
        toast.success(
          isLiked
            ? dict.ai.community.unlikeSuccess
            : dict.ai.community.likeSuccess,
        );
      } else {
        console.error("点赞操作失败:", toggleLikeCreation.error);
        toast.error(dict.ai.community.likeError);
      }
    } catch (error) {
      console.error("点赞时出错:", error);
      toast.error(dict.ai.community.likeErrorDescription);
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">{dict.ai.community.title}</h1>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {getPublishedCreations.loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : creations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-gray-500 text-center">
              <p className="text-lg font-medium mb-2">
                {dict.ai.community.noCreations}
              </p>
              <p className="text-sm">
                {dict.ai.community.noCreationsDescription}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creations.map((creation) => (
                <div
                  key={creation.id}
                  className="group relative aspect-square overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src={creation.content}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg transition-all duration-300">
                    <p className="text-sm hidden group-hover:block">
                      {creation.prompt}
                    </p>
                    <div className="flex gap-1 items-center">
                      <p>{creation.likes.length}</p>
                      <Heart
                        className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                          user && creation.likes.includes(user.id)
                            ? "fill-red-500 text-red-600"
                            : "text-white"
                        }`}
                        onClick={() => handleLike(creation.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
