import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AboutUs.css";
import FlyCTA from "../components/FlyCTA";
import globeMap from "../assets/homepage-icons/Group(3).png";
import coreValueIcon from "../assets/homepage-icons/Frame.png";
import missionIcon from "../assets/homepage-icons/partners-1.svg";
import visionIcon from "../assets/homepage-icons/partners-2.svg";
import about1 from "../assets/homepage-icons/about-1.png";
import about2 from "../assets/homepage-icons/about-2.png";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <img src={globeMap} alt="Globe background" className="about-hero-bg" aria-hidden="true" />
        <div className="about-hero-content">
          <h1 className="about-hero-title">About ElevateTrust.Ai</h1>
          <p className="about-hero-subtitle">
            At ElevateTrust.ai, we transform innovative ideas into reliable AI solutions, making us your
            trusted partner for comprehensive AI implementation. Our core team consists of experts who
            fast-track machine learning, Deep Learning, Generative AI, and agentic-based solutions.
          </p>
          <Link to="/contact" className="about-hero-btn">
            <span>CONTACT US</span>
            <span className="about-hero-btn__circle">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="3">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="about-breadcrumbs">
        <Link to="/">Home</Link>
        <span>»</span>
        <span>About Us</span>
      </div>

      {/* Main Content */}
      <div className="about-container">

        {/* Top Row */}
        <div className="about-top-section">
          <div className="about-title-wrapper">
            <h1 className="about-main-title">
              AI-Powered<br />
              Solutions for<br />
              a Dynamic<br />
              World
            </h1>
          </div>

          <div className="core-value-card">
            <h2>Our Core Value</h2>
            <p>
              The company values are summarized by the
              acronym THRIVE, which stands for Trust,
              Harmony, Respect, Inspire, Voice, and Elevate.
            </p>
            <img src={coreValueIcon} alt="Core Value Illustration" />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="about-bottom-section">
          <div className="about-info-card">
            <div>
              <h2>Our Mission</h2>
              <p>
                Help organization to elevate their customer
                trust by delivering cutting-edge AI solutions
                with our expertise in Data Science and
                Generative AI.
              </p>
            </div>
            <img src={visionIcon} alt="Mission Illustration" className="mission-img" />
          </div>

          <div className="about-info-card">
            <div>
              <h2>Our Vision</h2>
              <p>
                Be the top AI/ML implementation &amp;
                consulting partner which operates in an
                ethically upright manner to grow an
                organization and win the business.
              </p>
            </div>
            <img src={missionIcon} alt="Vision Illustration" className="vision-img" />
          </div>
        </div>
      </div>

      {/* Desk Profiles Section */}
      <section className="about-desk-section">
        <div className="desk-container">
          
          {/* CEO Profile */}
          <div className="desk-profile">
            <div className="desk-profile-left">
              <div className="desk-img-wrapper">
                <img src={about1} alt="Sajal Pahariya" />
              </div>
              <h3 className="desk-name">Sajal Pahariya</h3>
              <p className="desk-role">Chief Executive Officer, ElevateTrust.Ai</p>
            </div>
            <div className="desk-profile-right">
              <h2 className="desk-title">From the<br />CEO's desk</h2>
              <div className="desk-bubble">
                <p>
                  At Elevate Trust, we are at the forefront of the AI revolution, pioneering solutions that
                  transform businesses and industries. Our expertise spans Gen AI, AI/ML, Video
                  Analytics, and Cloud Deployment, positioning us as leaders in the rapidly evolving
                  digital landscape.
                </p>
                <p>
                  As the Chief Executive Officer of ElevateTrust.AI, I, Sajal Pahariya, bring a wealth of
                  experience and academic excellence to our mission. With an M.Tech degree and
                  extensive Generative AI experience, I have dedicated my career to pushing the
                  boundaries of AI technology. My research in image segmentation, published in IEEE
                  Xplore ("Image segmentation using snake model with noise adaptive fuzzy switching
                  median filter and MSRM method"), has contributed to advancements in medical
                  imaging analysis.
                </p>
                <p>
                  Our vision at Elevate Trust is to harness the transformative power of AI and ML to
                  drive innovation, efficiency, and growth for our clients. We believe that these
                  technologies are not just tools, but catalysts for change, enabling businesses to solve
                  complex problems, uncover new opportunities, and maintain a competitive edge in
                  their respective fields.
                </p>
              </div>
            </div>
          </div>

          {/* CMO Profile */}
          <div className="desk-profile">
            <div className="desk-profile-left">
              <div className="desk-img-wrapper">
                <img src={about2} alt="Bhawna Deshmukh" />
              </div>
              <h3 className="desk-name">Bhawna Deshmukh</h3>
              <p className="desk-role">Director &amp; CMO, ElevateTrust.Ai</p>
            </div>
            <div className="desk-profile-right">
              <h2 className="desk-title">From the<br />CMO's desk</h2>
              <div className="desk-bubble">
                <p>
                  At Elevate Trust, we are redefining the digital marketing landscape by leveraging cutting-
                  edge technologies to drive impactful marketing strategies, customer engagement, and
                  lead generation. As a leader in AI-driven solutions, our expertise spans digital marketing,
                  content creation, AI/ML applications, and data-driven campaigns, positioning us to
                  transform how brands connect with their audiences.
                </p>
                <p>
                  As the Director &amp; CMO of Elevate Trust, I, Bhawna Deshmukh, am passionate about
                  blending creative marketing strategies with advanced AI and machine learning
                  technologies. With a background in digital marketing and an extensive track record in
                  lead generation, I have led efforts to deliver results that matter for businesses. My focus is
                  on creating dynamic marketing ecosystems that use data and automation to engage
                  customers and convert prospects into loyal clients.
                </p>
                <p>
                  We invite you to partner with us in navigating the evolving digital space. Together, let's
                  create the future of marketing and unlock the true potential of AI-driven campaigns.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FlyCTA Section */}
      <FlyCTA />
    </div>
  );
}
