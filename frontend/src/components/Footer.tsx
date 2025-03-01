import React from "react";
import "../css/Layout.css";
import { useNavigate } from "react-router";
const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-container">
      <div id="footer-logo" className="col-3">
        <img
          src="/assets/university-logo.svg"
          alt="Uni-logo"
          onClick={() => navigate("home")}
        />
      </div>

      <div className="col-6 footer__links">
        <a href="" className="footer-link">
          FAQ
        </a>
        <a href="" className="footer-link">
          Privacy Policy
        </a>
        <a href="" className="footer-link">
          Про нас
        </a>
        <a href="/contacts" className="footer-link">
          Контактна інформація
        </a>
      </div>
      <div className="col-3 footer__social-links">
        <a href="" className="footer-link">
          <img src="/assets/facebook-icon.svg" alt="" />
        </a>
        <a href="" className="footer-link">
          <img src="/assets/insta-icon.svg" alt="" />
        </a>
        <a href="" className="footer-link">
          <img src="/assets/youtube-icon.svg" alt="" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
