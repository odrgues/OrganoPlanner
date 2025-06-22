import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <img src="/images/Footer.png" alt="Imagem de rodapé do Organo"></img>
      <div className="footer-links">
        <a
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile 1
        </a>
        <span className="footer-separator">|</span>
        <a
          href="https://github.com/other-github-username"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile 2
        </a>
        <span className="footer-separator">|</span>
        <Link to="/about">About Us</Link>
      </div>
    </footer>
  );
};

export default Footer;
