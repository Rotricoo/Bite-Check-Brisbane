import "./Homepage.scss";
import heroVideo from "../../assets/videos/hero-homepage.mp4";
import heroImage from "../../assets/img/hero-homepage.jpg";

function Homepage() {
  return (
    <>
      <section className="homepage">
        <div className="homepage__hero">
          <div className="homepage__hero--video-container">
            <video className="homepage__hero--video" autoPlay muted loop playsInline>
              <source src={heroVideo} type="video/mp4" />
            </video>
            <img className="homepage__hero--image" src={heroImage} alt="Hero Image" />
          </div>

          <div className="homepage__hero--overlay">
            <div className="homepage__hero-content">
              <div className="homepage__hero-content--title">
                <h2 className="homepage__hero-content--title-line1">Two Students</h2>
                <h2 className="homepage__hero-content--title-line2">One City</h2>
                <h2 className="homepage__hero-content--title-line3">Honest Bites</h2>
              </div>
              <p className="homepage__hero-content--description">
                We review Brisbane food spots with two honest opinions, student-friendly prices, and a final verdict on what is actually worth the hype.
              </p>
              <button className="homepage__hero-content--button">Explore Reviews</button>
            </div>
          </div>
        </div>

        <div className="homepage__about-us">
          <div className="homepage__about-us--content">
            <div className="homepage__about-us--text">
              <h2 className="homepage__about-us--title">What We Do</h2>
              <p className="homepage__about-us--description">
                We visit restaurants, cafes, and trending food spots around Brisbane and review them from two student perspectives. Each place gets Rodrigo’s
                take, Henrique’s take, a final score, and a simple verdict to help students decide where to eat next.
              </p>
              <button>Read More</button>
            </div>
            <div className="homepage__about-us--image">
              <img src="/images/food-review.jpg" alt="Food Review" />
              <button>Read More</button>
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
                <img src="/images/food-review.jpg" alt="Food Review" />
                <h3>Trending Spots </h3>
                <p>Viral places, popular dishes, and local food spots everyone is talking about. We check if they are actually worth the hype.</p>
                <button>Check the Hype</button>
              </div>
              <div className="homepage__reviews--card">
                <img src="/images/food-review.jpg" alt="Food Review" />
                <h3>Student Picks</h3>
                <p>Affordable, reliable, and satisfying food options for students who want good meals without wasting money.</p>
                <button>Check the Hype</button>
              </div>
            </div>
          </div>
        </div>
        <div className="homepage__newsletter">
          <div className="homepage__newsletter--content">
            <img src="/images/newsletter.jpg" alt="Newsletter" />
            <div className="homepage__newsletter--text">
              <h2 className="homepage__newsletter--title">Join our bite list</h2>
              <p className="homepage__newsletter--description">Get new reviews, student picks, and honest food verdicts from around Brisbane.</p>
              <form className="homepage__newsletter--form">
                <input type="text" placeholder="Enter your name" />
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Join the List</button>
              </form>
            </div>
          </div>
        </div>
        <div className="homepage__contact">
          <div className="homepage__contact--content">
            <h2 className="homepage__contact--title">Get in touch with us</h2>
            <div className="homepage__contact--info">
              <div className="homepage__contact--links">
                <p>E-mail</p>
                <a href="mailto:test@gmail.com" className="homepage__contact--link">
                  <img src="/images/email-icon.png" alt="Email Icon" />
                  test@gmail.com
                </a>
                <div className="homepage__contact--link">
                  <p>Social Medias</p>
                  <div className="homepage__contact--socials">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="homepage__contact--link">
                      <img src="/images/instagram-icon.png" alt="Instagram Icon" />
                      Instagram
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="homepage__contact--link">
                      <img src="/images/facebook-icon.png" alt="Facebook Icon" />
                      Facebook
                    </a>
                    <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="homepage__contact--link">
                      <img src="/images/twitter-icon.png" alt="Twitter Icon" />
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
              <div className="homepage__contact--submitPlace">
                <h2 className="homepage__contact--submitPlace-title">Got a place we should try?</h2>
                <p className="homepage__contact--submitPlace-description">Send us a food spot, hidden gem, or viral place you want us to review next.</p>
                <button className="homepage__contact--submitPlace-button">Submit a Place</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;
