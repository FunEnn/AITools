"use client";

import Image from "next/image";
import { assets, dummyTestimonialData } from "@/assets/assets";

export default function Testimonial() {
  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Loved by Creators
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>
      <div className="flex flex-wrap mt-10 justify-center">
        {dummyTestimonialData.map((testimonial) => (
          <div
            key={testimonial.name}
            className="p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer"
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
