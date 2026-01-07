import { NavLink } from "react-router-dom";
import "./HeroCarousel.css";
import wedding1 from "../assets/images/wedding/wedding1.png";
import { FaAnglesDown } from "react-icons/fa6";

function HeroCarousel() {
  return (
    <div className="hero-container">
      {/* Background Image */}
      <div
        className="hero-slide zoom-animation"
        style={{ backgroundImage: `url(${wedding1})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="hero-dark-overlay"></div>

      {/* Content */}
      <div className="hero-overlay">
        <h1 className="hero-title" >MG Movies Production</h1>
        <p className="hero-subtitle">Cinematic Wedding Films</p>
        

        <ul className="hero-menu">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/ourwork">Our Work</NavLink></li>
          <li><NavLink to="/ourstory">Our Story</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <section className="scroll-down">
        <FaAnglesDown />
        </section>

      </div>
    </div>

    
  );

  
}
 


export default HeroCarousel;
