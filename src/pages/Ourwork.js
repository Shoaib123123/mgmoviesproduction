import { useEffect, useMemo, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { categories as fallbackCategories, worksData, subCategories as fallbackSubCategories } from "./data.js";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import "./Works.css";
import HeroCarousel from "../components/HeroCarousel.js";

function Ourwork() {
  const [portfolio, setPortfolio] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Photography");
  const [activeSubCategory, setActiveSubCategory] = useState(fallbackSubCategories.Photography[0]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.from("portfolio_items").select("*").order("sort_order").then(({ data }) => {
      if (data?.length) setPortfolio(data);
    });
  }, []);

  const databaseHasItems = portfolio.length > 0;
  const categories = useMemo(() => databaseHasItems ? [...new Set(portfolio.map((item) => item.category))] : fallbackCategories, [databaseHasItems, portfolio]);
  const activeSubCategories = useMemo(() => {
    if (!databaseHasItems) return fallbackSubCategories[activeCategory] || [];
    return [...new Set(portfolio.filter((item) => item.category === activeCategory && item.sub_category).map((item) => item.sub_category))];
  }, [activeCategory, databaseHasItems, portfolio]);

  useEffect(() => {
    if (categories.length && !categories.includes(activeCategory)) setActiveCategory(categories[0]);
  }, [activeCategory, categories]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const options = databaseHasItems
      ? [...new Set(portfolio.filter((item) => item.category === category && item.sub_category).map((item) => item.sub_category))]
      : fallbackSubCategories[category] || [];
    setActiveSubCategory(options[0] || "");
    setOpenDropdown(options.length ? (openDropdown === category ? null : category) : null);
  };

  const currentItems = databaseHasItems
    ? portfolio.filter((item) => item.category === activeCategory && (!activeSubCategory || !activeSubCategories.length || item.sub_category === activeSubCategory))
    : activeCategory === "Photography"
      ? worksData.Photography[activeSubCategory] || []
      : worksData[activeCategory] || [];

  return (
    <>
      <HeroCarousel />
      <Pagination className="category-pagination">
        {categories.map((category) => (
          <div key={category} className="category-wrapper">
            <Pagination.Item active={category === activeCategory} onClick={() => handleCategoryClick(category)}>
              {category}{activeSubCategories.length > 0 && <span className="dropdown-arrow">▼</span>}
            </Pagination.Item>
            {activeSubCategories.length > 0 && openDropdown === category && (
              <div className="sub-menu" onMouseLeave={() => setOpenDropdown(null)}>
                {activeSubCategories.map((subCategory) => (
                  <span key={subCategory} className={subCategory === activeSubCategory ? "active-sub" : ""} onClick={() => { setActiveSubCategory(subCategory); setOpenDropdown(null); }}>
                    {subCategory}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </Pagination>

      <div className="cards-grid">
        {currentItems.length === 0 ? <p style={{ textAlign: "center", width: "100%" }}>No items found</p> : currentItems.map((item) => {
          const src = item.url || item.src;
          return <Card key={item.id} className="work-card" onClick={() => { setSelectedItem(item); setShowModal(true); }}>
            {item.media_type === "video" || item.type === "video" ? <video src={src} muted /> : <Card.Img src={src} alt={item.title || "Portfolio item"} />}
          </Card>;
        })}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" className="work-modal">
        <button className="modal-close-btn" onClick={() => setShowModal(false)}>×</button>
        <Modal.Body className="modal-body">
          {selectedItem && ((selectedItem.media_type || selectedItem.type) === "video" ? <video src={selectedItem.url || selectedItem.src} controls autoPlay /> : <img src={selectedItem.url || selectedItem.src} alt={selectedItem.title || "Portfolio item"} />)}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Ourwork;
