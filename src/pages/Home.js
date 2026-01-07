import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import photographyImg from "../assets/photography.png";
import filmsImg from "../assets/films.jpg";
import bgVideo from "../assets/work-bg.mp4";
import Modal from "react-modal";
import "./Home.css";
import { FaRegWindowClose } from "react-icons/fa";


// Import gallery images
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";

function Home() {
  // Animate cards on scroll
  useEffect(() => {
    const cards = document.querySelectorAll(".animate-left, .animate-right");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card) => observer.observe(card));
  }, []);

  // Gallery images
  const galleryImages = [photo1, photo2, photo3, photo4, photo5];

  // Modal setup
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState("");

  const openModal = (img) => {
    setCurrentImg(img);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <HeroCarousel />

      {/* VIDEO BACKGROUND SECTION */}
      <section className="work-section">
        {/* BACKGROUND VIDEO */}
        <video
          className="work-bg-video"
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* DARK OVERLAY */}
        <div className="work-overlay"></div>

        {/* CONTENT */}
        <div className="work-content">
          <div className="work-heading">
            <h2>Our Popular Works</h2>
            <p>A glimpse into our most loved cinematic creations</p>
          </div>

          <div className="work-cards">
            {/* PHOTOGRAPHY - left card */}
            <Link to="/ourwork" className="card-link">
              <div className="work-card animate-left">
                <div className="img-wrapper">
                  <img src={photographyImg} alt="Photography" />
                </div>
                <div className="card-title">Photography</div>
              </div>
            </Link>

            {/* FILMS - right card */}
            <Link to="/ourwork" className="card-link">
              <div className="work-card animate-right">
                <div className="img-wrapper">
                  <img src={filmsImg} alt="Films" />
                </div>
                <div className="card-title">Films</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gallery-section">
        <h2 className="gallery-title">Gallery</h2>
        <div className="gallery-container">
          <div className="gallery-slider">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => openModal(img)}
              >
                <img src={img} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL FOR FULL IMAGE */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <img src={currentImg} alt="Full View" />
        <button className="close-btn" onClick={closeModal}>
          <FaRegWindowClose />

        </button>
      </Modal>
    </>
  );
}

export default Home;
