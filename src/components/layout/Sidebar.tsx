"use client";

import { Protect, useClerk, useUser } from "@clerk/nextjs";
import {
  FileText,
  Hash,
  Home,
  Image as ImageIcon,
  LogOut,
  SquarePen,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/types/dictionary";

interface SidebarProps {
  sidebar?: boolean;
  setSidebar?: (value: boolean) => void;
  dict: Dictionary;
  lang: string;
}

export default function Sidebar({
  sidebar,
  setSidebar,
  dict,
  lang,
}: SidebarProps) {
  const navItems = [
    { to: `/${lang}/ai`, label: dict.nav.dashboard, Icon: Home },
    {
      to: `/${lang}/ai/write-article`,
      label: dict.nav.writeArticle,
      Icon: SquarePen,
    },
    { to: `/${lang}/ai/blog-titles`, label: dict.nav.blogTitles, Icon: Hash },
    {
      to: `/${lang}/ai/generate-images`,
      label: dict.nav.generateImages,
      Icon: ImageIcon,
    },
    {
      to: `/${lang}/ai/review-resume`,
      label: dict.nav.reviewResume,
      Icon: FileText,
    },
    { to: `/${lang}/ai/community`, label: dict.nav.community, Icon: Users },
  ];
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const pathname = usePathname();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out z-10`}
    >
      <div className="my-7 w-full">
        {user?.imageUrl && (
          <Image
            src={user.imageUrl}
            alt="User avatar"
            className="w-13 rounded-full mx-auto"
            width={52}
            height={52}
          />
        )}
        <h1 className="mt-1 text-center">{user?.fullName}</h1>

        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {navItems.map(({ to, label, Icon }) => {
            const isActive = pathname.endsWith(to);
            return (
              <Link
                key={to}
                href={to}
                onClick={() => setSidebar?.(false)}
                className={`px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white" : ""}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <button
          type="button"
          onClick={() => openUserProfile()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src={user?.imageUrl || ""}
            alt="User avatar"
            className="w-8 rounded-full"
            width={32}
            height={32}
          />
          <div>
            <h1 className="text-sm font-medium">{user?.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{" "}
              {dict.nav.plan}
            </p>
          </div>
        </button>
        <LogOut
          onClick={() => signOut()}
          className="w-4.5 text-gray-400
          hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
}
