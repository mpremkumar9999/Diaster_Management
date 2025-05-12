import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <i className="fas fa-hands-helping"></i> Disaster Relief Network
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/about" className="nav-link">
          <i className="fas fa-info-circle"></i> About Us
        </Link>
        <Link to="/services" className="nav-link">
          <i className="fas fa-concierge-bell"></i> Services
        </Link>
        <Link to="/contact" className="nav-link">
          <i className="fas fa-envelope"></i> Contact
        </Link>

        <button onClick={handleLogout} className="logout-button">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      <style jsx>{`
        .navbar {
          background-color: #ffffff;
          border-bottom: 2px solid #e6e6e6;
          color: #333333;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: Arial, sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          font-size: 1.4rem;
          font-weight: 600;
          color: #333333;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          font-size: 1rem;
          color: #333333;
          text-decoration: none;
          font-weight: 500;
          padding: 0.4rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.3s ease, border-bottom 0.3s ease;
        }

        .nav-link:hover {
          color: #007bff;
          border-bottom: 2px solid #007bff;
        }

        .logout-button {
          background-color: #f8f9fa;
          color: #333333;
          border: 1px solid #dee2e6;
          padding: 0.5rem 1.2rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .logout-button:hover {
          background-color: #007bff;
          color: white;
          border-color: #0056b3;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            padding: 0.8rem;
          }

          .nav-links {
            margin-top: 0.8rem;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;