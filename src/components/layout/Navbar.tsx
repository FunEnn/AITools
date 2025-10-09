"use client";

import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { assets } from "@/assets/assets";
import type { Lang } from "@/i18n";
import { langs } from "@/i18n";

import type { Dictionary } from "@/types/dictionary";

export default function Navbar({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Dictionary;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleLanguageChange = (newLang: Lang) => {
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
    setIsLangOpen(false);
  };

  return (
    <div
      className="fixed flex z-50 w-full backdrop-blur-2xl justify-between items-center px-4 py-3
    sm:px-20 xl:px-32"
    >
      <div className="flex items-center gap-8">
        <button
          className="w-24 sm:w-32 cursor-pointer bg-transparent border-none p-0"
          onClick={() => router.push(`/${lang}`)}
          type="button"
        >
          <Image
            src={assets.logo}
            alt="logo"
            className="w-full h-auto"
            width={128}
            height={40}
            priority
          />
        </button>
        <nav className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={() => router.push(`/${lang}`)}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            {dict.nav.home}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/${lang}/ai`)}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            {dict.nav.tools}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/${lang}/ai/community`)}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            {dict.nav.community}
          </button>
        </nav>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border rounded-md hover:bg-gray-50 transition-colors"
          >
            <span className="uppercase">{lang}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isLangOpen && (
            <ul className="absolute top-full mt-1 w-24 bg-white border border-gray-200 rounded-md shadow-lg py-1">
              {langs.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={`w-full text-left px-3 py-1.5 text-sm cursor-pointer uppercase ${
                    l === lang
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                  onClick={() => handleLanguageChange(l)}
                >
                  {l}
                </button>
              ))}
            </ul>
          )}
        </div>
      </div>
      {user ? (
        <div className="cursor-pointer">
          <UserButton />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => openSignIn()}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer 
          bg-primary text-white px-10 py-2.5 hover:bg-primary/90 transition-colors"
        >
          {dict.nav.signup}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
