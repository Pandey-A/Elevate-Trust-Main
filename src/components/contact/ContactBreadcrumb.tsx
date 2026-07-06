import { Link } from "react-router-dom";

export default function ContactBreadcrumb() {
  return (
    <nav
      className="mb-8 mt-4 text-left text-[10px] text-[#9CA3AF] sm:mb-10 sm:mt-5 sm:text-xs"
      aria-label="Breadcrumb"
    >
      <Link to="/" className="hover:text-[#6B7280]">
        Home
      </Link>
      <span className="mx-1.5">»</span>
      <span className="text-[#6B7280]">Contact Us</span>
    </nav>
  );
}