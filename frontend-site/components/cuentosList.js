"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import { useGetStoriesQuery } from "@/services/storiesApi";

function CuentosList() {
  const { data: cuentos = [], isLoading, error } = useGetStoriesQuery();

  if (isLoading)
    return (
      <p className="text-center text-gray-500 text-lg py-10">
        🌟 Cargando cuentos...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-lg py-10">
        ❌ No se pudieron cargar los cuentos. Intenta más tarde.
      </p>
    );

  return (
    <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-20 px-4">
      {cuentos.length === 0 ? (
        <li className="col-span-full text-center text-gray-500 py-8">
          No hay cuentos disponibles por el momento.
        </li>
      ) : (
        cuentos.map((cuento) => (
          <div
            key={cuento.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col group"
          >
            <div className="relative h-52 w-full">
              <Image
                src={cuento.imageOne}
                alt={cuento.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold line-clamp-2 drop-shadow-md">
                {cuento.title}
              </h3>

              {cuento.category && (
                <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                  {cuento.category}
                </span>
              )}
            </div>

            <div className="flex flex-col flex-grow p-5">
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5 flex-grow">
                {cuento.excerpt ||
                  "Haz clic abajo para leer el cuento completo."}
              </p>

              <Link
                href={`/cuentos/${cuento.id}`}
                aria-label={`Leer más sobre ${cuento.title}`}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-emerald-300"
              >
                Leer cuento
                <span aria-hidden="true" className="text-sm">
                  →
                </span>
              </Link>
            </div>
          </div>
        ))
      )}
    </ul>
  );
}

export default CuentosList;
