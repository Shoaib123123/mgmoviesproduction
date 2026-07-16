import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import "./Footer.css";
import { useSiteContent } from "../content/SiteContentContext";

function Footer() {
  const { content } = useSiteContent();
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2 className="footer-logo">{content.footer_brand}</h2>

          <p className="footer-text">
            {content.footer_description}
          </p>

          <div className="social-icons">
            <a href={content.footer_instagram_url} target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href={content.footer_facebook_url} target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/ourstory">Our Story</a></li>
            <li><a href="/contact">Contact</a></li>
            
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>
            <FaMapMarkerAlt /> Noida, Uttar Pradesh
          </p>

          <p>
            <FaPhoneAlt /> +91 98765 43210
          </p>

          <p>
            <FaEnvelope /> info@moxstudio.com
          </p>
        </div>

        {/* Business Hours */}
        <div className="footer-section">
          <h3>Opening Hours</h3>

          <p>Monday - Saturday</p>
          <p>10:00 AM - 9:00 PM</p>

          <br />

          <p>Sunday</p>
          <p>11:00 AM - 7:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MG Movies Production. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
