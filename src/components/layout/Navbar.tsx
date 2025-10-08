"use client";

import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";

export default function Navbar() {
  const router = useRouter();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div
      className="fixed flex z-50 w-full backdrop-blur-2xl justify-between items-center px-4 py-3
    sm:px-20 xl:px-32"
    >
      <button
        className="w-24 sm:w-32 cursor-pointer bg-transparent border-none p-0"
        onClick={() => router.push("/")}
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
          get started
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
