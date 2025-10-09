"use client";

import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";

import type { Dictionary } from "@/types/dictionary";

export default function Hero({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const router = useRouter();

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${assets.gradientBackground.src})` }}
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          {dict.hero.title} <br />
          <span className="text-primary">{dict.hero.subtitle}</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          {dict.hero.description}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          type="button"
          onClick={() => router.push(`/${lang}/ai`)}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          {dict.hero.getStarted}
        </button>
        <button
          type="button"
          className="bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          {dict.hero.learnMore}
        </button>
      </div>
    </div>
  );
}
