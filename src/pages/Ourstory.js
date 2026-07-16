import React from "react";
import "./Ourstory.css";
import storyImage from "../assets/story.jpeg";
import HeroCarousel from "../components/HeroCarousel";
import { useSiteContent } from "../content/SiteContentContext";



function Ourstory() {
  const { content } = useSiteContent();

  return (
    <>
      <HeroCarousel />
      <section className="our-story-container">
        <div className="story-image">
          <img src={content.story_image || storyImage} alt="Our Story" />
        </div>
        <div className="story-content">
          <h5>{content.story_eyebrow}</h5>
          <h1>{content.story_heading}</h1>
          <p>{content.story_paragraph_1}</p>
          <p>{content.story_paragraph_2}</p>
          <p>{content.story_paragraph_3}</p>
          <button className="story-btn">{content.story_button_label}</button>
        </div>
      </section>
    </>
  );
}

export default Ourstory;
