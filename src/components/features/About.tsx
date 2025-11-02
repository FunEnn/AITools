"use client";

import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";

import type { Dictionary } from "@/types/dictionary";

export default function About({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const router = useRouter();

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen pt-32 pb-24"
      style={{ backgroundImage: `url(${assets.gradientBackground.src})` }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2] mb-6">
            {dict.about.title} <br />
            <span className="text-primary">{dict.about.subtitle}</span>
          </h1>
          <p className="mt-6 max-w-2xl m-auto text-gray-500 text-base sm:text-lg leading-relaxed">
            {dict.about.description}
          </p>
        </div>

        <div className="space-y-8 mt-20">
          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-4">
              {dict.about.mission.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {dict.about.mission.content}
            </p>
          </div>

          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-4">
              {dict.about.vision.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {dict.about.vision.content}
            </p>
          </div>

          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-8">
              {dict.about.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dict.about.features.items.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 backdrop-blur-sm rounded-lg border border-white/10 hover:-translate-y-1 hover:border-white/20 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-4">
              {dict.about.technology.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-lg">
              {dict.about.technology.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {dict.about.technology.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors backdrop-blur-sm border border-primary/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-4">
              {dict.about.team.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {dict.about.team.content}
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 backdrop-blur-sm rounded-lg p-10 sm:p-12 shadow-lg border border-primary/30 text-center">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-4">
              {dict.about.cta.title}
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto text-base sm:text-lg">
              {dict.about.cta.description}
            </p>
            <button
              type="button"
              onClick={() => router.push(`/${lang}/ai`)}
              className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer text-base sm:text-lg font-medium shadow-md hover:shadow-lg"
            >
              {dict.about.cta.button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
