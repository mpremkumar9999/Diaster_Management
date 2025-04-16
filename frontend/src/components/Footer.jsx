import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">
            <span role="img" aria-label="disaster relief">🌍</span> Disaster Relief
          </h3>
          <p className="footer-text">Connecting communities in times of need</p>
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
              <span role="img" aria-label="facebook">📘</span> Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span role="img" aria-label="twitter">🐦</span> Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <span role="img" aria-label="instagram">📷</span> Instagram
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
          background: linear-gradient(135deg, #2c3e50, #1a2a3a);
          color: white;
          padding: 2rem 1rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding-bottom: 2rem;
        }
        
        .footer-section {
          padding: 0 1rem;
        }
        
        .footer-heading {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .footer-text {
          color: #bdc3c7;
          line-height: 1.6;
        }
        
        .footer-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
        }
        
        .link-group {
          display: flex;
          flex-direction: column;
        }
        
        .link-group-title {
          font-size: 1.1rem;
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
          background-color: #3498db;
        }
        
        .footer-link {
          color: #bdc3c7;
          text-decoration: none;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .footer-link:hover {
          color: white;
          transform: translateX(5px);
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          text-align: center;
        }
        
        .copyright {
          color: #7f8c8d;
          font-size: 0.9rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .footer-links {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
          
          .footer-section {
            text-align: center;
          }
          
          .footer-heading {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;