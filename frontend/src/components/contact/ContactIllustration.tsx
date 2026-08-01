import contactIllustration from "../../assets/contact/contact-illustration.svg";

export default function ContactIllustration() {
  return (
    <section className="w-full bg-white pb-14 sm:pb-16 lg:pb-20">
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-5 sm:px-8 md:px-10 lg:px-20">
        <img
          src={contactIllustration}
          alt=""
          className="h-auto w-full max-w-[240px] object-contain sm:max-w-[280px] md:max-w-[220px] mt-12 mb-12"
          aria-hidden
        />
      </div>
    </section>
  );
}