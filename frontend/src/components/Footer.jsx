import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">
            <i className="fas fa-globe"></i> Disaster Relief
          </h3>
          <p className="footer-text">Empowering communities during times of crisis through connection and collaboration.</p>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4 className="link-group-title">Quick Links</h4>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/faq" className="footer-link">FAQs</Link>
          </div>

          <div className="link-group">
            <h4 className="link-group-title">Legal</h4>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/cookies" className="footer-link">Cookie Policy</Link>
          </div>

          <div className="link-group">
            <h4 className="link-group-title">Connect</h4>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Disaster Relief Network. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #34495e, #2c3e50);
          color: #ecf0f1;
          padding: 2rem 1rem;
          font-family: 'Roboto', sans-serif;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
        }

        .footer-section {
          max-width: 400px;
        }

        .footer-heading {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-text {
          font-size: 1rem;
          color: #bdc3c7;
          line-height: 1.6;
        }

        .footer-links {
          display: flex;
          flex: 1;
          gap: 2rem;
        }

        .link-group {
          flex: 1;
          min-width: 150px;
        }

        .link-group-title {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: #ecf0f1;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .link-group-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: #1abc9c;
        }

        .footer-link {
          font-size: 0.95rem;
          color: #bdc3c7;
          text-decoration: none;
          padding: 0.3rem 0;
          transition: color 0.3s ease, transform 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-link:hover {
          color: #1abc9c;
          transform: translateX(5px);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 2rem;
          padding-top: 1.5rem;
          text-align: center;
        }

        .copyright {
          font-size: 0.9rem;
          color: #95a5a6;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            align-items: center;
          }

          .footer-links {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }

          .footer-section {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
