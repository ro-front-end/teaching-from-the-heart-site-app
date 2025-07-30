"use client";

import { getTestimonios } from "@/utils/testimonios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TestimoniosItem() {
  const [curTestimonio, setCurTestimonio] = useState(0);

  const testimonios = getTestimonios();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurTestimonio((curIndex) =>
        curIndex < testimonios.length - 1 ? curIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonios.length]);

  return (
    <div className="relative flex justify-center max-w-4xl mx-auto items-center w-full border-2 border-emerald-300/40 rounded-2xl p-4">
      <ul className="relative w-[95%] lg:w-[90rem] h-[16rem] sm:h-[10rem] md:h-[12rem] xl:h-[18rem] rounded-xl bg-white shadow-md dark:bg-gray-800 p-6 overflow-hidden">
        {testimonios.map((testimonio, index) => (
          <li
            key={testimonio.id}
            className={`absolute inset-0 grid sm:grid sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:flex-row items-center p-4 md:p-8 justify-center gap-4 sm:gap-8 transition-opacity duration-1000 ${
              index === curTestimonio ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            <Image
              className="rounded-full justify-self-center sm:col-span-1 md:col-span-1 shadow-lg"
              alt={testimonio.alt}
              src={testimonio.imagen}
              width={80}
              height={80}
              quality={30}
            />
            <p className="px-2 sm:px-0 sm:col-span-4 md:col-span-2 lg:col-span-3 xl:col-span-4 text-center sm:text-start xl:text-2xl text-gray-800 dark:text-gray-200  font-semibold">
              &quot;{testimonio.testimonio}&quot;
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
