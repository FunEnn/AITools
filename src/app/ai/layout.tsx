"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { assets } from "@/assets/assets";
import Sidebar from "@/components/layout/Sidebar";

interface AILayoutProps {
  children: React.ReactNode;
}

export default function AILayout({ children }: AILayoutProps) {
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  // 加载中状态
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
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
          className="cursor-pointer w-32 sm:w-44"
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
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
