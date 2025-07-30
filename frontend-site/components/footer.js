import { FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer className="flex flex-col justify-between items-center">
      <div>&copy;Teaching from the Heart 2025</div>
      <div className="flex w-full mx-auto flex-col items-center gap-4 opacity-80 text-sm">
        <p>Soluciones web:</p>
        <a
          className=" cursor-pointer"
          target="_blnak"
          href="https://portfolio-front-end-rodrigo.vercel.app"
        >
          <FaGlobe className="text-xl text-rose-900 hover:text-emerald-400" />
        </a>
        <p>Rodrigo Arellano Full Stack Web Developer</p>
      </div>
    </footer>
  );
}

export default Footer;
