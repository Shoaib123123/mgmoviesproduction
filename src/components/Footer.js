import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";



function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Side: Branding */}
        <div style={styles.brand}>
          <h1 style={{ margin: 0, color: "#FFD700", fontSize: "48px" }}>MG Movies</h1>
          <p style={{ color: "#aaa", marginTop: "10px", fontSize: "20px" }}>Your ultimate movie destination</p>
          <br />
          <h3 className="text-muted" >Social media</h3>
          <a href="https://www.instagram.com/i.m._shoaib/"><p>< BsInstagram size={20} color="white" />
          </p></a> 
          <a href="https://www.instagram.com/i.m._shoaib/"><p><FaFacebook size={20} color="white" />

          </p></a>


        </div>

        {/* Right Side: Links */}
        <ul style={styles.links}>
          <li><a href="#home" style={styles.link}>Home</a></li>
          <li><a href="#about" style={styles.link}>About</a></li>
          <li><a href="#services" style={styles.link}>Services</a></li>
          <li><a href="#contact" style={styles.link}>Contact</a></li>
        </ul>
      </div>

      <p style={styles.copy}>
        © {new Date().getFullYear()} MG Movies. All rights reserved.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "40px",
    padding: "60px 40px 30px 40px", // Bigger padding for a larger footer
    background: "#111",
    color: "#fff",
    fontFamily: "'Arial', sans-serif",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    maxWidth: "1400px",
    margin: "0 auto",
    gap: "40px",
  },
  brand: {
    maxWidth: "400px",
  },
  links: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "24px", // Bigger link font
    transition: "0.3s",
  },
  copy: {
    marginTop: "30px",
    textAlign: "center",
    fontSize: "18px", // Bigger copyright font
    color: "#aaa",
  },
};

export default Footer;
