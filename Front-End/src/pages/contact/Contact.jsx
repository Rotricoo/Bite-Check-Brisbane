import { useState } from "react";
import { createContactMessage } from "../../services/contactAPI.js";

// Import social media icons
import instagramIcon from "../../assets/icons/socialMedia-instagram-icon.svg";
import facebookIcon from "../../assets/icons/socialMedia-facebook-icon.svg";
import twitterIcon from "../../assets/icons/socialMedia-x-icon.svg";
import tiktokIcon from "../../assets/icons/socialMedia-tiktok-icon.svg";
import "./Contact.scss";

function Contact() {
  const [formMessage, setFormMessage] = useState("");

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleContactSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const contactData = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      subject: formData.get("subject").trim(),
      message: formData.get("message").trim(),
    };

    if (!isValidEmail(contactData.email)) {
      setFormMessage("Please enter a valid email address.");
      return;
    }

    try {
      const result = await createContactMessage(contactData);
      setFormMessage(result.message);
      form.reset();
    } catch (error) {
      setFormMessage(error.message);
    }
  }

  return (
    <div className="contact">
      <section className="contact__hero">
        <h1 className="contact__hero--title">Know a place that we should visit?</h1>
        <p className="contact__hero--description">
          Send us a restaurant, cafe, or casual food spot around Brisbane. We read every suggestion and use them to plan what Bite Check should review next.
        </p>
      </section>

      <section className="contact__content">
        <aside className="contact__info">
          <div className="contact__info-card">
            <p className="contact__info-label">Email us at</p>
            <a href="mailto:bitecheck@gmail.com" className="contact__info-link">
              bitecheck@gmail.com
            </a>
          </div>

          <div className="contact__info-card">
            <p className="contact__info-label">Follow us</p>
            <div className="contact__socials">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="contact__socials-link" aria-label="Visit our Instagram">
                <img src={instagramIcon} alt="" className="contact__socials-icon" />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="contact__socials-link" aria-label="Visit our Facebook">
                <img src={facebookIcon} alt="" className="contact__socials-icon" />
              </a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="contact__socials-link" aria-label="Visit our X">
                <img src={twitterIcon} alt="" className="contact__socials-icon" />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="contact__socials-link" aria-label="Visit our TikTok">
                <img src={tiktokIcon} alt="" className="contact__socials-icon" />
              </a>
            </div>
          </div>

          <div className="contact__info-card">
            <p className="contact__info-label">What to send</p>
            <p className="contact__info-text">Restaurant name, suburb, cuisine, and why you think we should try it.</p>
          </div>
        </aside>

        <div className="contact__form">
          <h2 className="contact__form--title">Send us a message</h2>
          <form className="contact__form--content" onSubmit={handleContactSubmit}>
            <div className="contact__form--field">
              <label htmlFor="name" className="contact__form--label">
                Name
              </label>
              <input type="text" id="name" name="name" className="contact__form--input" required />
            </div>
            <div className="contact__form--field">
              <label htmlFor="email" className="contact__form--label">
                Email
              </label>
              <input type="email" id="email" name="email" className="contact__form--input" required />
            </div>
            <div className="contact__form--field">
              <label htmlFor="subject" className="contact__form--label">
                Restaurant suggestion
              </label>
              <input type="text" id="subject" name="subject" className="contact__form--input" placeholder="Optional" />
            </div>
            <div className="contact__form--field">
              <label htmlFor="message" className="contact__form--label">
                Message
              </label>
              <textarea id="message" name="message" rows={5} className="contact__form--textarea" required />
            </div>
            <button type="submit" className="contact__form--submit">
              Send message
            </button>
            {formMessage && <p className="contact__form--message">{formMessage}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
