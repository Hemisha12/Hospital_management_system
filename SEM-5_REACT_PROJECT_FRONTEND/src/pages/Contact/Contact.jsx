import React, { useEffect } from "react";
import "./Contact.css";
import { img } from "../../Img/img";

const Contact = () => {
  useEffect(() => {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const item = header.parentElement;
        const isActive = item.classList.contains("active");

        document.querySelectorAll(".accordion-item").forEach((i) => {
          i.classList.remove("active");
          i.querySelector(".symbol").textContent = "+";
        });

        if (!isActive) {
          item.classList.add("active");
          item.querySelector(".symbol").textContent = "−";
        }
      });
    });
  }, []);

  return (
    <div className="container">
      {/* Contact Section */}
      <div className="contact-container">
        <div className="form-section">
          <h2>Contact Our Hospital</h2>
          <p>We’re here to help. Fill out the form below:</p>
          <form>
            <div className="name-fields">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <input type="email" placeholder="Email Address" />
            <select>
              <option>Department</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              {/* Add more options */}
            </select>
            <textarea placeholder="Your message..."></textarea>
            <button type="submit" className="send-btn">
              Send Message
            </button>
          </form>
        </div>
        <img src={img.contact_img} alt="contact"></img>
      </div>
      {/* FAQ Section */}
      <div className="que">
        <section className="faq-section">
          <h1 className="faq-title">
            Frequently Asked <br /> Questions
          </h1>
          {/* <p className="faq-subtext">
            Explore our FAQs or reach out directly for personalized support.
            <br />
            We're here to help you make the most of your Citycare experience!
          </p> */}
        </section>

        <div className="accordion">
          <div className="accordion-item active">
            <button className="accordion-header">
              Who can use this system?
              <span className="symbol">−</span>
            </button>
            <div className="accordion-content">
              Admins, doctors, receptionists, lab staff, pharmacists, and
              patients.
            </div>
          </div>

          <div className="accordion-item">
            <button className="accordion-header">
              Is there a role-based login system?
              <span className="symbol">+</span>
            </button>
            <div className="accordion-content">
              Yes, separate logins exist for admin, doctors, staff, and
              patients.
            </div>
          </div>

          <div className="accordion-item">
            <button className="accordion-header">
              What is a Hospital Management System?
              <span className="symbol">+</span>
            </button>
            <div className="accordion-content">
              It's software that manages hospital operations like patients,
              doctors, billing, and records.
            </div>
          </div>

          <div className="accordion-item">
            <button className="accordion-header">
              Can patients book appointments online?
              <span className="symbol">+</span>
            </button>
            <div className="accordion-content">
              Yes, patients can book appointments through the portal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
