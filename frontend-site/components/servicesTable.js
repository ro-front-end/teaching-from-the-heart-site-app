"use client";

import { useState } from "react";
import {
  FaBookOpen,
  FaPlane,
  FaUserFriends,
  FaUserGraduate,
} from "react-icons/fa";

function ServicesTable() {
  const [index, setIndex] = useState(0);

  const tableContent = [
    {
      id: 1,
      title: "Preparación para certificaciones internacionales",
      icon: <FaUserGraduate />,
      content:
        "Clases diseñadas para aprobar certificaciones como TOEFL y Cambridge (KET, PET, YLE), con estrategias, simulacros y retroalimentación personalizada.",
    },
    {
      id: 2,
      title: "Inglés conversacional moderno",
      icon: <FaUserFriends />,
      content:
        "Sesiones dinámicas centradas en la comunicación real. Mejora tu fluidez, pronunciación y confianza con actividades prácticas y actuales.",
    },
    {
      id: 3,
      title: "Asistencia para tareas y proyectos",
      icon: <FaBookOpen />,
      content:
        "Apoyo paso a paso con tareas escolares, trabajos creativos y presentaciones. El objetivo es que no solo completes tus proyectos, sino que entiendas lo que estás haciendo y aprendas en el proceso, de forma clara y divertida.",
    },
    {
      id: 4,
      title: "Inglés con enfoque práctico",
      icon: <FaPlane />,
      content:
        "Aprende lo que realmente necesitas para tu vida, viajes o vida cotidiana. Clases flexibles con contenidos útiles y aplicables desde el primer día.",
    },
  ];

  return (
    <section id="servicios" className="max-w-4xl mx-auto ">
      <h2 className="text-3xl font-bold text-center mb-10 text-rose-400">
        Servicios
      </h2>

      <div className="grid grid-cols-4 bg-emerald-100 rounded-t-2xl overflow-hidden ">
        {tableContent.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setIndex(i)}
            type="button"
            className={`text-sm sm:text-base p-4 font-semibold transition-colors duration-300 flex justify-center items-center  ${
              index === i
                ? "bg-rose-400 text-center border-[.16rem] border-rose-500 rounded-t-2xl text-rose-900"
                : "hover:bg-rose-200 text-emerald-700"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 sm:p-10 shadow-lg rounded-b-2xl border-t border-emerald-200">
        <h3 className="text-2xl font-bold mb-4 text-rose-500">
          {tableContent[index].title}
        </h3>
        <p className="text-lg text-gray-700">{tableContent[index].content}</p>
      </div>
    </section>
  );
}

export default ServicesTable;
