import Acerca from "@/components/acerca";
import Contacto from "@/components/contacto";
import CuentosInfo from "@/components/cuentosInfo";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import ServicesTable from "@/components/servicesTable";
import SobreMi from "@/components/sobreMi";
import TestimoniosItem from "@/components/testimoniosItem";

export default function Home() {
  return (
    <div className="flex flex-col gap-14 md:gap-20">
      <Hero />
      <div className="mt-12">
        <Acerca />
      </div>
      <CuentosInfo />
      <ServicesTable />
      <TestimoniosItem />
      <SobreMi />
      <Contacto />
      <Footer />
    </div>
  );
}
