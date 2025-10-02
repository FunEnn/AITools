'use client';

import { assets } from "@/assets/assets";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const router = useRouter();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed flex z-5 w-full backdrop-blur-2xl justify-between items-center px-4 py-3
    sm:px-20 xl:px-32">
      <Image
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => router.push('/')}
      />
      {
        user ? <UserButton /> :
          (
            <button type="button" onClick={() => openSignIn()} className="flex items-center gap-2 rounded-full text-sm cursor-pointer 
          bg-primary text-white px-10 py-2.5">
              get started
              <ArrowRight className="w-4 h-4" />
            </button>
          )
      }


    </div>
  );
}