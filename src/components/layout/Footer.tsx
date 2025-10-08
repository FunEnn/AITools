import Image from "next/image";
import { assets } from "@/assets/assets";

export default function Footer() {
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
            AI-tools is a powerful platform offering a suite of AI-powered tools
            for content creation, image processing, and resume optimization.
            Enhance your productivity and unleash creativity with our
            intelligent solutions.
          </p>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row items-start justify-end gap-10 md:gap-20">
          <div>
            <h2 className="font-semibold mb-5">Quick Links</h2>
            <ul className="text-sm space-y-3">
              <li>
                <a
                  href="/"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/ai"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  AI Tools
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[280px]">
            <h2 className="font-semibold mb-5">Newsletter</h2>
            <div className="text-sm space-y-2">
              <p className="opacity-60">
                Stay updated with our latest AI tools, tips, and exclusive
                offers.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="bg-transparent border border-gray-500/20 placeholder-gray-500 focus:ring-2 ring-[--color-primary] outline-none w-full h-10 rounded-lg px-3"
                  type="email"
                  placeholder="Enter your email"
                />
                <button
                  type="button"
                  className="bg-[--color-primary] hover:opacity-90 transition-opacity min-w-24 h-10 text-white rounded-lg cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-sm opacity-60">
        Copyright © 2025 AI-tools. All Rights Reserved.
      </p>
    </footer>
  );
}
