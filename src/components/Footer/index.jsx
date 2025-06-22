import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <img src="/images/Footer.png" alt="Imagem de rodapé do Organo"></img>
      <div className="footer-links">
        <a
          href="https://github.com/odrgues"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile
        </a>
        <span className="footer-separator">|</span>
        <a
          href="https://github.com/RafaelPalomino18"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile
        </a>
        <span className="footer-separator">|</span>
        <Link to="/about">Sobre nós</Link>
      </div>
    </footer>
  );
};

export default Footer;
