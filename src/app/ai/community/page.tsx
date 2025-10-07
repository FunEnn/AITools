"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { dummyPublishedCreationData } from "@/assets/assets";

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

  const fetchCreations = useCallback(async () => {
    setCreations(dummyPublishedCreationData);
  }, []);

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user, fetchCreations]);

  const handleLike = (creationId: number) => {
    if (!user) return;

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
  };

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Creations</h1>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {creations.map((creation) => (
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
        ))}
      </div>
    </div>
  );
}
