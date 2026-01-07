import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { categories, worksData } from "./data";
import "./Works.css";
import HeroCarousel from "../components/HeroCarousel";

function Ourwork() {
  const [activeCategory, setActiveCategory] = useState("Photography");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <HeroCarousel />

      {/* CATEGORY PAGINATION */}
      <Pagination className="category-pagination">
        {categories.map((cat) => (
          <Pagination.Item
            key={cat}
            active={cat === activeCategory}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* CARDS GRID */}
      <div className="cards-grid">
        {worksData[activeCategory]?.map((item) => (
          <Card
            key={item.id}
            className="work-card"
            onClick={() => handleOpen(item)}
          >
            {item.type === "image" ? (
              <Card.Img src={item.src} />
            ) : (
              <video src={item.src} muted />
            )}
          </Card>
        ))}
      </div>

      {/* MODAL WITH CLOSE BUTTON */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        size="lg"
        className="work-modal"
      >
        <button className="modal-close-btn" onClick={handleClose}>
          ✕
        </button>

        <Modal.Body className="modal-body">
          {selectedItem &&
            (selectedItem.type === "image" ? (
              <img src={selectedItem.src} alt="work preview" />
            ) : (
              <video
                src={selectedItem.src}
                controls
                autoPlay
              />
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Ourwork;
