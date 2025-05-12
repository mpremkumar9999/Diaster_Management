import React from 'react';
import Navbar from './Navbar'; // Import Navbar
import Footer from './Footer'; // Import Footer
import './css/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-page"> {/* Optional container for page-level styling */}
      <Navbar />
      <div className="about-us-container">
        <header className="about-us-header">
          <h1><i className="fas fa-info-circle"></i> About Disaster Relief Network</h1>
          <p>Our mission is to provide swift and effective aid to communities affected by disasters.</p>
        </header>

        <section className="our-story">
          <h2>Our Story</h2>
          <p>Disaster Relief Network was founded in [Year] by a group of passionate individuals who recognized the urgent need for a coordinated response during times of crisis. Inspired by the resilience of affected communities, we set out to build a network that connects resources, volunteers, and aid where it's needed most.</p>
          <p>Since our inception, we have been involved in numerous relief efforts, providing essential supplies, medical assistance, and support for recovery. Our commitment is to act with compassion, efficiency, and integrity.</p>
        </section>

        <section className="our-values">
          <h2>Our Core Values</h2>
          <ul>
            <li><strong>Compassion:</strong> We approach every situation with empathy and a deep concern for human suffering.</li>
            <li><strong>Collaboration:</strong> We believe in the power of working together with local organizations, governments, and individuals.</li>
            <li><strong>Efficiency:</strong> We strive to deliver aid quickly and effectively, minimizing waste and maximizing impact.</li>
            <li><strong>Integrity:</strong> We operate with transparency and accountability in all our actions.</li>
            <li><strong>Resilience:</strong> We aim not only to provide immediate relief but also to support long-term recovery and community resilience.</li>
          </ul>
        </section>

        <section className="our-team">
          <h2>Our Team</h2>
          <p>Our dedicated team comprises experienced professionals and passionate volunteers committed to our mission. [Optional: You can list key team members and their roles here].</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;