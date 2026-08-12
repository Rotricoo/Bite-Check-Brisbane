import instagramIcon from "../../assets/icons/socialMedia-instagram-icon.svg";
import facebookIcon from "../../assets/icons/socialMedia-facebook-icon.svg";
import twitterIcon from "../../assets/icons/socialMedia-x-icon.svg";
import tiktokIcon from "../../assets/icons/socialMedia-tiktok-icon.svg";

function Contact() {
  return (
    <div className="contact">
      <div className="contact__hero">
        <h1 className="contact__hero--title">Know a place that we should visit?</h1>
        <p className="contact__hero--description">
          We are always looking for new places to explore and review. If you have a suggestion, please send us by email or fill out the form below and we will
          get back to you as soon as possible.
        </p>
        <div className="contact__hero--email">
          <p className="contact__hero--email--text">Email us at:</p>
          <a href="mailto:bitecheck@gmail.com" className="contact__hero--email--link">
            bitecheck@gmail.com
          </a>
        </div>
        <div className="contact__hero--socials">
          <p className="contact__hero--socials--text">Follow us on social media:</p>
          <div className="contact__hero--socials--links">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="homepage__contact--socials-link"
              aria-label="Visit our Instagram"
            >
              <img src={instagramIcon} alt="Instagram Icon" className="homepage__contact--socials-icon" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="homepage__contact--socials-link"
              aria-label="Visit our Facebook"
            >
              <img src={facebookIcon} alt="Facebook Icon" className="homepage__contact--socials-icon" />
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="homepage__contact--socials-link"
              aria-label="Visit our X (Twitter)"
            >
              <img src={twitterIcon} alt="Twitter Icon" className="homepage__contact--socials-icon" />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="homepage__contact--socials-link"
              aria-label="Visit our TikTok"
            >
              <img src={tiktokIcon} alt="TikTok Icon" className="homepage__contact--socials-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="contact__form">
        <h2 className="contact__form--title">Send us a message</h2>
        <form className="contact__form--content" action="mailto:bitecheck@gmail.com" method="post" enctype="text/plain">
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
            <label htmlFor="message" className="contact__form--label">
              Message
            </label>
            <textarea id="message" name="message" rows={5} className="contact__form--textarea" required />
          </div>
          <button type="submit" className="contact__form--submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
