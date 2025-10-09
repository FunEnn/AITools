"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { assets } from "@/assets/assets";
import Sidebar from "@/components/layout/Sidebar";
import type { Dictionary } from "@/types/dictionary";

interface AILayoutClientProps {
  children: React.ReactNode;
  dict: Dictionary;
  lang: string;
}

export default function AILayoutClient({
  children,
  dict,
  lang,
}: AILayoutClientProps) {
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  // 加载中状态
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          {/* 旋转的加载图标 */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            <div
              className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-[#9234EA] rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "0.8s",
              }}
            ></div>
          </div>
          {/* 加载文字 */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-700 mb-1">
              正在加载
            </h3>
            <p className="text-sm text-gray-600">请稍候...</p>
          </div>
        </div>
      </div>
    );
  }

  // 未登录时显示登录页面
  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SignIn routing="hash" />
      </div>
    );
  }

  // 已登录时显示正常布局
  return (
    <>
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <Image
          src={assets.logo}
          alt="Logo"
          onClick={() => router.push("/")}
          className="cursor-pointer w-24 sm:w-32"
        />
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        )}
      </nav>

      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
          dict={dict}
          lang={lang}
        />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
