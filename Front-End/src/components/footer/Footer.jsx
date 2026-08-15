import { NavLink } from "react-router-dom";
import logoHorizontalDarkMode from "../../assets/brand/Logo-horizontal-darkMode.png";
import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__left">
            <NavLink to="/">
              <img src={logoHorizontalDarkMode} alt="Logobrand horizontal" className="footer__left--img" />
            </NavLink>
            <div className="footer__menu">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about-us">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/all-reviews">All Reviews</NavLink>
                </li>
                <li>
                  <NavLink to="/trending-spots">Trending Spots</NavLink>
                </li>
                <li>
                  <NavLink to="/student-picks">Student Picks</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__right">
            <div className="footer__acknowledgement">
              <h4>Acknowledgement of Country</h4>
              <p>
                Bite Check Brisbane acknowledges Aboriginal and Torres Strait Islander peoples as the First Australians. We recognise their cultures, histories
                and diversity and their deep connection to the lands, waters and seas of Queensland and the Torres Strait.
                <br />
                We acknowledge the Jagera people and the Turrbal people as the Traditional Custodians of Meanjin (Brisbane), the lands on which our office is
                located and where we meet, work and learn. We pay our respects to Jagera and Turrbal Elders past, present and emerging.
              </p>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__bottom-info">A student project created for Web Development (NIT1101) - Victoria University</p>
          <p className="footer__bottom-copyright">
            © 2026 Bite Check Brisbane | <NavLink to="/privacy-policy"> Privacy Policy </NavLink> | <NavLink to="/terms-of-use">Terms of Use</NavLink> |
            <NavLink to="/accessibility"> Accessibility </NavLink> |<NavLink to="/contact"> Contact</NavLink> |<NavLink to="/admin"> Admin</NavLink>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
