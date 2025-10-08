"use client";

import { Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-background">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Logo */}
        <Image
          src={assets.logo}
          alt="logo"
          className="w-24 sm:w-32 mx-auto cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* 404 Text */}
        <h1 className="text-7xl sm:text-9xl font-bold text-[--color-primary]">
          404
        </h1>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">页面未找到</h2>
          <p className="text-lg opacity-80">
            抱歉，您要访问的页面似乎不存在。可能是链接已过期或输入的地址有误。
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => router.push("/")}
          className="bg-[--color-primary] hover:opacity-90 text-white px-8 py-6 rounded-xl text-lg flex items-center gap-2 mx-auto transition-opacity"
        >
          <Home className="w-5 h-5" />
          返回首页
        </Button>
      </div>
    </div>
  );
}
