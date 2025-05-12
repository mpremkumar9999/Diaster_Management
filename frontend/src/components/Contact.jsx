import React, { useState } from 'react';
import Navbar from './Navbar'; // Import Navbar
import Footer from './Footer'; // Import Footer
import './css/Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    // Simulate an API call (replace with your actual backend endpoint)
    setTimeout(() => {
      if (name && email && message) {
        console.log('Form submitted:', { name, email, message });
        setSubmissionStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmissionStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="contact-page"> {/* Optional container for page-level styling */}
      <Navbar />
      <div className="contact-container">
        <header className="contact-header">
          <h1><i className="fas fa-envelope"></i> Contact Us</h1>
          <p>We'd love to hear from you. Please fill out the form below.</p>
        </header>

        <section className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" disabled={submissionStatus === 'submitting'}>
              {submissionStatus === 'submitting' ? 'Submitting...' : 'Send Message'}
            </button>

            {submissionStatus === 'success' && (
              <p className="success-message">Thank you! Your message has been sent.</p>
            )}

            {submissionStatus === 'error' && (
              <p className="error-message">Oops! Something went wrong. Please try again.</p>
            )}
          </form>
        </section>

        <section className="contact-info">
          <h2>Our Contact Information</h2>
          <p><strong>Address:</strong> [Your Organization's Address]</p>
          <p><strong>Email:</strong> <a href="mailto:[Your Email]">[Your Email]</a></p>
          <p><strong>Phone:</strong> [Your Phone Number]</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;