export default function WhatsAppButton({
  withMargin = false,
  withMarginTop = false,
  size = "responsive",
  children,
}) {
  const cellNum = "5535088355";
  const message = "Hola, me interesan las clases y quisiera más información.";

  return (
    <div className="flex justify-center">
      <a
        className={` hover:bg-emerald-500 transition duration-300 ease-in-out bg-emerald-400 text-rose-50 font-semibold p-4 rounded-2xl w-[60%] `}
        href={`https://wa.me/${cellNum}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </div>
  );
}
