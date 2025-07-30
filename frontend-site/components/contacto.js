import WhatsAppButton from "@/utils/whatsAppButton";
import Link from "next/link";

function Contacto() {
  return (
    <section
      id="contacto"
      className="px-4 py-16 bg-emerald-50 text-rose-900 text-center"
    >
      <div className="max-w-4xl mx-auto rounded-2xl bg-white p-8 flex flex-col items-center gap-6">
        <h2 className="text-4xl font-bold">Contacto</h2>
        <p className="text-lg">
          Para más información o agendar una clase, contáctanos vía WhatsApp:
        </p>
        <div className="w-full">
          <WhatsAppButton>Contacto</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
