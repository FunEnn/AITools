"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/assets/assets";
import type { Dictionary } from "@/types/dictionary";

export default function Testimonial({ dict }: { dict: Dictionary }) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 观察标题
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              setIsTitleVisible(true);
            });
            titleObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "50px 0px 0px 0px",
      },
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    // 观察卡片
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              requestAnimationFrame(() => {
                setVisibleCards((prev) => new Set([...prev, index]));
              });
              observer.unobserve(card);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: "50px 0px 0px 0px",
        },
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      if (titleRef.current) {
        titleObserver.unobserve(titleRef.current);
      }
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24">
      <div
        ref={titleRef}
        className={`text-center ${
          isTitleVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: isTitleVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <h2 className="text-slate-700 text-[42px] font-semibold">
          {dict.testimonials.title}
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          {dict.testimonials.description}
        </p>
      </div>
      <div className="flex flex-wrap mt-10 justify-center">
        {dict.testimonials.data.map((testimonial, index) => (
          <div
            key={testimonial.name}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 cursor-pointer ${
              visibleCards.has(index) ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: visibleCards.has(index)
                ? "translateY(0)"
                : "translateY(30px)",
              transition: visibleCards.has(index)
                ? `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
                : "opacity 0s, transform 0s",
            }}
          >
            <div className="flex items-center gap-1">
              <span className="sr-only">{`Rating: ${testimonial.rating} out of 5`}</span>
              {["1", "2", "3", "4", "5"].map((id, i) => (
                <Image
                  key={`${testimonial.name}-star-${id}`}
                  src={
                    i < testimonial.rating
                      ? assets.star_icon
                      : assets.star_dull_icon
                  }
                  alt="star"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              ))}
            </div>
            <p className="text-gray-500 text-sm my-5">
              "{testimonial.content}"
            </p>
            <hr className="mb-5 border-gray-300" />
            <div className="flex items-center gap-4">
              <Image
                src={testimonial.image}
                className="w-12 h-12 object-cover rounded-full"
                alt={`${testimonial.name} avatar`}
                width={48}
                height={48}
                unoptimized
              />
              <div className="text-sm text-gray-600">
                <h3 className="font-medium">{testimonial.name}</h3>
                <p className="text-xs text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
