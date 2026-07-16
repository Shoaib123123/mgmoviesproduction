import { NavLink } from "react-router-dom";
import "./HeroCarousel.css";
import wedding1 from "../assets/images/wedding/wedding1.png";
import { FaAnglesDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSiteContent } from "../content/SiteContentContext";

function HeroCarousel() {
  const { content } = useSiteContent();
  return (
    <div className="hero-container">
      {/* Background Image */}
      <div
        className="hero-slide zoom-animation"
        style={{ backgroundImage: `url(${content.hero_image || wedding1})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="hero-dark-overlay"></div>

      {/* Content */}
      <div className="hero-overlay">
        <h1 className="hero-title" >{content.hero_title}</h1>
        <p className="hero-subtitle">{content.hero_subtitle}</p>
        

        <ul className="hero-menu">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/ourwork">Our Work</NavLink></li>
          <li><NavLink to="/ourstory">Our Story</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <section className="scroll-down">
        <FaAnglesDown />
        </section>
        <section className="Enquire-now">

<Link to="/Enquire">
  <button className="enquire-btn">
    Enquire Now
  </button>
</Link>

</section>

      </div>
    </div>

    
  );

  
}
 


export default HeroCarousel;
