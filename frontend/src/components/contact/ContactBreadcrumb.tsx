import { Link } from "react-router-dom";

export default function ContactBreadcrumb() {
  return (
    <nav className="page-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span className="page-breadcrumb__sep" aria-hidden="true">
        »
      </span>
      <span>Contact Us</span>
    </nav>
  );
}
