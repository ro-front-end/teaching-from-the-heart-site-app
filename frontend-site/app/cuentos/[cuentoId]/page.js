"use client";

import { useGetStoriesQuery } from "@/services/storiesApi";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

function CuentoIdPage() {
  const { cuentoId } = useParams();
  console.log(cuentoId);

  const { data: cuentos, isLoading, error } = useGetStoriesQuery();

  if (isLoading)
    return (
      <p className="text-center flex justify-center items-center">
        Cargando...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-900 flex justify-center items-center">
        Error al cargar el cuento.
      </p>
    );

  const cuento = cuentos?.find((c) => c.id === cuentoId);
  if (!cuento) return <p className="text-center">Cuento no encontrado.</p>;

  return (
    <div className="relative w-full min-h-screen overflow-hidden mt-16">
      <div className="absolute inset-0 -z-10">
        <Image
          src={cuento.imageOne}
          alt={cuento.title}
          fill
          className="object-cover blur-md brightness-75"
          priority
        />
      </div>

      <div className="relative p-4 sm:p-8 z-10">
        <Link
          href="/cuentos"
          className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-500 transition duration-300 ease-in-out mb-6"
        >
          <FaArrowLeft />
          <span>Volver</span>
        </Link>

        <div className="max-w-2xl mx-auto text-white">
          <h2 className="text-center text-3xl sm:text-4xl font-bold mb-8 drop-shadow-lg">
            {cuento.title}
          </h2>

          <div className="bg-white bg-opacity-90 flex flex-col gap-8 text-gray-800 rounded-xl shadow-lg p-6 mb-8">
            {cuento.imageTwo && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden">
                <Image
                  src={cuento.imageTwo}
                  alt={`${cuento.title} - Imagen 2`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="leading-relaxed mb-4">{cuento.contentOne}</p>

            {cuento.imageThree && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden">
                <Image
                  src={cuento.imageThree}
                  alt={`${cuento.title} - Imagen 3`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {cuento.contentTwo && (
              <p className="leading-relaxed">{cuento.contentTwo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CuentoIdPage;
