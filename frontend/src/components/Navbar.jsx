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
        <span role="img" aria-label="helping hands">🙌</span> Disaster Relief Network
      </Link>
      
      <div className="nav-links">
        <Link to="/volunteer" className="nav-link">
          <span role="img" aria-label="volunteer">👷</span> Volunteer
        </Link>
        <Link to="/affected" className="nav-link">
          <span role="img" aria-label="affected">🆘</span> Affected
        </Link>
        <Link to="/donor" className="nav-link">
          <span role="img" aria-label="donor">💝</span> Donor
        </Link>
        
        <button onClick={handleLogout} className="logout-button">
          <span role="img" aria-label="logout">🚪</span> Logout
        </button>
      </div>

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #2c3e50, #3498db);
          color: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .logo {
          color: white;
          text-decoration: none;
          font-size: 1.4rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.3s ease;
        }
        
        .logo:hover {
          transform: scale(1.03);
        }
        
        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: white;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav-link:hover {
          transform: translateY(-2px);
        }
        
        .logout-button {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.5rem 1.2rem;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }
        
        .logout-button:hover {
          background: rgba(231, 76, 60, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
        }
        
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            padding: 1rem;
          }
          
          .nav-links {
            margin-top: 1rem;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }
          
          .logo {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;