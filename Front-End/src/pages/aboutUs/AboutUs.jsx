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
            We are two students exploring Brisbane through food. This blog was created to share honest reviews of restaurants, cafes, and trending food spots
            from a student perspective. Instead of only showing perfect photos or viral places, we focus on what the experience is really like: price, taste,
            atmosphere, location, and whether the place is actually worth the hype.
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
            <p className="about-us__team-member--role">Co-founder & Food Enthusiast</p>
            <div className="about-us__team-member--details-container">
              <p className="about-us__team-member--details">Brazilian - IT Student</p>
            </div>
            <p className="about-us__team-member--description">
              Henrique is a passionate foodie with a keen eye for detail. He loves trying new dishes and sharing his experiences with the community.
            </p>
          </div>
          <div className="about-us__team-member--gallery">
            <img className="about-us__team-member-images"></img>
            <img className="about-us__team-member-images"></img>
            <img className="about-us__team-member-images"></img>
          </div>
        </div>

        <div className="about-us__divider"></div>

        <div className="about-us__team-member">
          <div className="about-us__team-member--gallery">
            <img className="about-us__team-member-images"></img>
            <img className="about-us__team-member-images"></img>
            <img className="about-us__team-member-images"></img>
          </div>
          <div className="about-us__team-member--image-container">
            <img src={rodrigoProfileImage} alt="Rodrigo profile picture" className="about-us__team-member--image" />
          </div>
          <div className="about-us__team-member--infos">
            <h3 className="about-us__team-member--name">Rodrigo Silva</h3>
            <p className="about-us__team-member--role">Co-founder & Travel Enthusiast</p>
            <div className="about-us__team-member--details-container">
              <p className="about-us__team-member--details">Brazilian - IT Student</p>
            </div>
            <p className="about-us__team-member--description">
              Rodrigo is a travel enthusiast who loves exploring new places and sharing his adventures with the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
