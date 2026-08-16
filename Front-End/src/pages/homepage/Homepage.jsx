import "./Homepage.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { subscribeToNewsletter } from "../../services/newsletterAPI.js";
//videos and images
import heroVideo from "../../assets/videos/hero-homepage.mp4";
import heroImage from "../../assets/img/hero-homepage.jpg";
import aboutUsImage from "../../assets/img/homepage-aboutUs.png";
import trendingSpotImage from "../../assets/img/homepage-trendingSpots.jpg";
import studentPicksImage from "../../assets/img/homepage-studentPicks.jpg";
// Icons
import newsletterIcon from "../../assets/icons/homepage-news-icon.svg";
import instagramIcon from "../../assets/icons/socialMedia-instagram-icon.svg";
import facebookIcon from "../../assets/icons/socialMedia-facebook-icon.svg";
import twitterIcon from "../../assets/icons/socialMedia-x-icon.svg";
import tiktokIcon from "../../assets/icons/socialMedia-tiktok-icon.svg";

function Homepage() {
  const [newsletterMessage, setNewsletterMessage] = useState("");

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleNewsletterSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("newsletterEmail").trim();

    if (!isValidEmail(email)) {
      setNewsletterMessage("Please enter a valid email address.");
      return;
    }

    try {
      const result = await subscribeToNewsletter(email);
      setNewsletterMessage(result.message);
      form.reset();
    } catch (error) {
      setNewsletterMessage(error.message);
    }
  }

  return (
    <>
      <section className="homepage">
        <div className="homepage__hero">
          <div className="homepage__hero--video-container">
            <video className="homepage__hero--video" autoPlay muted loop playsInline>
              <source src={heroVideo} type="video/mp4" />
            </video>
            <img className="homepage__hero--image" src={heroImage} alt="Sushi on a plate" />
          </div>

          <div className="homepage__hero--overlay">
            <div className="homepage__hero-content">
              <div className="homepage__hero-content--title">
                <h1 className="homepage__hero-content--title-main">Two students, one city, honest bites</h1>
                <h2 className="homepage__hero-content--title-line1">Two Students</h2>
                <h2 className="homepage__hero-content--title-line2">One City</h2>
                <h2 className="homepage__hero-content--title-line3">Honest Bites</h2>
              </div>
              <p className="homepage__hero-content--description">
                We review Brisbane food spots with two honest opinions, student-friendly prices, and a final verdict on what is actually worth the hype.
              </p>
              <Link to="/all-reviews" className="homepage__hero-content--button">
                Explore Reviews
              </Link>
            </div>
          </div>
        </div>

        <div className="homepage__about-us">
          <div className="homepage__about-us--content">
            <div className="homepage__about-us--text">
              <h2 className="homepage__about-us--title">What We Do</h2>
              <p className="homepage__about-us--description">
                We explore Brisbane food spots from a student point of view, with two honest opinions, a final score, and a simple verdict. From trending places
                to budget-friendly finds, Bite Check helps students decide what is actually worth trying.
              </p>
            </div>
            <div className="homepage__about-us--image-container">
              <img src={aboutUsImage} alt="Food Review" className="homepage__about-us--image" />
              <Link to="/about-us" className="homepage__about-us--button">
                Read More
              </Link>
            </div>
          </div>
        </div>

        <div className="homepage__reviews">
          <div className="homepage__reviews--content">
            <div className="homepage__reviews--text">
              <h2 className="homepage__reviews--title">Explore Our Food Picks</h2>
              <p className="homepage__reviews--description">Browse viral places and student-friendly favourites from the same review database.</p>
            </div>
            <div className="homepage__reviews--cards">
              <div className="homepage__reviews--card">
                <img src={trendingSpotImage} alt="Trending Spot" className="homepage__reviews--card-image" />
                <h3 className="homepage__reviews--card-title">Trending Spots </h3>
                <p className="homepage__reviews--card-description">
                  Viral places, popular dishes, and local food spots everyone is talking about. We check if they are actually worth the hype.
                </p>
                <Link to="/trending-spots" className="homepage__reviews--card-button">
                  Check the Hype
                </Link>
              </div>
              <div className="homepage__reviews--card">
                <img src={studentPicksImage} alt="Student Picks" className="homepage__reviews--card-image" />
                <h3 className="homepage__reviews--card-title">Student Picks</h3>
                <p className="homepage__reviews--card-description">
                  Affordable, reliable, and satisfying food options for students who want good meals without wasting money.
                </p>
                <Link to="/student-picks" className="homepage__reviews--card-button">
                  Check the Hype
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="homepage__newsletter">
          <div className="homepage__newsletter--content">
            <div className="homepage__newsletter--intro">
              <img src={newsletterIcon} alt="Newsletter" className="homepage__newsletter--icon" />
              <div className="homepage__newsletter--text">
                <h2 className="homepage__newsletter--title">Join our bite list</h2>
                <p className="homepage__newsletter--description">
                  Get fresh Brisbane food finds, student-friendly picks, and honest reviews from two local perspectives, straight to your inbox.
                </p>
              </div>
            </div>
            <form className="homepage__newsletter--form" onSubmit={handleNewsletterSubmit}>
              <input name="newsletterEmail" type="email" placeholder="Enter your email" aria-label="Enter your email" required />

              <button type="submit" className="homepage__newsletter--button">
                Subscribe
              </button>

              {newsletterMessage && <p className="homepage__newsletter--message">{newsletterMessage}</p>}
            </form>
          </div>
        </div>

        <div className="homepage__contact">
          <div className="homepage__contact--content">
            <h2 className="homepage__contact--title">Get in touch with us</h2>
            <div className="homepage__contact--info">
              <div className="homepage__contact--left">
                <div className="homepage__contact--row">
                  <p className="homepage__contact--label">E-mail</p>
                  <a href="mailto:bitecheckbrisbane@gmail.com" className="homepage__contact--email-link" aria-label="Send us an email">
                    bitecheckbrisbane@gmail.com
                  </a>
                </div>

                <div className="homepage__contact--row">
                  <p className="homepage__contact--label">Social Media</p>
                  <div className="homepage__contact--socials">
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

              <div className="homepage__contact--divider"></div>

              <div className="homepage__contact--right">
                <h3 className="homepage__contact--submitPlace-title">Got a place we should try?</h3>
                <p className="homepage__contact--submitPlace-description">Send us a food spot, hidden gem, or viral place you want us to review next.</p>
                <Link to="/contact" className="homepage__contact--submitPlace-button">
                  Submit a Place
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;
