import React, { useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import "./Enquire.css";

function Enquire() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    location: ""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    console.table(formData);

    alert("Your details have been submitted successfully!");

    // Clear form after submission
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      location: ""
    });
  };


  return (
    <>
      {/* Hero Carousel Top */}
      <HeroCarousel />


      {/* Enquiry Form */}
      <div className="enquire-page">

        <div className="enquire-box">

          <h1>Enquire Now</h1>

          <p>
            Share your details and we will contact you soon.
          </p>


          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />


            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />


            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={formData.whatsapp}
              onChange={handleChange}
            />


            <input
              type="text"
              name="location"
              placeholder="Shoot Location"
              value={formData.location}
              onChange={handleChange}
              required
            />


            <button type="submit">
              Submit Enquiry
            </button>

          </form>

        </div>

      </div>

    </>
  );
}


export default Enquire;