"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCommunityApi } from "@/lib/useApi";

export default function Community() {
  const [creations, setCreations] = useState<
    Array<{
      id: number;
      user_id: string;
      prompt: string;
      content: any;
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
          toast.error("获取创作内容失败，请重试");
        }
      } catch (error) {
        console.error("获取创作内容时出错:", error);
        toast.error("获取创作内容时出错，请重试");
      }
    };

    fetchCreations();
  }, [user, getPublishedCreations.error, getPublishedCreations.execute]);

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
        toast.success(isLiked ? "取消点赞" : "点赞成功");
      } else {
        console.error("点赞操作失败:", toggleLikeCreation.error);
        toast.error("点赞操作失败，请重试");
      }
    } catch (error) {
      console.error("点赞时出错:", error);
      toast.error("点赞时出错，请重试");
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">社区创作</h1>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {getPublishedCreations.loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
          </div>
        ) : creations.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">暂无创作内容</div>
          </div>
        ) : (
          creations.map((creation) => (
            <div
              key={creation.id}
              className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
            >
              <Image
                src={creation.content}
                alt=""
                width={300}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
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
          ))
        )}
      </div>
    </div>
  );
}
