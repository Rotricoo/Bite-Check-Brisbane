import { Link } from "react-router-dom";

// import images and videos
import "./AboutUs.scss";
import aboutUsHeroImage from "../../assets/img/about-us-hero.jpg";
import henriqueProfileImage from "../../assets/img/personal-pics/henrique-profile.jpg";
import rodrigoProfileImage from "../../assets/img/personal-pics/rodrigo-profile.jpg";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us__home-button-container">
        <Link to="/" className="about-us__home-button" aria-label="Back to Home">
          ← Back to Home
        </Link>
      </div>
      <div className="about-us__hero">
        <div className="about-us__hero--info">
          <h1 className="about-us__hero--title">About Us</h1>
          <p className="about-us__hero--description">
            Bite Check Brisbane is a student food blog built by Henrique and Rodrigo. We visit restaurants, cafes, and casual food spots around Brisbane, then
            write about what the experience is actually like: the food, the price, the atmosphere, the location, and whether we would go back.
          </p>
          <br />

          <p className="about-us__hero--description">
            Our goal is simple: help other students and young locals choose places that feel worth their time and money.
          </p>
        </div>
        <div className="about-us__hero--image-container">
          <img src={aboutUsHeroImage} alt="Henrique and Rodrigo minds behind the blog" className="about-us__hero--image" />
        </div>
      </div>

      <div className="about-us__team">
        <h2 className="about-us__team--title">Meet the team behind the blog</h2>
      </div>
      <div className="about-us__team-container">
        <div className="about-us__team-member">
          <div className="about-us__team-member--image-container">
            <img src={henriqueProfileImage} alt="Henrique profile picture" className="about-us__team-member--image" />
          </div>
          <div className="about-us__team-member--infos">
            <h3 className="about-us__team-member--name">Henrique Alves</h3>
            <div className="about-us__team-member--role-and-details">
              <p className="about-us__team-member--role">Co-founder & Food Reviewer</p>
              <p className="about-us__team-member--details">Brazilian · IT Student</p>
            </div>
            <p className="about-us__team-member--description">
              Henrique focuses on flavour, atmosphere, and the small details that make a restaurant feel memorable. He is usually the one noticing service,
              presentation, and whether the experience matches the hype.
            </p>
          </div>
        </div>

        <div className="about-us__divider"></div>

        <div className="about-us__team-member">
          <div className="about-us__team-member--image-container">
            <img src={rodrigoProfileImage} alt="Rodrigo profile picture" className="about-us__team-member--image" />
          </div>
          <div className="about-us__team-member--infos">
            <h3 className="about-us__team-member--name">Rodrigo Silva</h3>
            <div className="about-us__team-member--role-and-details">
              <p className="about-us__team-member--role">Co-founder & Experience Reviewer</p>
              <p className="about-us__team-member--details">Brazilian · IT Student</p>
            </div>
            <p className="about-us__team-member--description">
              Rodrigo looks at the full visit: location, value, comfort, and whether a place works for students. He cares about honest recommendations that are
              useful beyond a nice photo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
