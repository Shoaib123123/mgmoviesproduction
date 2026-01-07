import React from "react";
import HeroCarousel from "../components/HeroCarousel";
import { FaWhatsapp } from "react-icons/fa";
import bgImage from "../assets/contact-bg.jpg";

function Contact() {
  const whatsappNumber = "+916282935948";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  return (
    <>
      {/* HERO SECTION */}
      <HeroCarousel />

      {/* CONTACT SECTION */}
      <div style={styles.page}>
        {/* HOVER CSS (same file) */}
        <style>{`
          .whatsapp-outline:hover {
            background-color: #25D366;
            color: #ffffff;
            transform: translateY(-2px);
          }
        `}</style>

        {/* OVERLAY */}
        <div style={styles.overlay}>
          <h1 style={styles.title}>Contact Us</h1>

          <div style={styles.container}>
            {/* LEFT: MAP */}
            <div style={styles.mapContainer}>
              <iframe
                title="MG Movies Location"
                src="https://www.google.com/maps?q=Haziyapur,+Bareilly,+Uttar+Pradesh,+India&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            {/* RIGHT: DETAILS */}
            <div style={styles.details}>
              <h2 style={styles.heading}>Our Location</h2>

              <p style={styles.text}>
                <strong>Address:</strong><br />
                House No. 123, Haziyapur, Near Main Market,<br />
                Bareilly, Uttar Pradesh, 243001, India
              </p>

              <p style={styles.text}>
                <strong>Phone:</strong> +91 6282935948
              </p>

              <p style={styles.text}>
                <strong>Email:</strong> info@mgmovies.com
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-outline"
                style={styles.whatsappBtn}
              >
                <FaWhatsapp style={{ marginRight: "8px" }} />
                Connect on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "80px 20px",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    fontSize: "48px",
    marginBottom: "60px",
    color: "#111",
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  mapContainer: {
    flex: "1 1 400px",
    minHeight: "300px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  details: {
    flex: "1 1 500px",
    paddingLeft: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "12px",
  },

  heading: {
    fontSize: "36px",
    color: "#111",
  },

  text: {
    fontSize: "15px",
    lineHeight: "1.8",
    color: "#333",
    fontFamily: "'Inter', sans-serif",
  },

  whatsappBtn: {
    marginTop: "32px",
    padding: "14px 34px",
    backgroundColor: "transparent",
    color: "#25D366",
    fontSize: "18px",
    fontWeight: "500",
    border: "2px solid #25D366",
    borderRadius: "10px",
    textDecoration: "none",
    width: "fit-content",
    display: "inline-flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
};

export default Contact;
