import mujerUno from "@/public/mujer-1.jpg";
import mujerDos from "@/public/mujer-2.jpg";
import hombreUno from "@/public/hombre-1.jpg";
import hombreDos from "@/public/hombre-2.png";

export function getTestimonios() {
  return [
    {
      id: 1,
      imagen: mujerUno,
      alt: "Imagen de una mujer sonriente que da un testimonio positivo sobre el servicio",
      testimonio:
        "Excelente maestra, mis hijos la adoran y hemos estado con ella durante muchos años.",
    },
    {
      id: 2,
      imagen: hombreUno,
      alt: "Imagen de un hombre satisfecho dando un testimonio sobre el servicio",
      testimonio:
        "La mejor elección que pudimos haber hecho, mis hijos se divierten y sí aprenden.",
    },
    {
      id: 3,
      imagen: mujerDos,
      alt: "Imagen de una mujer joven que valora el servicio recibido",
      testimonio:
        "Gran experiencia, el aprendizaje es efectivo y siempre con un trato muy agradable.",
    },
    {
      id: 4,
      imagen: hombreDos,
      alt: "Imagen de un hombre expresando su gratitud hacia el servicio",
      testimonio:
        "La maestra es muy dedicada, atenta y profesional. Recomiendo las clases al 100%.",
    },
  ];
}
