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
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <Image
          src={assets.logo}
          alt="logo"
          className="w-24 sm:w-32 mx-auto cursor-pointer"
          onClick={() => router.push("/")}
          width={128}
          height={40}
          priority
        />

        {/* 404 Text */}
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-8xl font-bold text-primary">404</h1>
          <h2 className="text-xl font-medium text-gray-600">页面未找到</h2>
          <p className="text-gray-500">抱歉，您要访问的页面不存在。</p>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => router.push("/")}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
        >
          <Home className="w-4 h-4" />
          返回首页
        </Button>
      </div>
    </div>
  );
}
