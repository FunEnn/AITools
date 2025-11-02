"use client";

import { Github, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";
import type { Dictionary } from "@/types/dictionary";

const socialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  github: Github,
  mail: Mail,
};

export default function Footer({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const router = useRouter();
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full mt-20 border-t border-gray-500/10">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/10 pb-8">
        <div className="md:max-w-96">
          <Image
            className="w-24 sm:w-32"
            src={assets.logo}
            alt="logo"
            width={157}
            height={40}
          />
          <p className="mt-6 text-sm opacity-60">
            {dict.nav.footerDescription}
          </p>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row items-start justify-end gap-10 md:gap-20">
          <div>
            <h2 className="font-semibold mb-5">{dict.nav.quickLinks}</h2>
            <ul className="text-sm space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => router.push(`/${lang}`)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  {dict.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push(`/${lang}/ai`)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  {dict.nav.tools}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push(`/${lang}/about`)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  {dict.nav.aboutUs}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push(`/${lang}/privacy`)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  {dict.nav.privacyPolicy}
                </button>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[280px]">
            <h2 className="font-semibold mb-5">{dict.nav.contactUs}</h2>
            <div className="text-sm space-y-3">
              <p className="opacity-60">{dict.nav.contactDescription}</p>
              <div className="flex items-center gap-4 pt-2">
                {dict.nav.socialLinks.map((link, index) => {
                  const IconComponent =
                    socialIcons[link.icon] || socialIcons.github;
                  return (
                    <a //github.com/FunEnn/AITools
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity"
                      aria-label={link.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${dict.nav.email}`}
                  className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {dict.nav.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-sm opacity-60">
        Copyright © {year} AI-tools. All Rights Reserved.
      </p>
    </footer>
  );
}
