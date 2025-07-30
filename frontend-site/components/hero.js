import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <header
      id="hero"
      className="flex justify-center items-center relative w-full mx-auto min-h-screen"
    >
      <Image
        className="object-cover blur-md absolute z-0 opacity-85 inset-0"
        src="/image-acerca-dos.jpeg"
        alt="Image of a classroom"
        fill
      />
      <div className="inset-0 bg-black/35 blur-md z-0 absolute" />
      <div className="flex flex-col md:gap-8 justify-center items-center h-[80vh] sm:h-screen md:h-[80vh] z-10">
        <Image
          className="z-10 rounded-full border-3 border-rose-100 w-48 h-48 sm:w-40 sm:h-40 md:w-96 md:h-96"
          src="/image-acerca-tres.jpeg"
          alt="Image of a classroom"
          width={300}
          height={300}
        />
        <h2 className="z-10 text-center text-rose-400 text-3xl md:text-6xl uppercase font-extrabold  p-4 rounded-2xl">
          Teaching from the heart
        </h2>
        <h1 className="text-lg md:text-2xl text-center text-rose-50 z-10 font-semibold">
          Inglés como Segundo Idioma para Niños
        </h1>
        <div className="flex items-center justify-center gap-10 mt-8 w-full mx-auto ">
          <Link
            className="bg-emerald-500 rounded-2xl font-semibold transition duration-300 ease-in-out hover:bg-emerald-400 cursor-pointer text-emerald-50 z-10 p-4 text-sm md:text-lg"
            href="/#acerca"
          >
            Acerca
          </Link>
          <Link
            className="bg-rose-500 rounded-2xl font-semibold transition duration-300 ease-in-out hover:bg-rose-600 cursor-pointer text-rose-50 z-10 p-4 text-sm md:text-lg"
            href="/#contacto"
          >
            Contacto
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Hero;
