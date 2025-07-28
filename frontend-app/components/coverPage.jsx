import { Link } from "react-router-dom";

function CoverPage() {
  return (
    <main
      id="hero"
      className="relative min-h-screen w-full flex justify-center items-center overflow-hidden"
    >
      <img
        className="blur-md absolute min-h-screen inset-0 z-0 object-cover w-full p-6"
        src="/cover-app.jpeg"
        alt="Blurred classroom backgorund"
      />

      <div className="flex flex-col items-center justify-center text-center gap-8 p-12 sm:p-12">
        <img
          className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-cover border-4 border-white shadow-lg z-10 rounded-full"
          src="/image-acerca-uno.jpeg"
          alt="Teacher profile picture"
        />
        <h2 className="z-10 text-2xl sm:text-5xl text-rose-100 uppercase bg-rose-400 p-4 rounded-xl font-semibold">
          Teaching From the heart
        </h2>
        <h1 className="z-10 text-xl sm:text-3xl text-rose-50 rounded-xl">
          Create, edit and more...
        </h1>
        <div className="z-10 flex gap-8">
          <Link
            className="bg-rose-500 p-4 px-6 rounded-xl w-full mx-auto text-rose-50 font-semibold hover:bg-rose-600 transition duration-300 ease-in-out"
            to="/dashboard"
          >
            Start!
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CoverPage;
