import DigitalServicePage, {
  digitalServiceImages,
} from "./DigitalServicePage";
import catalogImg from "../assets/OurServices/catalog.png";
import promotionImg from "../assets/OurServices/promotion.png";
import orderFulfillmentImg from "../assets/OurServices/order-fullfilment.png";

const {
  ecommerce,
  genFinance,
  genCustomer,
  audioInsights,
  processFrame1,
  processFrame2,
  processFrame5,
  processFrame7,
  ecommerceCompany,
} = digitalServiceImages;

export default function EcommerceDevelopment() {
  return (
    <DigitalServicePage
      breadcrumb="Ecommerce Development"
      heroTitle="Ecommerce Development for Modern Digital Storefronts"
      heroSubtitle="Secure, scalable, and user-focused commerce platforms with custom UX, payment flexibility, and end-to-end delivery."
      heroImage={ecommerce}
      introTitle="Ecommerce Development"
      introBody="Elevate your online business with our customized eCommerce portal development services. We build secure, scalable, and user-focused eCommerce platforms for your business brand. Custom design for simple UI/UX, agnostic payment integration, and more. In-house and end-to-end solutions to maximize customer experience and sales. Generate your own illustrative digital storefront with our talented team."
      sectionTitle="Commerce Platform Offerings"
      sectionSubtitle="Everything you need to launch, grow, and operate a high-converting online store."
      offerings={[
        {
          title: "Custom storefront experiences",
          description:
            "Brand-led product discovery, category pages, and checkout flows that convert.",
          icon: genCustomer,
        },
        {
          title: "Catalog & inventory systems",
          description:
            "Flexible product data models, variants, and inventory sync for growing catalogs.",
          icon: catalogImg,
        },
        {
          title: "Payments & checkout",
          description:
            "Payment-agnostic integrations with secure, friction-light purchase journeys.",
          icon: genFinance,
        },
        {
          title: "Order & fulfillment workflows",
          description:
            "Order management, notifications, and operational tools for reliable fulfillment.",
          icon: orderFulfillmentImg,
        },
        {
          title: "Promotions & personalization",
          description:
            "Campaigns, coupons, and recommendation patterns that lift average order value.",
          icon: promotionImg,
        },
        {
          title: "Analytics & growth loops",
          description:
            "Commerce KPIs and funnel insights that guide merchandising and UX improvements.",
          icon: audioInsights,
        },
      ]}
      processTitle="From Store Concept to Scale"
      processSubtitle="A commerce delivery approach focused on conversion, operations, and long-term growth."
      processSteps={[
        {
          title: "Discover",
          text: "Define catalog needs, buyer journeys, and operational constraints.",
          icon: processFrame1,
        },
        {
          title: "Design",
          text: "Craft conversion-focused UX for browse, cart, and checkout.",
          icon: processFrame2,
        },
        {
          title: "Build",
          text: "Implement storefront, payments, and admin workflows securely.",
          icon: processFrame5,
        },
        {
          title: "Grow",
          text: "Optimize with analytics, campaigns, and iterative enhancements.",
          icon: processFrame7,
        },
      ]}
      capabilitiesTitle="Commerce Capabilities"
      capabilities={[
        "B2C and B2B storefronts tailored to your sales model",
        "Multi-payment and multi-currency readiness where needed",
        "Admin dashboards for catalog, orders, and customers",
        "Integrations with logistics, accounting, and CRM tools",
        "Mobile-responsive shopping experiences",
        "Security practices for customer and payment data protection",
      ]}
      capabilitiesImage={ecommerceCompany}
      valueTitle="Value Added"
      valueSubtitle="Ecommerce systems that turn browsing into revenue and operations into a competitive edge."
      valuePoints={[
        "Faster path from brand vision to a live, conversion-ready store.",
        "Checkout experiences designed to reduce cart abandonment.",
        "Operational tooling that keeps orders moving smoothly.",
        "Flexible architecture for new categories, markets, and campaigns.",
        "Insights that help merchandising and marketing teams act quickly.",
        "A foundation ready to layer AI recommendations and automation later.",
      ]}
      showTechStacks
    />
  );
}
