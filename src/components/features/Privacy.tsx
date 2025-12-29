"use client";

import { Mail } from "lucide-react";
import { assets } from "@/assets/assets";
import type { Dictionary } from "@/types/dictionary";

export default function Privacy({ dict }: { dict: Dictionary }) {
  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen pt-32 pb-24"
      style={{ backgroundImage: `url(${assets.gradientBackground.src})` }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2] mb-6">
            {dict.privacy.title} <br />
            <span className="text-primary">{dict.privacy.subtitle}</span>
          </h1>
          <p className="mt-4 text-gray-500 text-sm sm:text-base">
            {dict.privacy.lastUpdated}
          </p>
        </div>

        <div className="space-y-8 mt-12">
          {/* Introduction */}
          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-4">
              {dict.privacy.introduction.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {dict.privacy.introduction.content}
            </p>
          </div>

          {/* Data Collection */}
          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-6">
              {dict.privacy.dataCollection.title}
            </h2>
            <div className="space-y-6">
              {dict.privacy.dataCollection.items.map((item) => (
                <div
                  key={item.title}
                  className="p-6 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Use */}
          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-6">
              {dict.privacy.dataUse.title}
            </h2>
            <div className="space-y-6">
              {dict.privacy.dataUse.items.map((item) => (
                <div
                  key={item.title}
                  className="p-6 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sharing */}
          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-4">
              {dict.privacy.dataSharing.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-base sm:text-lg">
              {dict.privacy.dataSharing.content}
            </p>
            <div className="space-y-6">
              {dict.privacy.dataSharing.items.map((item) => (
                <div
                  key={item.title}
                  className="p-6 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="backdrop-blur-sm rounded-lg p-8 sm:p-10 shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300">
            <h2 className="text-slate-700 text-2xl sm:text-3xl font-semibold mb-4">
              {dict.privacy.contact.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-base sm:text-lg">
              {dict.privacy.contact.content}
            </p>
            <a
              href={`mailto:${dict.privacy.contact.email}`}
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-semibold"
            >
              <Mail className="w-5 h-5" />
              {dict.privacy.contact.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
