"use client";

import { PricingTable } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/types/dictionary";

export default function Plan({ dict }: { dict: Dictionary }) {
  const [isVisible, setIsVisible] = useState(false);
  const planRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "50px 0px 0px 0px",
      },
    );

    if (planRef.current) {
      observer.observe(planRef.current);
    }

    return () => {
      if (planRef.current) {
        observer.unobserve(planRef.current);
      }
    };
  }, []);

  return (
    <div ref={planRef} className="max-w-2xl mx-auto z-20 my-30">
      <div
        className={`text-center ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <h2 className="text-slate-700 text-[42px] font-semibold">
          {dict.nav.pricing}
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          {dict.pricing.free.description}
        </p>
      </div>

      <div
        className={`mt-14 max-sm:mx-8 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition:
            "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
        }}
      >
        <PricingTable />
      </div>
    </div>
  );
}
