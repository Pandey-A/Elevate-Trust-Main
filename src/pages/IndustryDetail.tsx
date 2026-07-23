import { Navigate, useParams } from "react-router-dom";
import IndustryPageTemplate from "../components/industry/IndustryPageTemplate";
import { industryPagesBySlug } from "../data/industryPageContent";

function normalizeSlug(value: string | undefined) {
  if (!value) return "";
  return decodeURIComponent(value).toLowerCase();
}

export default function IndustryDetail() {
  const { slug } = useParams<{ slug?: string }>();
  const normalized = normalizeSlug(slug);
  const content = industryPagesBySlug[normalized];

  if (!content) {
    return <Navigate to="/industries" replace />;
  }

  return <IndustryPageTemplate content={content} />;
}
