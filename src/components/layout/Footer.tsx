"use client";

import { useRouter } from "next/navigation";
import type { Dictionary } from "@/types/dictionary";

export default function Footer({ dict }: { dict: Dictionary }) {
  const router = useRouter();
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 sm:px-20 xl:px-32 py-12 border-t mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 产品 */}
          <div>
            <h3 className="font-semibold mb-4">{dict.nav.tools}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => router.push("/ai/blog-titles")}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {dict.tools.blogTitles.name}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push("/ai/generate-images")}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {dict.tools.imageGeneration.name}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push("/ai/write-article")}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {dict.tools.articleWriter.name}
                </button>
              </li>
            </ul>
          </div>

          {/* 社区 */}
          <div>
            <h3 className="font-semibold mb-4">{dict.nav.community}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => router.push("/ai/community")}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {dict.community.title}
                </button>
              </li>
            </ul>
          </div>

          {/* 定价 */}
          <div>
            <h3 className="font-semibold mb-4">{dict.nav.pricing}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => router.push("/pricing")}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {dict.pricing.free.name}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push("/pricing")}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {dict.pricing.pro.name}
                </button>
              </li>
            </ul>
          </div>

          {/* 账户 */}
          <div>
            <h3 className="font-semibold mb-4">{dict.nav.login}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {dict.nav.login}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {dict.nav.signup}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm pt-8 border-t">
          © {year} AI Tools Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
