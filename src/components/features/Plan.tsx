"use client";

import { PricingTable } from "@clerk/clerk-react";
import type { Dictionary } from "@/types/dictionary";

export default function Plan({ dict }: { dict: Dictionary }) {
  return (
    <div className="max-w-2xl mx-auto z-20 my-30">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          {dict.nav.pricing}
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          {dict.pricing.free.description}
        </p>
      </div>

      <div className="mt-14 max-sm:mx-8">
        <PricingTable />
      </div>
    </div>
  );
}
