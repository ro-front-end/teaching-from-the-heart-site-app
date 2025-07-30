"use client";

import Image from "next/image";
import imageAcerca1 from "@/public/image-acerca-uno.jpeg";
import imageAcerca3 from "@/public/image-acerca-tres.jpeg";
import imageAcerca4 from "@/public/image-four.jpeg";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Variantes de animación
const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const fadeInOpacity = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Acerca() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main
      ref={ref}
      id="acerca"
      className="flex flex-col gap-16 md:gap-32  max-w-full lg:max-w-4xl m-auto text-emerald-950"
    >
      {/* SECCIÓN 1 - Desde izquierda */}
      <motion.section
        variants={fadeInLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        className="flex flex-col gap-6"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">
          Aprende con el Cerebro y el Corazón
        </h2>
        <div className="bg-white p-4 sm:p-8 flex flex-col gap-6 rounded-2xl">
          <article className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={imageAcerca1}
              alt="Niña estudiante aprendiendo inglés con enfoque en neuroeducación"
              fill
              className="rounded-2xl object-cover"
              quality={40}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </article>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            En <strong>Teaching from the Heart</strong>, creemos que aprender
            inglés debería ser emocionante y lleno de significado para cada
            niño.{" "}
            <Link href="/#stories" className="text-emerald-600 underline">
              Aprende más sobre nuestro enfoque.
            </Link>
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Nos basamos en la <strong>neuroeducación</strong>, que combina cómo
            funciona el cerebro con técnicas educativas para crear clases donde
            los niños realmente disfrutan y se sienten conectados.
          </p>
        </div>
      </motion.section>

      {/* SECCIÓN 2 (CITA) - Solo opacidad */}
      <motion.section
        variants={fadeInOpacity}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="flex flex-col gap-6"
      >
        <div className="bg-white p-6 sm:p-8 rounded-2xl">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center leading-relaxed">
            &quot;La creatividad es la inteligencia divirtiéndose.&quot;
            <br />
            <span className="italic text-emerald-600 text-lg md:text-xl lg:text-2xl">
              Albert Einstein
            </span>
          </p>
        </div>
      </motion.section>

      {/* SECCIÓN 3 - Solo opacidad */}
      <motion.section
        variants={fadeInOpacity}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="flex flex-col gap-6"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">
          Emoción al Aprender
        </h2>
        <div className="bg-white p-4 sm:p-8  flex flex-col gap-6 rounded-2xl">
          <article className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={imageAcerca3}
              alt="Niña disfrutando de dinámica educativa en clase de inglés"
              fill
              className="rounded-2xl object-cover"
              quality={40}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </article>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Usamos dinámicas divertidas y actividades interactivas que hacen que
            aprender inglés sea algo natural y lleno de energía.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Aquí, el aprendizaje no se trata solo de memorizar palabras, sino
            también de desarrollar habilidades y confianza a su propio ritmo.
          </p>
        </div>
      </motion.section>

      {/* SECCIÓN 4 - Puedes dejar sin animación o con la que prefieras */}
      <motion.section
        variants={fadeInOpacity}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
        className="flex flex-col gap-6"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">
          Aprendizaje Integral
        </h2>
        <div className="bg-white p-4 sm:p-8  flex flex-col gap-6 rounded-2xl">
          <article className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={imageAcerca4}
              alt="Niña en actividad educativa interactiva, aprendiendo inglés"
              fill
              className="rounded-2xl object-cover"
              quality={40}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </article>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Nuestro objetivo es que cada niño sienta que aprender inglés es una
            aventura en la que puede crecer, descubrir sus talentos y sentirse
            seguro.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            En <strong>Teaching from the Heart</strong>, enseñamos desde el
            corazón porque creemos en el potencial de cada uno y estamos aquí
            para acompañarlos en cada paso de su camino.{" "}
            <Link href="/#contact" className="text-emerald-600 underline">
              Contáctanos para más información.
            </Link>
          </p>
        </div>
      </motion.section>
    </main>
  );
}
