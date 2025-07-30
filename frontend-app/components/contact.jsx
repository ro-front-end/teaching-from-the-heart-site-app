import imagen from "/imagen-contacto.jpeg";

export default function ContactPage() {
  return (
    <div
      id="contact"
      className="px-4 flex flex-col gap-8 items-center  text-center md:gap-12 lg:gap-16 xl:gap-8"
    >
      <h1
        className="font-semibold bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent drop-shadow-xl text-4xl uppercase 
        md:text-5xl lg:text-6xl xl:text-7xl"
      >
        Comienza Hoy
      </h1>

      <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold">
        Inspirando en cada clase
      </h2>

      <section className="mt-4 w-full max-w-4xl min-h-screen">
        <p className="text-base md:text-lg lg:text-xl px-4 md:px-10 xl:px-20">
          Soy <span className="italic font-semibold">Atala Ortiz</span>, maestra
          con más de 10 años de experiencia en educación. Mi enfoque está en
          ofrecer clases dinámicas, personalizadas y divertidas que fomenten la
          creatividad y faciliten la{" "}
          <span className="font-semibold">
            comprensión del inglés como segundo idioma
          </span>
          .
        </p>

        <div className="relative w-full h-[18rem] sm:h-[22rem] lg:h-[40rem] mt-8 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={imagen}
            alt="Atala Ortiz, maestra de inglés"
            className="object-cover rounded-3xl absolute"
          />
        </div>

        <p className="text-base md:text-lg lg:text-xl px-4 md:px-10 xl:px-20 mt-8">
          Con métodos de enseñanza innovadores, ayudo a los niños a desarrollar
          su confianza y habilidades mientras{" "}
          <span className="font-semibold">
            aprenden inglés de forma natural y efectiva.
          </span>
        </p>
        <div className="mt-12">
          <a
            className="bg-emerald-400 border-[.1rem]  p-4  rounded-xl text-rose-50 font-semibold w-full mx-auto hover:bg-emerald-500 transition duration-300 ease-in-out"
            href="https://teachingfromtheheart.vercel.app"
            target="_blank"
          >
            visita mi sitio web
          </a>
        </div>
      </section>
    </div>
  );
}
