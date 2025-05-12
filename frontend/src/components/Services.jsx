import React from 'react';
import Navbar from './Navbar'; // Import Navbar
import Footer from './Footer'; // Import Footer
import './css/Services.css';

function Services() {
  return (
    <div className="services-page"> {/* Optional container for page-level styling */}
      <Navbar />
      <div className="services-container">
        <header className="services-header">
          <h1><i className="fas fa-concierge-bell"></i> Our Services</h1>
          <p>We provide a range of services to support disaster relief efforts.</p>
        </header>

        <section className="service-list">
          <div className="service-item">
            <i className="fas fa-truck"></i>
            <h3>Logistics and Distribution</h3>
            <p>Efficiently managing the transportation and distribution of essential supplies to affected areas.</p>
          </div>

          <div className="service-item">
            <i className="fas fa-medkit"></i>
            <h3>Medical Assistance</h3>
            <p>Providing on-site medical care, first aid, and coordinating medical personnel and supplies.</p>
          </div>

          <div className="service-item">
            <i className="fas fa-tents"></i>
            <h3>Shelter and Housing Support</h3>
            <p>Setting up temporary shelters and assisting in the long-term housing solutions for displaced individuals.</p>
          </div>

          <div className="service-item">
            <i className="fas fa-utensils"></i>
            <h3>Food and Water Provision</h3>
            <p>Ensuring access to safe drinking water and nutritious food for those affected by disasters.</p>
          </div>

          <div className="service-item">
            <i className="fas fa-users"></i>
            <h3>Volunteer Coordination</h3>
            <p>Recruiting, training, and deploying volunteers to support various relief activities.</p>
          </div>

          <div className="service-item">
            <i className="fas fa-hand-holding-usd"></i>
            <h3>Donation Management</h3>
            <p>Securely managing and allocating financial and in-kind donations to maximize their impact.</p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Services;