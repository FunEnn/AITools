"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getAiToolsData } from "@/assets/assets";
import type { Lang } from "@/i18n";
import type { Dictionary } from "@/types/dictionary";

export default function AiTools({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Lang;
}) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (card) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // 使用 requestAnimationFrame 确保在下一帧触发，避免闪烁
                requestAnimationFrame(() => {
                  setVisibleCards((prev) => new Set([...prev, index]));
                });
                observer.unobserve(card);
              }
            });
          },
          {
            threshold: 0.05,
            rootMargin: "50px 0px 0px 0px",
          },
        );

        observer.observe(card);
        observers.push(observer);
      }
    });

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          {dict.nav.tools}
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          {dict.tools.blogTitles.description}
        </p>
      </div>

      <div className="flex flex-wrap mt-10 justify-center">
        {getAiToolsData(dict, lang).map((tool, index) => (
          <button
            key={tool.path}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            type="button"
            className={`p-8 m-4 max-w-xs text-left rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 cursor-pointer ${
              visibleCards.has(index) ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: visibleCards.has(index)
                ? "translateY(0)"
                : "translateY(30px)",
              transition: visibleCards.has(index)
                ? `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
                : "opacity 0s, transform 0s",
            }}
            onClick={() => isSignedIn && router.push(tool.path)}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
            <p className="text-gray-400 text-sm max-w-[95%]">
              {tool.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
