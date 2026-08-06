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

/** Repeat once so each track half stays wider than the viewport — no empty gaps in the loop. */
const logoSequence = [...clientLogos, ...clientLogos];

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="client-strip__group flex shrink-0 items-center"
      aria-hidden={duplicate || undefined}
    >
      {logoSequence.map((client, index) => (
        <div
          key={`${duplicate ? "dup" : "main"}-${client.name}-${index}`}
          className="flex shrink-0 items-center"
        >
          <div className="flex h-7 items-center justify-center px-5 sm:h-8 sm:px-8 md:h-9 md:px-10 lg:h-10 lg:px-12">
            <img
              src={client.src}
              alt={duplicate ? "" : client.name}
              className="max-h-5 w-auto object-contain sm:max-h-6 md:max-h-7 lg:max-h-8"
              draggable={false}
            />
          </div>
          <span className="client-strip__sep" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export default function ClientStrip() {
  return (
    <section
      className="client-strip relative overflow-hidden bg-white py-2.5 sm:py-3.5 md:py-4 lg:py-5"
      aria-label="Our customers"
    >
      <div className="client-strip__track flex w-max items-center">
        <LogoGroup />
        <LogoGroup duplicate />
      </div>
    </section>
  );
}
