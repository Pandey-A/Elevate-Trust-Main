import ContactBreadcrumb from "./ContactBreadcrumb";
import ContactActionCards from "./ContactActionCards";
import ContactKeepInTouch from "./ContactKeepInTouch";
export default function ContactMainSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 sm:px-8 md:px-10 lg:px-20 lg:pb-16">
        <ContactBreadcrumb />

        <div className="mx-auto w-full max-w-[920px]">
          <ContactActionCards />
          <ContactKeepInTouch />
        </div>
      </div>
    </section>
  );
}