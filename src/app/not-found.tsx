"use client";

import { Home } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/dictionaries";
import type { Lang } from "@/i18n";
import { defaultLang, langs } from "@/i18n";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [dict, setDict] = useState({
    title: "404",
    heading: "页面未找到",
    description: "抱歉，您要访问的页面不存在。",
    backToHome: "返回首页",
  });

  useEffect(() => {
    const loadTranslations = async () => {
      // 从路径中检测语言
      const detectedLang =
        langs.find((lang) => pathname.startsWith(`/${lang}`)) || defaultLang;

      try {
        // 使用字典系统获取翻译
        const translations = await getDictionary(detectedLang as Lang);
        setDict(translations.notFound);
      } catch (error) {
        console.error("Failed to load translations:", error);
        // 回退到默认翻译
        if (detectedLang === "en") {
          setDict({
            title: "404",
            heading: "Page Not Found",
            description: "Sorry, the page you are looking for does not exist.",
            backToHome: "Back to Home",
          });
        }
      }
    };

    loadTranslations();
  }, [pathname]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <Image
          src={assets.logo}
          alt="logo"
          className="w-24 sm:w-32 mx-auto cursor-pointer"
          onClick={() => router.push(`/${defaultLang}`)}
          width={128}
          height={40}
          priority
        />

        {/* 404 Text */}
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-8xl font-bold text-primary">
            {dict.title}
          </h1>
          <h2 className="text-xl font-medium text-gray-600">{dict.heading}</h2>
          <p className="text-gray-500">{dict.description}</p>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => router.push(`/${defaultLang}`)}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
        >
          <Home className="w-4 h-4" />
          {dict.backToHome}
        </Button>
      </div>
    </div>
  );
}
