"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function SobreMi() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <motion.section
      ref={ref}
      id="sobre-la-maestra"
      className="max-w-4xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10 text-rose-900 bg-rose-50 rounded-2xl shadow-lg"
      variants={fadeInRight}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
    >
      <div className="flex-shrink-0 w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-rose-300 shadow-md">
        <Image
          src="/imagen-contacto.jpeg"
          alt="Foto de la maestra"
          width={240}
          height={240}
          className="object-cover"
          priority
        />
      </div>
      <div>
        <h2 className="text-4xl font-bold mb-4 text-rose-500">
          Sobre la Maestra
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Con más de 10 años de experiencia, nuestra maestra prepara a los niños
          para múltiples certificados de Cambridge y TOEFL, con muchos casos de
          éxito comprobados.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Las clases son dinámicas y con un enfoque moderno que mezcla lo que
          funciona tradicionalmente con técnicas innovadoras, asegurando un
          aprendizaje efectivo y entretenido.
        </p>
        <p className="text-lg leading-relaxed">
          Gracias a este balance, los alumnos desarrollan confianza y
          habilidades sólidas para comunicarse en inglés en cualquier contexto.
        </p>
      </div>
    </motion.section>
  );
}

export default SobreMi;
