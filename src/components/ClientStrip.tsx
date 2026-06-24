import arupaLogo from "../assets/client-strip/Arupa.svg";
import cl1Logo from "../assets/client-strip/CL1.svg";
import complyCoreLogo from "../assets/client-strip/ComplyCore.svg";
import qjumpersLogo from "../assets/client-strip/Qjumpers.svg";
import travellersLogo from "../assets/client-strip/travellers.svg";

/** Add new logos here after exporting to `src/assets/client-strip/` */
const clientLogos = [
  { name: "CL1", src: cl1Logo },
  { name: "Arupa AI", src: arupaLogo },
  { name: "Happy Feet Travellers", src: travellersLogo },
  { name: "ComplyCore", src: complyCoreLogo },
  { name: "Qjumpers", src: qjumpersLogo },
];




function LogoRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={duplicate || undefined}>
      {clientLogos.map((client) => (
        <div
          key={`${duplicate ? "dup-" : ""}${client.name}`}
          className="flex h-12 shrink-0 items-center justify-center px-8 sm:px-12 lg:px-14"
        >
          <img
            src={client.src}
            alt={duplicate ? "" : client.name}
            className="max-h-10 w-auto object-contain"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}




export default function ClientStrip() {
  return (
    <>
      <section className="client-strip relative overflow-hidden bg-white py-6" aria-label="Our customers">
        <div className="client-strip__track flex w-max items-center">
          <LogoRow />
          <LogoRow duplicate />
        </div>
      </section>


    </>
  );
}
