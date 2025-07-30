"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const scaleUp = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

function CuentosInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id="cuentos"
      className="w-full min-h-[50vh] mx-auto px-6 py-16  rounded-2xl  text-center relative text-rose-50 flex items-center justify-center"
      variants={scaleUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Image
        className="absolute object-cover blur-md z-0 rounded-2xl max-w-4xl mx-auto"
        src="/imagen-cuento-2.png"
        fill
        alt="Image of a short story for kids"
      />
      <div className="bg-black/30 inset-0 z-10 absolute max-w-4xl mx-auto rounded-2xl" />
      <div className="z-10 flex flex-col max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 z-10">Cuentos y Blogs</h2>
        <p className="text-lg mb-8 z-10">
          Explora cuentos diseñados para ayudar a los niños a practicar inglés
          de forma divertida y educativa.
        </p>
        <Link
          href="/cuentos"
          className="inline-block bg-rose-400 text-emerald-50 font-semibold rounded-2xl py-3 px-8 hover:bg-rose-500 transition z-10"
        >
          Lee nuestros cuentos!
        </Link>
      </div>
    </motion.section>
  );
}

export default CuentosInfo;
